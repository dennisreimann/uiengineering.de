import { argv } from 'yargs'
import { resolve } from 'path'
import { statSync } from 'fs'
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import mergeStream from 'merge-stream'
import runSequence from 'run-sequence'
import autoprefixer from 'autoprefixer'
import mqpacker from 'css-mqpacker'
import csswring from 'csswring'
import BrowserSync from 'browser-sync'
import { build } from '@uiengine/core'
import { stylFormat } from './lib/theo'
import debounce from './lib/debounce'
import createTemplateHelper from './lib/templateHelper'

const p = gulpLoadPlugins()
const browserSync = BrowserSync.create()
const isDev = (argv.dev != null)
const defaultScheme = isDev ? 'http' : 'https'
const assetHost = argv.assetHost
const assetUrl = assetHost ? `//${assetHost}` : null
const siteHost = isDev ? 'localhost:3000' : 'www.uiengineering.de'
const siteUrl = `${defaultScheme}://${siteHost}`
const { theo } = p

const paths = {
  src: 'src',
  dest: 'dist',
  html: ['dist/**/*.html'],
  rev: ['dist/**/*.{css,js,map,svg,jpg,png,gif,woff,woff2}', '!dist/patterns/_uiengine-theme/**/**'],
  copy: ['src/{fonts,images,svgs,mp3s}/**/*', 'src/site/**/*', 'src/site/.htaccess'],
  pages: ['src/pages/**/*.pug', '!src/pages/episode.pug'],
  styles: ['src/styles/*.styl', 'src/components/**/*.styl'],
  episodes: ['src/podcast/*.md'],
  tokens: ['src/styles/tokens/*.yml'],
  templates: ['src/{components,templates}/**/*.pug'],
  templateIncludes: 'src/templates/includes/**',
  feed: ['src/feed/*.pug'],
  episodesBasepath: 'podcast'
}

const dest = (folder = '') => gulp.dest(`${paths.dest}/${folder}`)

const mvbConf = {
  glob: paths.episodes,
  template: './src/templates/episode.pug',

  permalink (article) {
    return `/${paths.episodesBasepath}/${article.id}.html`
  },

  loaded (article) {
    if (article.mp3) {
      const mp3Path = `src/mp3s/${article.mp3}`
      const fileSize = statSync(mp3Path).size
      article.mp3Bytes = fileSize
    }
  },

  grouping (articles) {
    const articlesBySeason = {}

    articles.forEach(article => {
      const season = article.shortId.substring(0, 3)
      articlesBySeason[season] = articlesBySeason[season] || []
      articlesBySeason[season].push(article)
    })

    // year
    const bySeason = []
    Object.keys(articlesBySeason).reverse().forEach(season =>
      bySeason.push({season, articles: articlesBySeason[season]})
    )

    // groups
    return {
      bySeason
    }
  }
}

const templateData = file => ({
  h: createTemplateHelper(file.path, siteHost, assetHost, defaultScheme)
})

const pugOpts = {
  basedir: './src/components',
  pretty: true
}

const buildHtml = (src, dst) =>
  gulp.src(src)
    .pipe(p.plumber())
    .pipe(p.mvb(mvbConf))
    .pipe(p.data(templateData))
    .pipe(p.pug(pugOpts))
    .pipe(dest(dst))

const feedWithTemplate = (template, folder) =>
  gulp.src(`src/feed/${template}.pug`)
    .pipe(p.plumber())
    .pipe(p.mvb(mvbConf))
    .pipe(p.data(templateData))
    .pipe(p.pug(pugOpts))
    .pipe(p.rename({extname: '.xml'}))
    .pipe(dest(folder))

const resizePodcastImages = (size) => {
  const baseDir = 'src/images/podcast'
  return gulp.src(`${baseDir}/**/3000.png`)
    .pipe(p.rename({basename: size}))
    .pipe(p.newer(baseDir))
    .pipe(p.imageResize({ width: size }))
    .pipe(gulp.dest(baseDir))
}

gulp.task('feed', () => feedWithTemplate('podcast'))
gulp.task('pages', () => buildHtml(paths.pages))
gulp.task('episodes', () => buildHtml(paths.episodes, paths.episodesBasepath))

theo.registerFormat('styl', stylFormat)

gulp.task('tokens', () =>
  gulp.src(paths.tokens)
    .pipe(theo.plugin({ format: { type: 'styl' } }))
    .pipe(gulp.dest('src/styles/tokens'))
)

gulp.task('html:optimize', cb =>
  gulp.src(paths.html)
    .pipe(p.htmlmin())
    .pipe(dest())
)

gulp.task('images:resize', cb => mergeStream([640, 320, 160].map(resizePodcastImages)))

gulp.task('images:optimize', () => {
  const targetDir = 'src'
  return gulp.src(['src/{images,svgs}/**/*', '!src/images/podcast/**/3000.png'])
    .pipe(p.newer(targetDir))
    .pipe(p.imagemin())
    .pipe(gulp.dest(targetDir))
})

gulp.task('copy', cb =>
  gulp.src(paths.copy)
    .pipe(dest())
    .pipe(browserSync.stream())
)

gulp.task('styles', () =>
  gulp.src(paths.styles)
    .pipe(p.plumber())
    .pipe(p.stylus({
      paths: ['src/styles/lib', 'src/styles/tokens'],
      import: ['breakpoints', 'colors', 'font-faces', 'font-families', 'font-sizes', 'spaces', 'mediaQueries', 'extends']
    }))
    .pipe(p.concat('main.css'))
    .pipe(p.postcss([
      mqpacker,
      autoprefixer({browsers: ['last 2 versions']}),
      csswring
    ]))
    .pipe(dest('styles'))
    .pipe(browserSync.stream({match: '**/*.css'}))
)

gulp.task('revAssets', () => {
  const RevAll = p.revAll
  const revAll = new RevAll({ prefix: assetUrl })
  return gulp.src(paths.rev)
    .pipe(revAll.revision())
    .pipe(p.revDeleteOriginal())
    .pipe(dest())
    .pipe(revAll.manifestFile())
    .pipe(dest())
})

gulp.task('sitemap', () =>
  gulp.src(paths.html)
    .pipe(p.sitemap({ siteUrl, changefreq: 'weekly' }))
    .pipe(dest())
)

gulp.task('patterns', done => {
  const opts = {
    debug: isDev,
    serve: isDev,
    watch: isDev ? [`!${resolve(paths.templateIncludes)}`] : false
  }

  build(opts)
    .then(() => { done() })
    .catch(done)
})

gulp.task('watch', () => {
  gulp.watch(paths.copy, ['copy'])
  gulp.watch(paths.feed, ['feed'])
  gulp.watch(paths.templates, ['episodes', 'pages'])
  gulp.watch(paths.templateIncludes, ['patterns'])
  gulp.watch(paths.pages).on('change', event => buildHtml(event.path))
  gulp.watch(paths.episodes).on('change', event => buildHtml(event.path, paths.episodesBasepath))
  gulp.watch(paths.html).on('change', () => debounce('reload', browserSync.reload, 500))
  gulp.watch(paths.tokens, ['rebuild-tokens'])
  gulp.watch('src/styles/lib/*', ['styles'])
})

gulp.task('optimize', ['html:optimize'])
gulp.task('pug', ['pages', 'episodes', 'feed'])
gulp.task('rebuild-tokens', cb => runSequence('tokens', ['styles', 'patterns'], cb))
gulp.task('images', cb => runSequence('images:resize', 'images:optimize', cb))
gulp.task('build', cb => runSequence('tokens', ['styles', 'copy', 'pug'], cb))
gulp.task('develop', cb => runSequence(['build', 'patterns'], 'watch', cb))
gulp.task('rev', cb => runSequence('revAssets', 'pug', cb))
gulp.task('production', cb => runSequence('build', 'rev', ['sitemap', 'optimize'], 'patterns', cb))
