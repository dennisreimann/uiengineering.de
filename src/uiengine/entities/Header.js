module.exports = {
  title: {
    type: 'String',
    description: 'Titel',
    required: true
  },
  type: {
    type: 'String',
    description:
      '<p>Typ des Headers, entscheidet über das Hintergrundbild. Bspw. <code>main</code>, <code>podcast</code>, <code>kontakt</code>.</p>',
    required: true
  },
  hero: {
    type: 'Boolean',
    description: 'Große Darstellung',
    default: 'false'
  }
}
