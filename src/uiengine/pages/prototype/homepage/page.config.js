const s01e07 = require('../../../data/episode/s01e07')
const s01e08 = require('../../../data/episode/s01e08')

module.exports = {
  template: 'page.pug',
  context: {
    title: 'Design und Entwicklung',
    header: {
      title: 'UI engineering',
      type: 'main',
      hero: true
    },
    episodes: [
      s01e08,
      s01e07
    ]
  }
}
