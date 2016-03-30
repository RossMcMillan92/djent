import { randFromTo } from './tools';

// const generateSequence = ({ bars, beats, allowedLengths, hitChance }) => {
//     const target = beats * bars;
//     let sum = 0;
//     let i = 0;
//     let seq = [];
//
//     while(sum < target){
//         const randIndex = randFromTo(0, allowedLengths.length-1);
//         let newLength = allowedLengths[randIndex];
//
//         if(sum + (1/newLength) <= target){
//             newLength = newLength;
//         } else if (!allowedLengths.filter(length => 1 / length < target - sum).length) {
//             newLength = 1 / (target - sum);
//         } else {
//             continue;
//         }
//
//         seq[i] = {
//             beat: newLength,
//             volume: Math.random() < hitChance ? 1 : 0
//         };
//         sum += (1/newLength);
//         i++;
//
//     }
//
//     return seq;
// };

const generateSequence = ({ bars, beats, allowedLengths, hitChance }) => {
    return (function loop (seq, sum, target) {
        const randIndex = randFromTo(0, allowedLengths.length-1);
        let newLength = allowedLengths[randIndex];

        if(sum + (1/newLength) > target){
            if (!allowedLengths.filter(length => 1 / length < target - sum).length) {
                newLength = 1 / (target - sum);
            } else {
                return loop(seq, sum, target);
            }
        }

        if(Math.floor(sum + .001) < target && isFinite(newLength)) {
            sum += (1/newLength);
            const newBeat = {
                beat: newLength,
                volume: Math.random() < hitChance ? 1 : 0
            };
            return loop([ ...seq, newBeat ], sum, target)
        }
        return seq
    })([], 0, beats * bars);
};

const loopSequence = (sequence, totalBeats) => {
    let totalBeatLength = Math.round(sequence.reduce((prev, next) => (1 / next.beat) + prev, 0));
    let newSequence = [ ...sequence ];

    if(totalBeatLength === totalBeats) return newSequence;
    if(totalBeatLength > totalBeats) return newSequence.slice(0, totalBeats - 1);

    let i = 0;
    while(Math.floor(totalBeatLength) < totalBeats ) {
        newSequence = newSequence.concat(newSequence[i]);
        totalBeatLength += 1 / newSequence[i].beat;
        i = (i + 1) < newSequence.length ? i + 1 : 0
    }

    return newSequence
}

const generateTimeMap = sequence => {
    const times = sequence.map((beat, i, seq) => {
        const result = seq.slice(0, i + 1).reduce((prev, cur, i, seq) => {
            return (prev + (1 / cur.beat));
        }, 0);
        return result;
    });

    return [0, ...times.slice(0, times.length-1)];
}

export {
    generateSequence,
    loopSequence,
    generateTimeMap
}
