import path from 'path'
import theo from 'theo'
import { theo as UItheo } from '@uiengine/core'

const tokensPath = path.resolve(__dirname, '..', 'src', 'styles', 'tokens')
const titleize = (name, type) => name.replace(type, '').replace(/([A-Z\d]+)/g, ' $1').replace(/^./, str => str.toUpperCase())
const variablize = string => `$${string.replace(/([a-z])([A-Z\d]+)/g, '$1-$2').replace(/\s+/g, '-').toLowerCase()}`
const modify = prop => {
  const { name, type, reference } = prop
  prop.name = titleize(name, type)
  prop.variable = variablize(name)
  if (reference) prop.reference = titleize(reference, type)
  return prop
}

const convert = filename => {
  const filePath = path.join(tokensPath, filename)

  return UItheo(theo).convert(filePath, modify)
}

module.exports = convert
