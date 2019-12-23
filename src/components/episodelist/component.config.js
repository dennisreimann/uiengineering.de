const s01e06 = require('../../uiengine/data/episode/s01e06')
const s01e07 = require('../../uiengine/data/episode/s01e07')

module.exports = {
  properties: {
    '+episodeList(episodes, title, subtitle)': {
      episodes: {
        type: '[Episode]',
        required: true
      },
      title: {
        type: 'String',
        description: 'Titel, bspw. der Staffelname'
      },
      subtitle: {
        type: 'String',
        description: 'Untertitel, nutzbar für Anzahl der Episoden'
      }
    }
  },
  context: {
    episodes: [
      s01e07,
      s01e06
    ]
  },
  variants: [
    {
      file: 'list-with-title.pug',
      title: 'Episodenliste mit Titelzeile'
    },
    {
      file: 'list-without-title.pug',
      title: 'Episodenliste ohne Titelzeile'
    }
  ]
}
