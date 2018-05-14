const browserSync = require('./bs-config')

module.exports = {
  name: 'UIengineering',
  copyright: 'Copyright © Jan Persiel, Dennis Reimann. <a href="https://github.com/dennisreimann/uiengine">Generated with UIengine</a>.',

  source: {
    components: './src/components',
    templates: './src/templates',
    pages: './src/uiengine/pages',
    data: './src/uiengine/data',
    schema: './src/uiengine/schema'
  },

  target: './dist/patterns',

  adapters: {
    pug: './lib/uiengine/pug',
    styl: './lib/uiengine/styl'
  },

  template: 'uiengine.pug',

  ui: {
    lang: 'de',
    base: '/patterns/'
  },

  breakpoints: {
    XS: 360,
    S: 560,
    M: 760,
    L: 960
  },

  browserSync
}
