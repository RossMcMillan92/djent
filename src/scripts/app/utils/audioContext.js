/*!
audiocontext-polyfill.js v0.1.1
(c) 2013 - 2014 Shinnosuke Watanabe
Licensed under the MIT license
*/

'use strict';

window.AudioContext = window.AudioContext ||
                    window.webkitAudioContext;

window.OfflineAudioContext = window.OfflineAudioContext ||
                           window.webkitOfflineAudioContext;

// Black magic for iOS
const iosFixer = function(el, ac, cb) {
  let fired = false;

  function handleIOS(e) {
    if (fired) return
    fired = true;
    const buffer = ac.createBuffer(1, 1, 22050)
    const source = ac.createBufferSource()
    source.buffer = buffer
    source.connect(ac.destination)
    source.start(ac.currentTime)
    setTimeout(function() {
      el.removeEventListener('mousedown', handleIOS, false)
      el.removeEventListener('touchend', handleIOS, false)

      console.log('SOURCE.PLAYBACKSTATE', source.playbackState)
      if (cb) cb(source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)
    }, 0)
  }
  el.addEventListener('mousedown', handleIOS, false)
  el.addEventListener('touchend', handleIOS, false)
}

const ac = new window.AudioContext();

iosFixer(document.body, ac)

export default ac;
