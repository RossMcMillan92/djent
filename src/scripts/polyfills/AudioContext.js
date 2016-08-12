/*!
audiocontext-polyfill.js v0.1.1
(c) 2013 - 2014 Shinnosuke Watanabe
Licensed under the MIT license
*/

(function(window, undefined) {
  'use strict';

  window.AudioContext = window.AudioContext ||
                        window.webkitAudioContext;

  window.OfflineAudioContext = window.OfflineAudioContext ||
                               window.webkitOfflineAudioContext;

  var Proto = AudioContext.prototype;

  var tmpctx = new AudioContext();

  // Support alternate names
  // start (noteOn), stop (noteOff), createGain (createGainNode), etc.
  var isStillOld = function(normative, old) {
    return normative === undefined && old !== undefined;
  };

  var bufProto = tmpctx.createBufferSource().constructor.prototype;

  if (isStillOld(bufProto.start, bufProto.noteOn) ||
  isStillOld(bufProto.stop, bufProto.noteOff)) {
    var nativeCreateBufferSource = Proto.createBufferSource;

    Proto.createBufferSource = function createBufferSource() {
      var returnNode = nativeCreateBufferSource.call(this);
      returnNode.start = returnNode.start || returnNode.noteOn;
      returnNode.stop = returnNode.stop || returnNode.noteOff;

      return returnNode;
    };
  }

  // Firefox 24 doesn't support OscilatorNode
  if (typeof tmpctx.createOscillator === 'function') {
    var oscProto = tmpctx.createOscillator().constructor.prototype;

    if (isStillOld(oscProto.start, oscProto.noteOn) ||
    isStillOld(oscProto.stop, oscProto.noteOff)) {
      var nativeCreateOscillator = Proto.createOscillator;

      Proto.createOscillator = function createOscillator() {
        var returnNode = nativeCreateOscillator.call(this);
        returnNode.start = returnNode.start || returnNode.noteOn;
        returnNode.stop = returnNode.stop || returnNode.noteOff;

        return returnNode;
      };
    }
  }

  if (Proto.createGain === undefined && Proto.createGainNode !== undefined) {
    Proto.createGain = Proto.createGainNode;
  }

  if (Proto.createDelay === undefined && Proto.createDelayNode !== undefined) {
    Proto.createDelay = Proto.createGainNode;
  }

  if (Proto.createScriptProcessor === undefined &&
  Proto.createJavaScriptNode !== undefined) {
    Proto.createScriptProcessor = Proto.createJavaScriptNode;
  }

  if (tmpctx.close) tmpctx.close()

  // Black magic for iOS
  var is_iOS = (navigator.userAgent.indexOf('like Mac OS X') !== -1);
  if (is_iOS) {
    var OriginalAudioContext = AudioContext;
    window.AudioContext = function AudioContext() {
      var iOSCtx = new OriginalAudioContext();

      var body = document.body;
      var tmpBuf = iOSCtx.createBufferSource();
      var tmpProc = iOSCtx.createScriptProcessor(256, 1, 1);

      body.addEventListener('touchend', instantProcess, false);

      function instantProcess() {
        tmpBuf.start(0);
        tmpBuf.connect(tmpProc);
        tmpProc.connect(iOSCtx.destination);
      }

      // This function will be called once and for all.
      tmpProc.onaudioprocess = function() {
        tmpBuf.disconnect();
        tmpProc.disconnect();
        body.removeEventListener('touchend', instantProcess, false);
        tmpProc.onaudioprocess = null;
      };

      return iOSCtx;
    };
  }
}(window));
