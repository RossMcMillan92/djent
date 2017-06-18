window.AudioContext = window.AudioContext || window.webkitAudioContext
window.OfflineAudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext

// Black magic for iOS
const iosFixer = (el, ac, cb) => {
  let fired = false

  const handleIOS = () => {
    if (fired) return
    fired = true
    const buffer = ac.createBuffer(1, 1, 22050)
    const source = ac.createBufferSource()
    source.buffer = buffer
    source.connect(ac.destination)
    source.start(ac.currentTime)
    setTimeout(() => {
      el.removeEventListener('mousedown', handleIOS, false)
      el.removeEventListener('touchend', handleIOS, false)

      if (cb) cb(source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)
    }, 0)
  }
  el.addEventListener('mousedown', handleIOS, false)
  el.addEventListener('touchend', handleIOS, false)
}

const ac = new window.AudioContext()

iosFixer(document.body, ac)

export default ac
