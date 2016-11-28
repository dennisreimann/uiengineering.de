import fs from 'fs';
import path from 'path';
import moment from 'moment';

const paths = {
  src: 'src',
  dest: 'dist'
};

const revvedFile = (filePath) => {
  let revs;
  try { revs = require(`./../${paths.dest}/rev-manifest.json`); } catch (error) { }
  return revs && revs[filePath] || filePath;
};

const getDate = (article) =>
  article.updated != null ?
    new Date(Date.parse(article.updated)) :
    article.date;

export default {
  createHelper(file, baseUrl) {
    const filePath = path.relative(paths.src, file.path);

    return {
      baseUrl(filePath) {
        return !filePath.match(/^https?:/) ? baseUrl + filePath : filePath;
      },

      assetUrl(filePath) {
        const file = revvedFile(filePath);
        return `/${file}`;
      },

      assetInline(filePath) {
        const file = `./${paths.dest}/${revvedFile(filePath)}`;
        return fs.readFileSync(file, 'utf8');
      },

      isCurrentPage(page) {
        return filePath.match(page);
      },

      dateFormat: {
        german(date) {
          return date.toISOString().replace(/T.*/, '').split('-').reverse().join('.');
        },

        rfc822(date) {
          return moment(date).format('ddd, DD MMM YYYY HH:mm:ss ZZ');
        },

        hhmmss(seconds) {
          const n = parseInt(seconds, 10);
          let h = Math.floor(n / 3600);
          let m = Math.floor((n - (h * 3600)) / 60);
          let s = n - (h * 3600) - (m * 60);

          if (h < 10) h = `0${h}`;
          if (m < 10) m = `0${m}`;
          if (s < 10) s = `0${s}`;

          return `${h}:${m}:${s}`;
        }
      },

      article: {
        description(a) {
          return a.description || a.content.replace(/(<([^>]+)>)/ig, '').substring(0, 150);
        },

        keywords(a) {
          return a.tags.join(',');
        },

        xmlDate(a) {
          return Date.parse(getDate(a));
        },
      },

      articles: {
        lastUpdate(articles) {
          const dates = articles.map(article => getDate(article));
          const latestDate = new Date(Math.max.apply(null, dates));
          return latestDate;
        },
      },
    };
  }
};
