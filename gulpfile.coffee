gulp = require("gulp")
p = require("gulp-load-plugins")()
fs = require("fs")
path = require("path")
runSequence = require("run-sequence")
autoprefixer = require("autoprefixer")
mqpacker = require("css-mqpacker")
csswring = require("csswring")
browserSync = require("browser-sync").create()

paths =
  src: "src"
  dest: "dist"
  rev: ["dist/**/*.{css,js,map,svg,jpg,png,gif,ttf,woff,woff2}"]
  copy: ["src/{images,svgs}/**/*", "src/.htaccess"]
  pages: ["src/pages/**/*.jade"]
  styles: ["src/styles/**/*.styl"]
  templates: ["src/templates/*.jade"]
  optimizeImages: ["src/{images,svgs}/**/*"]

dest = (folder = "") -> gulp.dest("#{paths.dest}/#{folder}")

revvedFile = (filePath) ->
  revs = try
    require("#{paths.dest}/rev-manifest.json")
  catch
    undefined
  file = if revs then revs[filePath] else filePath

templateData =
  h:
    assetUrl: (filePath, includeHost = true) ->
      filePath = revvedFile(filePath)
      "/#{filePath}"

    assetInline: (filePath) ->
      filePath = "./#{paths.dest}/#{revvedFile(filePath)}"
      content = fs.readFileSync(filePath, "utf8")
      content

gulp.task "copy", (cb) ->
  gulp.src(paths.copy)
    .pipe(dest())
    .pipe(browserSync.stream())

gulp.task "pages", (cb) ->
  gulp.src(paths.pages)
    .pipe(p.plumber())
    .pipe(p.resolveDependencies(pattern: /^\s*(?:extends|include) ([\w-]+)$/g))
    .pipe(p.jade(pretty: true, locals: templateData))
    .pipe(p.minifyHtml(empty: true))
    .pipe(dest())
    .pipe(browserSync.stream())

gulp.task "styles", ->
  processors = [
    mqpacker
    autoprefixer(browsers: ["last 2 versions"])
    csswring
  ]
  gulp.src(paths.styles)
    .pipe(p.plumber())
    .pipe(p.stylus(
      paths: ["src/styles/lib"],
      import: ["mediaQueries", "variables"]
    ))
    .pipe(p.concat("main.css"))
    .pipe(p.postcss(processors))
    .pipe(dest("styles"))
    .pipe(browserSync.stream(match: "**/*.css"))

gulp.task "browserSync", ->
  browserSync.init(
    server:
      baseDir: paths.dest
  )

gulp.task "optimizeImages", ->
  gulp.src(paths.optimizeImages)
    .pipe(p.imagemin())
    .pipe(gulp.dest("src"))

gulp.task "revAssets", ->
  revAll = new p.revAll()
  gulp.src(paths.rev)
    .pipe(revAll.revision())
    .pipe(dest())
    .pipe(revAll.manifestFile())
    .pipe(dest())

gulp.task "watch", ->
  gulp.watch paths.copy, ["copy"]
  gulp.watch paths.pages, ["pages"]
  gulp.watch paths.styles, ["styles"]
  gulp.watch paths.templates, ["pages"]

gulp.task "build", (cb) -> runSequence("styles", ["copy", "pages"], cb)
gulp.task "develop", (cb) -> runSequence("build", ["watch", "browserSync"], cb)
gulp.task "rev", (cb) -> runSequence("revAssets", ["pages"], cb)
gulp.task "production", (cb) -> runSequence("build", "rev", cb)
