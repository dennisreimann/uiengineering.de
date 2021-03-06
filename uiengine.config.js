const browserSync = require('./lib/browsersync')
const breakpoints = require('./lib/breakpoints')
const viewports = require('./lib/viewports')

module.exports = {
  name: 'UIengineering',
  copyright: 'Copyright © Jan Persiel, Dennis Reimann. Generiert mit der <a href="https://github.com/dennisreimann/uiengine">UIengine</a>.',

  source: {
    components: './src/components',
    templates: './src/templates',
    pages: './src/uiengine/pages'
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
