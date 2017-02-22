import path from 'path'
import moment from 'moment'

const paths = {
  src: 'src',
  dest: 'dist'
}

const revvedFile = (filePath) => {
  let revs
  try { revs = require(`./../${paths.dest}/rev-manifest.json`) } catch (error) { }
  return revs && revs[filePath] || filePath
}

const getDate = (article) =>
  article.updated != null ? new Date(Date.parse(article.updated)) : article.date

export default function (streamFilePath, siteHost, assetHost, defaultScheme) {
  const assetPath = (filePath) => `/${revvedFile(filePath)}`

  const assetUrl = (filePath) => {
    const hostPart = assetHost ? `//${assetHost}` : ''
    const pathPart = assetPath(filePath)
    return hostPart + pathPart
  }

  const siteUrl = (filePath, scheme = defaultScheme) => `${scheme ? scheme + ':' : ''}//${siteHost}${filePath.startsWith('/') ? '' : '/'}${filePath}`

  const podcastImageUrl = (dir, size) => assetUrl(`images/podcast/${dir || 'cover'}/${size}.png`)

  const enforceScheme = (scheme, url) => url.replace(/^.*\/\//, `${scheme}://`)

  return {
    assetPath,
    assetUrl,
    siteUrl,
    podcastImageUrl,
    enforceScheme,

    isCurrentPage (page) {
      const filePath = path.relative(paths.src, streamFilePath)
      return filePath.match(page)
    },

    shortIdToGerman (shortId) {
      const match = shortId.match(/(S(\d+))?(E(\d+))?/)
      const season = match && match.length == 5 ? parseInt(match[2]) : null
      const episode = match && match.length == 5 ? parseInt(match[4]) : null

      if (season && episode) return `Staffel ${season}, Episode ${episode}`
      if (episode) return `Episode ${episode}`
      if (season) return `Staffel ${season}`
    },

    dateFormat: {
      german (date) {
        return date.toISOString().replace(/T.*/, '').split('-').reverse().join('.')
      },

      iso8601 (date) {
        return date.toISOString()
      },

      rfc822 (date) {
        return moment(date).format('ddd, DD MMM YYYY HH:mm:ss ZZ')
      },

      hhmmss (seconds) {
        const n = parseInt(seconds, 10)
        let h = Math.floor(n / 3600)
        let m = Math.floor((n - (h * 3600)) / 60)
        let s = n - (h * 3600) - (m * 60)

        if (h < 10) h = `0${h}`
        if (m < 10) m = `0${m}`
        if (s < 10) s = `0${s}`

        return `${h}:${m}:${s}`
      }
    },

    article: {
      description (a) {
        return a.description || a.content.replace(/(<([^>]+)>)/ig, '').substring(0, 150)
      },

      keywords (a) {
        return a.tags.join(',')
      },

      xmlDate (a) {
        return Date.parse(getDate(a))
      }
    },

    articles: {
      lastUpdate (articles) {
        const dates = articles.map(article => getDate(article))
        const latestDate = new Date(Math.max.apply(null, dates))
        return latestDate
      }
    }
  }
}
