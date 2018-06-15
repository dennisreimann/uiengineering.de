const browserSync = require('./lib/browsersync')
const breakpoints = require('./lib/breakpoints')
const viewports = require('./lib/viewports')

module.exports = {
  name: 'UIengineering',
  copyright: 'Copyright © Jan Persiel, Dennis Reimann. <a href="https://github.com/dennisreimann/uiengine">Generated with UIengine</a>.',

  source: {
    components: './src/components',
    templates: './src/templates',
    pages: './src/uiengine/pages',
    data: './src/uiengine/data',
    entities: './src/uiengine/entities'
  },

  target: './dist/patterns',

  adapters: {
    pug: './lib/uiengine/pug',
    styl: './lib/uiengine/styl'
  },

  template: 'uiengine.pug',

  ui: {
    lang: 'de',
    base: '/patterns/',
    breakpoints,
    viewports
  },

  browserSync
}
