module.exports = {
  properties: {
    '+player(episode)': {
      episode: {
        type: 'Episode',
        required: true
      }
    }
  },
  variants: [
    {
      file: 'single.pug',
      title: 'Single',
      context: {
        episode: {
          permalink: '/podcast/s01e08-bem-atomic-css-und-co.html',
          date: new Date('2017-02-07'),
          title: 'BEMbule! SMACSS my bitch up!',
          subtitle: 'CSS-Architektur und Preprozessoren im Einsatz',
          shortId: 'S01E08',
          imageDir: 's01e08',
          mp3: 's01e08-bem-atomic-css-und-co.mp3',
          duration: '00:27:57',
          description:
            '<p>\n  CSS ist eine Schnittmenge der Gewerke Design und Entwicklung. In der achten Folge des UIengineering Podcasts sprechen wir heute darüber wie wir CSS schreiben, welche Tools wir nutzen und welche Architekturen es gibt.\n</p>\n',
          tags: ['podcast', 'uiengineering'],
          content:
            '<p>CSS ist eine Schnittmenge der Gewerke Design und Entwicklung. In der achten Folge des UIengineering Podcasts sprechen wir heute darüber wie wir CSS schreiben, welche Tools wir nutzen und welche Architekturen es gibt.</p>\n<!-- more -->\n<p>CSS ist nicht CSS ist CSS … heute schreibt kaum noch ein Frontend-Entwickler direkt CSS. Wer sich viel Arbeit und Zeit sparen will, der nutzt einen Preprozessor. Welchen aber nutzt man am besten? Was steckt hinter diesen Tools? Und ist das schon wieder etwas, was ein Designer lernen muss, der womöglich gerade seine ersten Schritte in CSS gemacht hat?</p>\n<p>Wir berichten über unsere Erfahrungen mit BEM, auch ausserhalb der Design-und-Entwickler-Schnittmenge, warum das Konzept gut zu Atomic Design passt und was man sonst noch so beachten kann und sollte. Keine reine Entwicklerfolge, im Gegenteil.</p>\n<h3 id="termine-mit-%23uiengineering">Termine mit #UIengineering</h3>\n<ul>\n<li>16.3.–18.3.2017 <a href="https://www.ecommerce-camp.de/redner-sessions/sessions-2017/">E-Commerce Camp Jena</a></li>\n<li>29.5.–2.6.2017 <a href="https://webinale.de/session/design-development-und-dazwischen/">webinale Berlin</a></li>\n</ul>\n<h3 id="shownotes-%26-links">Shownotes &amp; Links</h3>\n<h4 id="preprozessoren-%2F-architekturen">Preprozessoren / Architekturen</h4>\n<ul>\n<li><a href="http://getbem.com">BEM</a></li>\n<li><a href="http://sass-lang.com">SASS</a></li>\n<li><a href="http://stylus-lang.com">Stylus</a></li>\n<li><a href="http://lesscss.org">LESS</a></li>\n<li><a href="https://acss.io">Atomic CSS</a></li>\n<li><a href="https://smacss.com">SMACSS</a></li>\n</ul>\n<h4 id="tools-zum-kompilieren">Tools zum Kompilieren</h4>\n<ul>\n<li><a href="http://koala-app.com">Koala (Win, Mac, Linux)</a></li>\n<li><a href="https://codekitapp.com">CodeKit (Mac)</a></li>\n<li><a href="https://prepros.io">Prepros (Win, Mac, Linux)</a></li>\n</ul>'
        }
      }
    }
  ]
}
