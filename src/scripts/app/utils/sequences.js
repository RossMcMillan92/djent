import {
    randomFromArray,
    repeatArray
} from '../utils/tools';

const predefinedSequences = {
    steadyWholes: {
        description: 'Steady Wholes',
        sequence: [
            { beat: 0.25, volume: 1 },
        ]
    },

    steadyHalfs: {
        description: 'Steady Halfs',
        sequence: [
            { beat: 0.5, volume: 1 },
        ],
    },

    steadyQuarters: {
        description: 'Steady Quarters',
        sequence: [
            { beat: 1, volume: 1 },
        ]
    },

    steadyEighths: {
        description: 'Steady Eighths',
        sequence: [
            { beat: 2, volume: 1 },
        ]
    },

    steadySixteenths: {
        description: 'Steady Sixteenths',
        sequence: [
            { beat: 4, volume: 1 },
        ]
    },

    middleBeat: {
        description: 'Middle Beat',
        sequence: [
            { beat: 1, volume: 0 },
            { beat: 1, volume: 0 },
            { beat: 1, volume: 1 },
            { beat: 1, volume: 0 },
        ]
    },

    offBeat: {
        description: 'Off Beat',
        sequence: [
            { beat: 1, volume: 0 },
            { beat: 1, volume: 1 },
        ]
    },

    drone: {
        description: 'Drone',
        sequence: [
            { beat: 0.125, volume: 1 },
        ]
    }
};

const convertAllowedLengthsToArray = (objs) => objs
    .reduce((newArr, obj) => {
        if (obj.amount) {
            const length = parseFloat(obj.id) * (obj.isTriplet ? 1.5 : 1);
            return [ ...newArr, ...repeatArray([length], obj.amount) ];
        }
        return [ ...newArr ];
    }, []);

const generateSequence = ({ totalBeats, allowedLengths, hitChance }) =>
    (function loop(seq, sum, target) {
        let newLength = randomFromArray(allowedLengths);

        if (sum + (1 / newLength) > target) {
            if (!allowedLengths.filter(length => 1 / length < target - sum).length) {
                newLength = 1 / (target - sum);
            } else {
                return loop(seq, sum, target);
            }
        }

        if (Math.floor(sum + 0.001) < target && isFinite(newLength)) {
            sum += (1 / newLength);
            const newBeat = {
                beat: newLength,
                volume: Math.random() < hitChance ? 1 : 0
            };
            return loop([ ...seq, newBeat ], sum, target);
        }
        return seq;
    }([], 0, totalBeats));

const getAllowedLengthsFromSequence = (sequence, allowedLengths) =>
    allowedLengths.map(length => {
        const amount         = sequence.filter(item => item.beat === parseFloat(length.id)).length;
        const amountTriplets = sequence.filter(item => item.beat === parseFloat(length.id) * 1.5).length;

        return {
            ...length,
            amount    : amount || amountTriplets,
            isTriplet : !!amountTriplets
        };
    });

const loopSequence = (sequence, totalBeats) => {
    if (!sequence.length) return [];

    const totalBeatLength = sequence.reduce((prev, next) => (1 / next.beat) + prev, 0);
    if (totalBeatLength === totalBeats) return [ ...sequence ];

    let newSequence = [];
    let newTotalBeatLength = 0;
    let i = 0;
    while (newTotalBeatLength < totalBeats) {
        let newBeat = sequence[i];

        if (totalBeats - newTotalBeatLength < 1 / newBeat.beat) {
            newBeat = { ...newBeat, beat: 1 / (totalBeats - newTotalBeatLength) };
        }

        newSequence = newSequence.concat(newBeat);
        newTotalBeatLength += 1 / newBeat.beat;
        i = (i + 1) < sequence.length ? i + 1 : 0;
    }

    return newSequence;
};

const generateTimeMap = sequence => {
    const times = sequence.map((beat, i, seq) => seq.slice(0, i + 1).reduce((prev, cur) => (prev + (1 / cur.beat)), 0));
    return [0, ...times.slice(0, times.length - 1)];
};

const getSequence = ({ sequences, generatedSequences, usePredefinedSettings }) => (instrument) => {
    const { predefinedSequence, sequences: instrumentSequences } = instrument;

    if (usePredefinedSettings && predefinedSequence) {
        return {
            ...instrument,
            sequence: predefinedSequence,
        };
    }

    let sequence = randomFromArray(instrumentSequences);

    if (typeof sequence === 'string') {
        if (predefinedSequences[sequence]) {
            sequence = predefinedSequences[sequence].sequence;
        } else if (generatedSequences[sequence]) {
            sequence = generatedSequences[sequence];
        } else {
            const instrumentSequence     = sequences.find(s => s.id === sequence);

            if (instrumentSequence) {
                const instrumentBeatsProduct = instrumentSequence.beats * instrumentSequence.bars;
                const allowedLengths         = convertAllowedLengthsToArray(instrumentSequence.allowedLengths);
                const hitChance              = instrumentSequence.hitChance;
                sequence = generatedSequences[sequence] = generateSequence({ totalBeats: instrumentBeatsProduct, allowedLengths, hitChance });
            } else {
                sequence = undefined;
            }
        }
    }

    return {
        ...instrument,
        sequence,
    };
};

const getTotalTimeLength = (sequences, bpm) => getTotalBeatsLength(sequences) * (60 / bpm);

const getTotalBeatsLength = (sequences) => {
    const totalBeats       = sequences.find(s => s.id === 'total');
    const totalBeatsLength = totalBeats.bars * totalBeats.beats;
    return totalBeatsLength;
};

export {
    convertAllowedLengthsToArray,
    generateSequence,
    getAllowedLengthsFromSequence,
    getTotalBeatsLength,
    getTotalTimeLength,
    loopSequence,
    generateTimeMap,
    getSequence,
    predefinedSequences
};
