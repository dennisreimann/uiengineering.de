const s01e06 = require('../../../data/episode/s01e06')
const s01e07 = require('../../../data/episode/s01e07')
const s01e08 = require('../../../data/episode/s01e08')

module.exports = {
  template: 'podcast.pug',
  context: {
    title:
      'UI engineering Podcast: Die Zusammenarbeit von Design und Entwicklung',
    podcastFeedPath: '/podcast.xml',
    header: {
      title: 'Podcast',
      type: 'podcast'
    },
    mvb: {
      groupedArticles: {
        bySeason: [
          {
            season: 'S01',
            articles: [
              s01e08,
              s01e07,
              s01e06
            ]
          }
        ]
      }
    }
  }
}
