(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var BufferLoader = function BufferLoader(context) {
    var newInstrumentPack = new Array();

    var loadBuffer = function loadBuffer(instrument, index) {
        var bufferAmount = instrument.paths.length;
        var bufferCount = 0;
        instrument.buffers = [];

        var loadingSound = new Promise(function (res, rej) {

            instrument.paths.map(function (url, i) {
                // Load buffer asynchronously
                var request = new XMLHttpRequest();
                request.open("GET", url, true);
                request.responseType = "arraybuffer";

                request.onload = function () {
                    // Asynchronously decode the audio file data in request.response
                    context.decodeAudioData(request.response, function (buffer) {
                        if (!buffer) {
                            alert('error decoding file data: ' + url);
                            return;
                        }

                        instrument.buffers[i] = buffer;
                        newInstrumentPack[index] = instrument;
                        bufferCount++;
                        if (bufferCount === bufferAmount) {
                            res();
                        }
                    }, function (error) {
                        rej();
                        console.error('decodeAudioData error', error);
                    });
                };

                request.onerror = function () {
                    alert('BufferLoader: XHR error');
                };

                request.send();
            });
        });

        return loadingSound;
    };

    var load = function load(instrumentPack) {

        var loadingSounds = instrumentPack.map(loadBuffer);

        return new Promise(function (res, rej) {
            Promise.all(loadingSounds).then(function () {
                return res(newInstrumentPack);
            })["catch"](rej);
        });
    };

    return {
        load: load
    };
};

var loadInstrumentBuffers = function loadInstrumentBuffers(context, instrumentPack) {
    return BufferLoader(context).load(instrumentPack);
};

var playSound = function playSound(context, buffer, time, duration) {
    var source = context.createBufferSource();

    source.buffer = buffer;
    source.connect(context.destination);
    console.log('context.currentTime', context.currentTime);
    source.start(context.currentTime + time, 0, duration);

    return source;
};

exports.loadInstrumentBuffers = loadInstrumentBuffers;
exports.playSound = playSound;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _tools = require('./tools');

var generateSequence = function generateSequence(_ref) {
    var bars = _ref.bars;
    var beats = _ref.beats;
    var allowedLengths = _ref.allowedLengths;
    var hitChance = _ref.hitChance;

    var target = beats * bars;
    var sum = 0;
    var i = 0;
    var seq = [];

    while (Math.round(sum) < target) {
        var randIndex = (0, _tools.randFromTo)(0, allowedLengths.length - 1);
        var newLength = allowedLengths[randIndex];

        if (sum + 1 / newLength <= target) {
            seq[i] = {
                beat: newLength,
                volume: Math.random() < hitChance ? 1 : 0
            };
            sum += 1 / newLength;
            i++;
        }
    }

    return seq;
};

var generateTimeMap = function generateTimeMap(sequence) {
    var times = sequence.map(function (beat, i, seq) {
        var result = seq.slice(0, i + 1).reduce(function (prev, cur, i, seq) {
            return prev + 1 / cur.beat;
        }, 0);
        return result;
    });

    return [0].concat(_toConsumableArray(times.slice(0, times.length - 1)));
};

exports.generateSequence = generateSequence;
exports.generateTimeMap = generateTimeMap;

},{"./tools":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _beats = require('./beats');

var _tools = require('./tools');

var _audio = require('./audio');

var defaultInstrument = {
    id: '',
    paths: [],
    sequence: [],
    timeMaps: [],
    soundMap: []
};

var instruments = {
    guitar: {
        id: 'guitar',
        paths: ['assets/audio/guitar-palm-zero-1.wav', 'assets/audio/guitar-palm-zero-2.wav', 'assets/audio/guitar-open-zero-1.wav', 'assets/audio/guitar-open-zero-2.wav', 'assets/audio/guitar-open-first-1.wav']
    },

    // 'assets/audio/guitar-open-first-2.wav',
    // 'assets/audio/guitar-open-eighth.wav',
    // 'assets/audio/guitar-dissonance-high.wav',
    kick: {
        id: 'kick',
        paths: ['assets/audio/kick.wav']
    },
    snare: {
        id: 'snare',
        paths: ['assets/audio/snare.wav']
    },
    hihat: {
        id: 'hihat',
        paths: ['assets/audio/hihat.wav']
    }
};

var getInstrument = function getInstrument(id, sequence) {
    return _extends({}, defaultInstrument, instruments[id], { sequence: sequence });
};

var generateInstrumentTimeMap = function generateInstrumentTimeMap(instrument) {
    var timeMap = (0, _beats.generateTimeMap)(instrument.sequence);

    return _extends({}, instrument, {
        timeMap: timeMap
    });
};

var generateInstrumentSoundMap = function generateInstrumentSoundMap(instrument) {
    var soundMap = instrument.sequence.map(function (hit) {
        return instrument.buffers[(0, _tools.randFromTo)(0, instrument.buffers.length - 1)];
    });

    return _extends({}, instrument, {
        soundMap: soundMap
    });
};

var playInstrumentSoundsAtTempo = function playInstrumentSoundsAtTempo(context, bpmMultiplier) {
    return function (instrument) {
        instrument.sources = instrument.timeMap.reduce(function (sources, time, i) {
            var instrumentSound = instrument.soundMap[i];
            var startTime = time * bpmMultiplier;
            var duration = 1 / instrument.sequence[i].beat * bpmMultiplier;

            return instrument.sequence[i].volume ? [].concat(_toConsumableArray(sources), [(0, _audio.playSound)(context, instrumentSound, startTime, duration)]) : sources;
        }, []);

        return instrument;
    };
};

var stopInstrumentSounds = function stopInstrumentSounds(instrument) {
    instrument.sources.forEach(function (source) {
        return source.stop();
    });
    return instrument;
};

exports.getInstrument = getInstrument;
exports.generateInstrumentTimeMap = generateInstrumentTimeMap;
exports.generateInstrumentSoundMap = generateInstrumentSoundMap;
exports.playInstrumentSoundsAtTempo = playInstrumentSoundsAtTempo;
exports.stopInstrumentSounds = stopInstrumentSounds;

},{"./audio":1,"./beats":2,"./tools":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var repeat = function repeat(simsNeeded, fn) {
  for (var i = simsNeeded - 1, x = 0; i >= 0; i--) {
    fn(simsNeeded, x);
    x++;
  };
};

var compose = function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return function () {
    if (funcs.length === 0) {
      return arguments[0];
    }

    var last = funcs[funcs.length - 1];
    var rest = funcs.slice(0, -1);

    return rest.reduceRight(function (composed, f) {
      return f(composed);
    }, last.apply(undefined, arguments));
  };
};

var randFromTo = function randFromTo(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
};

exports.repeat = repeat;
exports.compose = compose;
exports.randFromTo = randFromTo;

},{}],5:[function(require,module,exports){
'use strict';

require('./polyfills/array.values.js');

require('./polyfills/AudioContext');

var _appAudio = require('./app/audio');

var _appBeats = require('./app/beats');

var _appInstruments = require('./app/instruments');

var _appTools = require('./app/tools');

var bpm = 100;
var bpmMultiplier = 60 / bpm;
var bars = 4;
var beats = 4;
var allowedLengths = [3, 3, 3, .75];

var mainBeat = (0, _appBeats.generateSequence)({ bars: bars, beats: beats, allowedLengths: allowedLengths, hitChance: 1 });

var predefinedSequences = {

    hihat: [{ beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }],

    kick: mainBeat,
    guitar: mainBeat,

    snare: [{ beat: 1, volume: 0 }, { beat: 1, volume: 0 }, { beat: 1, volume: 1 }, { beat: 1, volume: 0 }, { beat: 1, volume: 0 }, { beat: 1, volume: 0 }, { beat: 1, volume: 1 }, { beat: 1, volume: 0 }, { beat: 1, volume: 0 }, { beat: 1, volume: 0 }, { beat: 1, volume: 1 }, { beat: 1, volume: 0 }, { beat: 1, volume: 0 }, { beat: 1, volume: 0 }, { beat: 1, volume: 1 }, { beat: 1, volume: 0 }]
};

var instrumentPack = [(0, _appInstruments.getInstrument)('guitar', predefinedSequences['guitar']), (0, _appInstruments.getInstrument)('kick', predefinedSequences['kick']), (0, _appInstruments.getInstrument)('snare', predefinedSequences['snare']), (0, _appInstruments.getInstrument)('hihat', predefinedSequences['hihat'])];

var initiateInstruments = function initiateInstruments(instrumentPack, context) {
    var playInstrumentSounds = (0, _appInstruments.playInstrumentSoundsAtTempo)(context, bpmMultiplier);
    var createSoundsAndPlay = function createSoundsAndPlay(instrument) {
        return (0, _appTools.compose)(playInstrumentSounds, _appInstruments.generateInstrumentSoundMap, _appInstruments.generateInstrumentTimeMap)(instrument);
    };
    var instruments = instrumentPack.map(createSoundsAndPlay);

    document.querySelector('.js-play').addEventListener('click', function () {
        instruments.map((0, _appTools.compose)(playInstrumentSounds, _appInstruments.stopInstrumentSounds));
    });
    window.context = context;
};

var context = new AudioContext();
(0, _appAudio.loadInstrumentBuffers)(context, instrumentPack).then(function (instrumentPack) {
    return initiateInstruments(instrumentPack, context, predefinedSequences);
});

},{"./app/audio":1,"./app/beats":2,"./app/instruments":3,"./app/tools":4,"./polyfills/AudioContext":6,"./polyfills/array.values.js":7}],6:[function(require,module,exports){
"use strict";

window.AudioContext = window.AudioContext || window.webkitAudioContext;

},{}],7:[function(require,module,exports){
'use strict';

var reduce = Function.bind.call(Function.call, Array.prototype.reduce);
var isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable);
var concat = Function.bind.call(Function.call, Array.prototype.concat);
var keys = Reflect.ownKeys;

if (!Object.values) {
	Object.values = function values(O) {
		return reduce(keys(O), function (v, k) {
			return concat(v, typeof k === 'string' && isEnumerable(O, k) ? [O[k]] : []);
		}, []);
	};
}

if (!Object.entries) {
	Object.entries = function entries(O) {
		return reduce(keys(O), function (e, k) {
			return concat(e, typeof k === 'string' && isEnumerable(O, k) ? [[k, O[k]]] : []);
		}, []);
	};
}

},{}]},{},[5])