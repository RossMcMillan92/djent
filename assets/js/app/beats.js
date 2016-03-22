import { randFromTo } from './tools';

const generateSequence = ({ bars, beats, allowedLengths, volumeConstant }) => {
    const target = beats * bars;
    let sum = 0;
    let i = 0;
    let seq = [];

    while(Math.round(sum) < target){
        console.log('sum, target', sum, target)
        const randIndex = randFromTo(0, allowedLengths.length-1);
        const newLength = allowedLengths[randIndex];

        if(sum + (1/newLength) <= target){
            seq[i] = {
                beat: newLength,
                volume: volumeConstant ? 1 : Math.round(Math.random())
            };
            sum += (1/newLength);
            i++;
        }
    }

    return seq;
};

const generateTimeMap = sequence => {
    const times = sequence.map((beat, i, seq) => {
        const result = seq.slice(0, i + 1).reduce((prev, cur, i, seq) => {
            return (prev + (1 / cur.beat));
        }, 0);
        console.log('seq', seq[0].beat)
        return result;
    });

    return [0, ...times.slice(0, times.length-1)];
}

export {
    generateSequence,
    generateTimeMap
}
