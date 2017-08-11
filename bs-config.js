// Browser-sync config file
// http://www.browsersync.io/docs/options/

const baseDir = './dist'

module.exports = {
  open: false,
  notify: false,
  reloadThrottle: 1000,
  files: [baseDir],
  server: { baseDir },
  watchOptions: {
    ignoreInitial: true,
    awaitWriteFinish: true
  }
}
