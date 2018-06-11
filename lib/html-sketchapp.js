const viewports = require('./viewports')

// https://github.com/seek-oss/html-sketchapp-cli#viewport-sizes-and-responsive-design
module.exports = {
  url: 'http://localhost:3000/patterns/_sketch.html',
  outDir: 'sketch',
  viewports: Object.keys(viewports).reduce((result, name) => {
    const { width } = viewports[name]
    result[name] = `${width}x2048`
    return result
  }, {})
}
