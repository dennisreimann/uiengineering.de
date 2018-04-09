if (window.UIengineering.amplitude && window.Amplitude) {
  window.Amplitude.init(window.UIengineering.amplitude)

  document.querySelector('.player__progress').addEventListener('click', function (e) {
    var offset = this.getBoundingClientRect()
    var x = e.pageX - offset.left
    window.Amplitude.setSongPlayedPercentage((parseFloat(x) / parseFloat(this.offsetWidth)) * 100)
  })
}
