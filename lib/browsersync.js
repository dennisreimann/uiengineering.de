// Browser-sync config file
// http://www.browsersync.io/docs/options/

const baseDir = './dist'

module.exports = {
  open: false,
  files: [baseDir],
  server: { baseDir }
}
