import path from 'path'

const valueToStylusVar = string => `$${string.replace(/([a-z])([A-Z\d]+)/g, '$1-$2').replace(/\s+/g, '-').toLowerCase()}`
const aliasToStylusVar = string => string.replace(/{!(.*)}/, (m, name) => valueToStylusVar(name))
const propToStylusVar = ({name, value, originalValue, comment, type}) =>
  `${valueToStylusVar(name)} = ${originalValue !== value ? aliasToStylusVar(originalValue) : value}${comment ? ` // ${comment}` : ''}`
const propsToStylus = (output, prop, index, props) => {
  const prevProp = index > 0 ? props[index - 1] : null
  const prevCategory = prevProp ? prevProp.category : null
  const {category} = prop
  const divider = category === prevCategory ? '' : `\n// ${category}\n`
  return output + divider + propToStylusVar(prop) + '\n'
}

export const stylFormat = immutable =>
  `// Generated from ${path.relative('.', immutable.toJS().meta.file)}
${Object.values(immutable.toJS().props).reduce(propsToStylus, '')}`
