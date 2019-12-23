module.exports = {
  properties: {
    '+header(data)': {
      data: {
        type: 'Header'
      }
    }
  },
  variants: [
    {
      file: 'default.pug',
      title: 'Standard'
    },
    {
      file: 'hero.pug',
      title: 'Hero'
    }
  ]
}
