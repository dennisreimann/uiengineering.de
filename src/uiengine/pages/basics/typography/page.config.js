const fontFamilies = require('../../../../uiengine/tokens/font-families')
const fontSizes = require('../../../../uiengine/tokens/font-sizes')

module.exports = {
  tokens: [
    {
      name: 'Schriftarten',
      type: 'category',
      tokens: [
        {
          name: 'Merriweathersans',
          type: 'category',
          tokens: [
            {
              type: 'font',
              fontweight: 'lightitalic',
              license: 'SIL Open Font License',
              variable: 'MerriweathersansLightitalic',
              value: 'font-family: MerriweathersansLightitalic;',
              sizes: ['2rem', '1rem', '.9rem']
            },
            {
              type: 'font',
              fontweight: 'regular',
              license: 'SIL Open Font License',
              variable: 'MerriweathersansRegular',
              value: 'font-family: MerriweathersansRegular;',
              sizes: ['2rem', '1rem', '.9rem']
            },
            {
              type: 'font',
              fontweight: 'bold',
              license: 'SIL Open Font License',
              variable: 'MerriweathersansBold',
              value: 'font-family: MerriweathersansBold;',
              sizes: ['3rem', '2rem', '1rem']
            }
          ]
        }
      ]
    },
    ...fontFamilies,
    ...fontSizes
  ]
}
