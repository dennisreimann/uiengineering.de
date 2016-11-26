import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import autoprefixer from 'autoprefixer';
import mqpacker from 'css-mqpacker';
import csswring from 'csswring';
import BrowserSync from 'browser-sync';
import templateHelper from './lib/templateHelper';

const p = gulpLoadPlugins();
const browserSync = BrowserSync.create();
const baseUrl = 'https://www.uiengineering.de';

const paths = {
  src: 'src',
  dest: 'dist',
  rev: ['dist/**/*.{css,js,map,svg,jpg,png,gif,woff,woff2}'],
  copy: ['src/{fonts,images,svgs,mp3s}/**/*', 'src/favicon.ico', 'src/.htaccess'],
  pages: ['src/pages/**/*.jade'],
  styles: ['src/styles/**/*.styl'],
  scripts: ['src/scripts/**/*.js'],
  sitemap: ['dist/**/*.html'],
  optimizeImages: ['src/{images,svgs}/**/*'],
  episodes: ['src/podcast/*.md'],
  templates: 'src/templates/*.jade',
  feed: 'src/feed/*.jade',
  episodeTemplate: 'src/templates/episode.jade',
  episodesBasepath: 'podcast',
};

const dest = (folder = '') => gulp.dest(`${paths.dest}/${folder}`);

const mvbConf = {
  glob: paths.episodes,
  template: paths.episodeTemplate,
  permalink(article) {
    return `/${paths.episodesBasepath}/${article.id}.html`;
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
  h: templateHelper.createHelper(file, baseUrl)
});

const jadeOpts = {
  basedir: 'src/templates/',
  pretty: true,
};

const buildHtml = (src, dst) =>
  gulp.src(src)
    .pipe(p.plumber())
    .pipe(p.mvb(mvbConf))
    .pipe(p.data(templateData))
    .pipe(p.jade(jadeOpts))
    .pipe(p.minifyHtml({empty: true}))
    .pipe(dest(dst))
    .pipe(browserSync.stream())

const feedWithTemplate = (template, folder) =>
  gulp.src(`src/feed/${template}.jade`)
    .pipe(p.plumber())
    .pipe(p.mvb(mvbConf))
    .pipe(p.data(templateData))
    .pipe(p.jade(jadeOpts))
    .pipe(p.rename({extname: '.xml'}))
    .pipe(dest(folder))

gulp.task('feed', () => feedWithTemplate('podcast'));

gulp.task('copy', cb =>
  gulp.src(paths.copy)
    .pipe(dest())
    .pipe(browserSync.stream())
);

gulp.task('pages', () => buildHtml(paths.pages));
gulp.task('episodes', () => buildHtml(paths.episodes, paths.episodesBasepath));

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

gulp.task('optimizeImages', () =>
  gulp.src(paths.optimizeImages)
    .pipe(p.imagemin())
    .pipe(gulp.dest('src'))
);

gulp.task('revAssets', () => {
  const revAll = new p.revAll({prefix: assetHost});
  return gulp.src(paths.rev)
    .pipe(revAll.revision())
    .pipe(p.revDeleteOriginal())
    .pipe(dest())
    .pipe(revAll.manifestFile())
    .pipe(dest())
});

gulp.task('sitemap', () =>
  gulp.src(paths.sitemap)
    .pipe(p.sitemap({
      siteUrl: baseUrl,
      changefreq: 'weekly'
    }))
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
});

gulp.task('build', cb => runSequence('styles', ['copy', 'pages', 'episodes', 'scripts', 'feed'], cb));
gulp.task('develop', cb => runSequence('build', ['watch', 'browserSync'], cb));
gulp.task('rev', cb => runSequence('revAssets', ['pages', 'episodes'], cb));
gulp.task('production', cb => runSequence('build', 'rev', 'sitemap', cb));
