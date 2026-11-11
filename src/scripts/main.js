if (window.UIengineering.amplitude && window.Amplitude) {
  window.Amplitude.init(window.UIengineering.amplitude)

  document.querySelector('.player__progress').addEventListener('click', function (e) {
    const offset = this.getBoundingClientRect()
    const x = e.pageX - offset.left
    window.Amplitude.setSongPlayedPercentage((parseFloat(x) / parseFloat(this.offsetWidth)) * 100)
  })
}
