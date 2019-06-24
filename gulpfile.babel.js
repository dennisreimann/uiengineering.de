import { argv } from 'yargs'
import { statSync } from 'fs'
import { src, dest, series, parallel, task, watch } from 'gulp'
import mergeStream from 'merge-stream'
import autoprefixer from 'autoprefixer'
import mqpacker from 'css-mqpacker'
import csswring from 'csswring'
import data from 'gulp-data'
import concat from 'gulp-concat'
import htmlmin from 'gulp-htmlmin'
import imagemin from 'gulp-imagemin'
import imageResize from 'gulp-image-resize'
import newer from 'gulp-newer'
import mvb from 'gulp-mvb'
import pug from 'gulp-pug'
import postcss from 'gulp-postcss'
import rename from 'gulp-rename'
import rev from 'gulp-rev'
import revCssUrl from 'gulp-rev-css-url'
import revDeleteOriginal from 'gulp-rev-delete-original'
import sitemap from 'gulp-sitemap'
import stylus from 'gulp-stylus'
import theo from 'gulp-theo'
import Theo from 'theo'
import { build } from '@uiengine/core'
import { stylFormat } from './lib/theo'
import createTemplateHelper from './lib/templateHelper'

const isDev = (argv.dev != null)
const defaultScheme = isDev ? 'http' : 'https'
const assetHost = argv.assetHost
const assetUrl = assetHost ? `//${assetHost}` : null
const siteHost = isDev ? 'localhost:3000' : 'www.uiengineering.de'
const siteUrl = `${defaultScheme}://${siteHost}`

const paths = {
  src: 'src',
  dest: 'dist',
  html: ['dist/**/*.html'],
  rev: ['dist/**/*.{css,js,map,svg,jpg,png,gif,woff,woff2}', '!dist/patterns/_uiengine-theme/**/**'],
  copy: ['src/{fonts,images,svgs,mp3s}/**/*', 'src/site/**/*', 'src/site/**/.htaccess'],
  pages: ['src/templates/{datenschutz,impressum,index,kontakt,podcast,praxis}.pug'],
  styles: ['src/styles/*.styl', 'src/components/**/*.styl'],
  scripts: ['node_modules/amplitudejs/dist/amplitude.min.js', 'src/scripts/*.js'],
  episodes: ['src/podcast/*.md'],
  tokens: ['src/styles/tokens/*.yml'],
  templates: ['src/{components,templates}/**/*.pug'],
  templateIncludes: 'src/templates/includes/**',
  feed: ['src/feed/*.pug'],
  episodesBasepath: 'podcast'
}

const dist = (folder = '') => dest(`${paths.dest}/${folder}`)

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
      bySeason.push({ season, articles: articlesBySeason[season] })
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

const buildHtml = (org, dst) =>
  src(org)
    .pipe(mvb(mvbConf))
    .pipe(data(templateData))
    .pipe(pug(pugOpts))
    .pipe(dist(dst))

const feedWithTemplate = (template, folder) =>
  src(`src/feed/${template}.pug`)
    .pipe(mvb(mvbConf))
    .pipe(data(templateData))
    .pipe(pug(pugOpts))
    .pipe(rename({ extname: '.xml' }))
    .pipe(dist(folder))

const resizePodcastImages = (size) => {
  const baseDir = 'src/images/podcast'
  return src(`${baseDir}/**/3000.png`)
    .pipe(rename({ basename: size }))
    .pipe(newer(baseDir))
    .pipe(imageResize({ width: size }))
    .pipe(dist(baseDir))
}

task('feed', () => feedWithTemplate('podcast'))
task('pages', () => buildHtml(paths.pages))
task('episodes', () => buildHtml(paths.episodes, paths.episodesBasepath))

Theo.registerFormat('styl', stylFormat)

task('tokens', () =>
  src(paths.tokens)
    .pipe(theo({ format: { type: 'styl' } }))
    .pipe(dest('src/styles/tokens'))
)

task('html:optimize', () =>
  src(paths.html)
    .pipe(htmlmin())
    .pipe(dist())
)

task('images:resize', () => mergeStream([640, 320, 160].map(resizePodcastImages)))

task('images:optimize', () => {
  const targetDir = 'src'
  return src(['src/{images,svgs}/**/*', '!src/images/podcast/**/3000.png'])
    .pipe(newer(targetDir))
    .pipe(imagemin())
    .pipe(dest(targetDir))
})

task('copy', () =>
  src(paths.copy)
    .pipe(dist())
)

task('styles', () =>
  src(paths.styles)
    .pipe(stylus({
      paths: ['src/styles/lib', 'src/styles/tokens'],
      import: ['breakpoints', 'colors', 'font-faces', 'font-families', 'font-sizes', 'spaces', 'mediaQueries', 'extends']
    }))
    .pipe(concat('main.css'))
    .pipe(postcss([
      mqpacker,
      autoprefixer(),
      csswring
    ]))
    .pipe(dist('styles'))
)

task('scripts', () =>
  src(paths.scripts)
    .pipe(concat('main.js'))
    .pipe(dist('scripts'))
)

task('revAssets', () =>
  src(paths.rev)
    .pipe(rev({ prefix: assetUrl }))
    .pipe(revCssUrl())
    .pipe(revDeleteOriginal())
    .pipe(dist())
    .pipe(rev.manifest())
    .pipe(dist())
)

task('sitemap', () =>
  src(paths.html)
    .pipe(sitemap({ siteUrl, changefreq: 'weekly' }))
    .pipe(dist())
)

task('patterns', done => {
  const opts = {
    debug: isDev,
    serve: isDev,
    watch: isDev // ? [`!${resolve(paths.templateIncludes)}`] : false
  }

  build(opts)
    .then(() => { done() })
    .catch(done)
})

task('incremental', () => {
  watch(paths.copy, parallel('copy'))
  watch(paths.feed, parallel('feed'))
  watch(paths.styles, parallel('styles'))
  watch(paths.scripts, parallel('scripts'))
  watch(paths.templates, parallel('episodes', 'pages'))
  watch(paths.templateIncludes, parallel('patterns'))
  watch(paths.pages).on('change', filePath => task(buildHtml(filePath)))
  watch(paths.episodes).on('change', filePath => task(buildHtml(filePath, paths.episodesBasepath)))
  watch(paths.tokens, parallel('rebuild-tokens'))
  watch('src/styles/lib/*', parallel('styles'))
})

task('optimize', parallel('html:optimize'))
task('pug', parallel('pages', 'episodes', 'feed'))
task('rebuild-tokens', series('tokens', parallel('styles', 'patterns')))
task('build', series('tokens', ['styles', 'scripts', 'copy', 'pug']))
task('rev', series('revAssets', 'pug'))

// ----- PUBLIC TASKS -----
task('images', series('images:resize', 'images:optimize'))
task('develop', series(parallel('build', 'patterns'), 'incremental'))
task('production', series('build', 'rev', parallel('sitemap', 'optimize'), 'patterns'))
