(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
window.AudioContext = window.AudioContext || window.webkitAudioContext;

var context = new AudioContext();

var BufferLoader = function BufferLoader(context, callback) {
    var newInstrumentPack = new Array();
    var loadCount = 0;

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

var createBufferList = function createBufferList(instrumentPack, cb) {
    return BufferLoader(context, cb).load(instrumentPack);
};

var playSound = function playSound(buffer, time, duration) {
    var source = context.createBufferSource();

    source.buffer = buffer;
    source.connect(context.destination);

    source.start(context.currentTime + time, 0, duration);
};

exports.createBufferList = createBufferList;
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

},{"./tools":3}],3:[function(require,module,exports){
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
	for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		args[_key] = arguments[_key];
	}

	return function (x) {
		return args.reduce(function (prev, cur) {
			return cur.call(cur, prev);
		}, x);
	};
};

var randFromTo = function randFromTo(from, to) {
	return Math.floor(Math.random() * (to - from + 1) + from);
};

exports.repeat = repeat;
exports.compose = compose;
exports.randFromTo = randFromTo;

},{}],4:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('./polyfills/array.values.js');

var _appAudio = require('./app/audio');

var _appBeats = require('./app/beats');

var _appTools = require('./app/tools');

var bpm = 70;
var bpmMultiplier = 60 / bpm;
var bars = 4;
var beats = 4;
var allowedLengths = [.75, 6];

var mainBeat = (0, _appBeats.generateSequence)({ bars: bars, beats: beats, allowedLengths: allowedLengths, hitChance: 1 });

var predefinedSequences = {

    hihat: [{ beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }, { beat: 1, volume: 1 }],

    kick: mainBeat,
    guitar: mainBeat,

    snare: [{ beat: 1, volume: 0 }, { beat: 1, volume: 1 }, { beat: 1, volume: 0 }, { beat: 1, volume: 1 }, { beat: 1, volume: 0 }, { beat: 1, volume: 1 }, { beat: 1, volume: 0 }, { beat: 1, volume: 1 }, { beat: 1, volume: 0 }, { beat: 1, volume: 0 }, { beat: 1, volume: 1 }, { beat: 1, volume: 0 }, { beat: 1, volume: 0 }, { beat: 1, volume: 0 }, { beat: 1, volume: 1 }, { beat: 1, volume: 0 }]
};
var instrumentPacks = [{
    id: 'guitar',
    paths: ['assets/audio/guitar-palm-zero-1.wav', 'assets/audio/guitar-palm-zero-2.wav', 'assets/audio/guitar-open-first-1.wav', 'assets/audio/guitar-open-first-2.wav', 'assets/audio/guitar-open-eighth.wav', 'assets/audio/guitar-dissonance-high.wav']
}, {
    id: 'kick',
    paths: ['assets/audio/kick.wav']
}, {
    id: 'snare',
    paths: ['assets/audio/snare.wav']
}, {
    id: 'hihat',
    paths: ['assets/audio/hihat.wav']
}];

var init = function init(instrumentPack) {
    var instruments = instrumentPack.map(function (instrument, i) {
        console.log('instrument', instrument);
        var sequence = predefinedSequences[instrument.id] || (0, _appBeats.generateSequence)({ bars: bars, beats: beats, allowedLengths: allowedLengths, volumeConstant: true });
        var timeMap = (0, _appBeats.generateTimeMap)(sequence);

        return _extends({}, instrument, {
            sequence: sequence,
            timeMap: timeMap
        });
    });

    var sounds = instruments.forEach(function (instrument) {
        console.log('instrument', instrument);
        console.log('randFromTo(0, instrument.buffers.length-1)', instrument.buffers.length);
        return instrument.timeMap.map(function (time, i) {
            return instrument.sequence[i].volume && (0, _appAudio.playSound)(instrument.buffers[(0, _appTools.randFromTo)(0, instrument.buffers.length - 1)], time * bpmMultiplier, 1 / instrument.sequence[i].beat * bpmMultiplier);
        });
    });
};
(0, _appAudio.createBufferList)(instrumentPacks).then(init);

},{"./app/audio":1,"./app/beats":2,"./app/tools":3,"./polyfills/array.values.js":5}],5:[function(require,module,exports){
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

},{}]},{},[4])