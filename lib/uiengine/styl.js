const filesForComponent = (componentName) =>
  [
    {
      basename: `${componentName}.styl`,
      data: `.${componentName}\n  // TODO: implement\n`
    }
  ]

module.exports = {
  filesForComponent
}
