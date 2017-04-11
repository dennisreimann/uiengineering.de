const fs = require('fs')
const path = require('path')
const pug = require('pug')
const createTemplateHelper = require('../templateHelper')

const pugOpts = {
  basedir: path.resolve(__dirname, '..', '..', 'src', 'templates'),
  pretty: true
}

const render = (options, filePath, data = {}) =>
  new Promise((resolve, reject) => {
    const h = createTemplateHelper(filePath)
    const context = Object.assign({}, pugOpts, data, { h })

    try {
      // for variants get the file contents, prepend the mixins include
      // and render the template string. otherwise render the file.
      if (filePath.match('/variants/')) {
        fs.readFile(filePath, (err, content) => {
          if (err) reject(err)

          const template = `include /includes/mixins\n\n${content}`
          const rendered = pug.render(template, context)

          resolve(rendered)
        })
      } else {
        const rendered = pug.renderFile(filePath, context)

        resolve(rendered)
      }
    } catch (err) {
      const message = [`Pug could not render "${filePath}"!`, err]

      if (options.debug) message.push(JSON.stringify(context, null, '  '))

      reject(message.join('\n\n'))
    }
  })

module.exports = {
  render
}
