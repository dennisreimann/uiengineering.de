import { join, resolve } from 'path'
import convert from '@uiengine/bridge-theo'

const tokensPath = resolve(__dirname, '..', 'src', 'styles', 'tokens')
const titleize = (name, type) => name.replace(type, '').replace(/([A-Z\d]+)/g, ' $1').replace(/^./, str => str.toUpperCase())
const variablize = string => `$${string.replace(/([a-z])([A-Z\d]+)/g, '$1-$2').replace(/\s+/g, '-').toLowerCase()}`
const modify = prop => {
  const { name, type, reference } = prop
  prop.name = titleize(name, type)
  prop.variable = variablize(name)
  if (reference) prop.reference = titleize(reference, type)
  return prop
}

module.exports = filename => {
  const filePath = join(tokensPath, filename)

  return convert(filePath, modify)
}
