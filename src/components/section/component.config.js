module.exports = {
  title: 'Section',
  properties: {
    '+block()': {
      block: {
        type: 'Block',
        description: 'Inhalt des Containers als Mixin-Block',
        required: true
      }
    },
    '+container()': {
      block: {
        type: 'Block',
        description: 'Inhalt des Containers als Mixin-Block',
        required: true
      }
    },
    '+section(single, angled)': {
      single: {
        type: 'Boolean',
        description: 'Einzelspaltige Section mit voller Breite',
        default: 'false'
      },
      angled: {
        type: 'String',
        description:
          '<p>Angewinkelte Darstellung, die Richtung ist mit <code>up</code> oder <code>down</code> als Wert anzugeben.</p>',
        default: 'false'
      },
      block: {
        type: 'Block',
        description: 'Inhalt des Containers als Mixin-Block',
        required: true
      }
    }
  }
}
