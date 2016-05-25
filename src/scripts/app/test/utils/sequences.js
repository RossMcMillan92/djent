import { generateSequence } from '../../utils/sequences';
import { expect, assert } from 'chai';

const sumBeats = (a, b) => {
    return a + (b.beat ? (1 / b.beat) : 0);
}

describe('Sequences', () => {
    describe('generateSequence', () => {
        const totalBeats = 4;
        const allowedLengths = [1];
        const hitChance = 1;

        it('should return an array', () => {
            expect(generateSequence({ totalBeats, allowedLengths, hitChance })).to.be.a('array');
        })

        it('result array items should all contain beat and volume properties', () => {
            const result         = generateSequence({ totalBeats, allowedLengths, hitChance });
            const filteredResult = result.filter((item) => item.beat && item.volume);

            expect(filteredResult.length).to.equal(result.length)
        })

        it('result items beat properties should add up to totalBeats input', () => {
            let result    = generateSequence({ totalBeats, allowedLengths, hitChance });
            let resultSum = result.reduce(sumBeats, 0);

            expect(resultSum).to.equal(totalBeats);

            result = generateSequence({ totalBeats: 4, allowedLengths: [2,4], hitChance });
            resultSum = result.reduce(sumBeats, 0);
            console.log('RESULTSUM', resultSum)

            expect(resultSum).to.equal(totalBeats);
        })
    })
})
