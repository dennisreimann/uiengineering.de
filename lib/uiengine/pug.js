const path = require('path')
const pug = require('pug')
const createTemplateHelper = require('../templateHelper')

const pugOpts = {
  basedir: path.resolve(__dirname, '..', '..', 'src', 'components'),
  pretty: true
}

const render = (options, filePath, data = {}) =>
  new Promise((resolve, reject) => {
    const h = createTemplateHelper(filePath)
    const context = Object.assign({}, pugOpts, data, { h })

    try {
      const rendered = pug.renderFile(filePath, context)

      resolve(rendered)
    } catch (err) {
      const message = [`Pug could not render "${filePath}"!`, err]

      if (options.debug) message.push(JSON.stringify(context, null, '  '))

      reject(message.join('\n\n'))
    }
  })

module.exports = {
  render
}
