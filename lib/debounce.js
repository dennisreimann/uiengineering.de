const debounceTimer = {}

module.exports = (key, fn, delay) => {
  clearTimeout(debounceTimer[key])
  debounceTimer[key] = setTimeout(fn, delay)
}
