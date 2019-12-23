module.exports = {
  title: {
    type: 'String',
    description: 'Titel',
    required: true
  },
  permalink: {
    type: 'String',
    description: 'URL',
    required: true
  },
  date: {
    type: 'Date',
    description: 'Veröffentlichungsdatum',
    required: true
  },
  shortId: {
    type: 'String',
    description: '<p>Kurzname (bspw. <code>S01E08</code>)</p>',
    required: true
  },
  mp3: {
    type: 'String',
    description: 'MP3-Dateiname',
    required: true
  },
  duration: {
    type: 'String',
    description:
      '<p>Dauer im Format <code>HH:MM:SS</code> (bspw. <code>00:27:57</code>)</p>',
    required: true
  },
  subtitle: {
    type: 'String',
    description: 'Untertitel'
  },
  imageDir: {
    type: 'String',
    description: '<p>Bildverzeichnis (bspw. <code>s01e08</code>)</p>'
  },
  tags: {
    type: '[String]',
    description: 'Liste von Tags'
  },
  content: {
    type: 'String',
    description: 'Beschreibung als Markdown'
  }
}
