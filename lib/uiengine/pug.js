const path = require('path')
const pug = require('pug')
const TemplateHelper = require('../templateHelper')

const pugOpts = {
  basedir: path.resolve(__dirname, '..', '..', 'src', 'components'),
  pretty: true
}

const render = (options, filePath, data = {}) =>
  new Promise((resolve, reject) => {
    const h = TemplateHelper.default(filePath)
    const context = Object.assign({}, pugOpts, data, { h })

    try {
      const rendered = pug.renderFile(filePath, context)

      resolve(rendered)
    } catch (err) {
      reject([
        `Pug could not render "${filePath}"!`,
        err.stack,
        JSON.stringify(context, null, '  ')
      ].join('\n\n'))
    }
  })

module.exports = {
  render
}
