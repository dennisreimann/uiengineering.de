import { argv } from 'yargs';
import fs from 'fs';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import mergeStream from 'merge-stream';
import runSequence from 'run-sequence';
import autoprefixer from 'autoprefixer';
import mqpacker from 'css-mqpacker';
import csswring from 'csswring';
import BrowserSync from 'browser-sync';
import debounce from './lib/debounce';
import templateHelper from './lib/templateHelper';

const p = gulpLoadPlugins();
const browserSync = BrowserSync.create();
const isDev = (argv.dev != null);
const defaultScheme = isDev ? 'http' : 'https';
const assetHost = argv.assetHost;
const assetUrl = assetHost ? `//${assetHost}` : null;
const siteHost = isDev ? 'localhost:3000' : 'www.uiengineering.de';
const siteUrl = `${defaultScheme}://${siteHost}`;

const paths = {
  src: 'src',
  dest: 'dist',
  html: ['dist/**/*.html'],
  rev: ['dist/**/*.{css,js,map,svg,jpg,png,gif,woff,woff2}'],
  copy: ['src/{fonts,images,svgs,mp3s}/**/*', 'src/site/**/*', 'src/site/.htaccess'],
  pages: ['src/pages/**/*.pug'],
  styles: ['src/styles/**/*.styl'],
  scripts: ['src/scripts/**/*.js'],
  episodes: ['src/podcast/*.md'],
  templates: 'src/templates/*.pug',
  feed: 'src/feed/*.pug',
  episodeTemplate: 'src/templates/episode.pug',
  episodesBasepath: 'podcast',
};

const dest = (folder = '') => gulp.dest(`${paths.dest}/${folder}`);

const mvbConf = {
  glob: paths.episodes,
  template: paths.episodeTemplate,
  permalink(article) {
    return `/${paths.episodesBasepath}/${article.id}.html`;
  },
  loaded(article) {
    if (article.mp3) {
      const mp3Path = `src/mp3s/${article.mp3}`;
      const fileSize = fs.statSync(mp3Path).size;
      article.mp3Bytes = fileSize;
    }
  },
  grouping(articles) {
    const byYear = {};

    articles.forEach(function(article) {
      const year = article.date.toISOString().replace(/-.*/, '');
      if (!byYear[year]) { byYear[year] = []; }
      byYear[year].push(article);
    });

    // year
    const articlesByYear = [];
    Object.keys(byYear).reverse().forEach(year => articlesByYear.push({year, articles: byYear[year]}));

    // groups
    return {
      byYear: articlesByYear
    };
  }
};

const templateData = file => ({
  h: templateHelper.createHelper(file, siteHost, assetHost, defaultScheme)
});

const pugOpts = {
  basedir: 'src/templates/',
  pretty: true,
};

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
  const baseDir = 'src/images/podcast';
  return gulp.src(`${baseDir}/**/3000.png`)
    .pipe(p.rename({basename: size}))
    .pipe(p.newer(baseDir))
    .pipe(p.imageResize({ width: size }))
    .pipe(gulp.dest(baseDir));
};

gulp.task('feed', () => feedWithTemplate('podcast'));
gulp.task('pages', () => buildHtml(paths.pages));
gulp.task('episodes', () => buildHtml(paths.episodes, paths.episodesBasepath));

gulp.task('html:optimize', cb =>
  gulp.src(paths.html)
    .pipe(p.minifyHtml({empty: true}))
    .pipe(dest())
);

gulp.task('images:resize', cb => mergeStream([640, 320, 160].map(resizePodcastImages)));

gulp.task('images:optimize', () => {
  const targetDir = 'src';
  return gulp.src(['src/{images,svgs}/**/*', '!src/images/podcast/**/3000.png'])
    .pipe(p.newer(targetDir))
    .pipe(p.imagemin())
    .pipe(gulp.dest(targetDir));
});

gulp.task('copy', cb =>
  gulp.src(paths.copy)
    .pipe(dest())
    .pipe(browserSync.stream())
);

gulp.task('scripts', () =>
  gulp.src(paths.scripts)
    .pipe(p.plumber())
    .pipe(p.babel())
    .pipe(p.uglify())
    .pipe(dest('scripts'))
    .pipe(browserSync.stream({match: '**/*.js'}))
);

gulp.task('styles', () =>
  gulp.src(paths.styles)
    .pipe(p.plumber())
    .pipe(p.stylus({
      paths: ['src/styles/lib'],
      import: ['mediaQueries', 'variables']
    }))
    .pipe(p.concat('main.css'))
    .pipe(p.postcss([
      mqpacker,
      autoprefixer({browsers: ['last 2 versions']}),
      csswring
    ]))
    .pipe(dest('styles'))
    .pipe(browserSync.stream({match: '**/*.css'}))
);

gulp.task('browserSync', () =>
  browserSync.init({
    open: false,
    server: {
      baseDir: paths.dest
    }
  })
);

gulp.task('revAssets', () => {
  const revAll = new p.revAll({ prefix: assetUrl });
  return gulp.src(paths.rev)
    .pipe(revAll.revision())
    .pipe(p.revDeleteOriginal())
    .pipe(dest())
    .pipe(revAll.manifestFile())
    .pipe(dest())
});

gulp.task('sitemap', () =>
  gulp.src(paths.html)
    .pipe(p.sitemap({ siteUrl, changefreq: 'weekly' }))
    .pipe(dest())
);

gulp.task('watch', () => {
  gulp.watch(paths.copy, ['copy']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.episodeTemplate, ['episodes']);
  gulp.watch(paths.templates, ['episodes', 'pages']);
  gulp.watch(paths.feed, ['feed']);
  gulp.watch(paths.pages).on('change', file => buildHtml(file.path));
  gulp.watch(paths.episodes).on('change', file => buildHtml(file.path, paths.episodesBasepath));
  gulp.watch(paths.html).on('change', () => debounce('reload', browserSync.reload, 500));
});


gulp.task('pug', ['pages', 'episodes', 'feed']);
gulp.task('optimize', ['html:optimize']);
gulp.task('images', cb => runSequence('images:resize', 'images:optimize', cb));
gulp.task('build', cb => runSequence(['styles', 'copy', 'scripts', 'pug'], cb));
gulp.task('develop', cb => runSequence('build', ['watch', 'browserSync'], cb));
gulp.task('rev', cb => runSequence('revAssets', 'pug', cb));
gulp.task('production', cb => runSequence('build', 'rev', ['sitemap', 'optimize'], cb));
