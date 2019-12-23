module.exports = {
  label: 'A2',
  properties: {
    '+cta(title, url)': {
      title: {
        type: 'String',
        description: 'Button-Titel',
        required: true
      },
      url: {
        type: 'String',
        description: 'Ziel-URL',
        required: true
      }
    }
  },
  variants: [
    {
      file: 'cta.pug',
      title: 'Call To Action',
      label: 'A21',
      description: 'Link, der als Call To Action Button dargestellt wird.'
    }
  ]
}
