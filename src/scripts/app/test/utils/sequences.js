import {
    convertAllowedLengthsToArray,
    generateSequence,
    loopSequence,
} from '../../utils/sequences';

import { expect, assert } from 'chai';

const sumBeats = (a, b) => {
    return a + (b.beat ? (1 / b.beat) : 0);
}

describe('Sequences', () => {
    describe('generateSequence()', () => {
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

            expect(resultSum).to.equal(4);

            result = generateSequence({ totalBeats, allowedLengths: [2,4], hitChance });
            resultSum = result.reduce(sumBeats, 0);

            expect(resultSum).to.equal(4);
        })

        it('should return the remainder available if no allowedLengths will fit', () => {
            let result = generateSequence({ totalBeats: 1, allowedLengths: [2], hitChance });
            let resultSum = result.reduce(sumBeats, 0);

            expect(resultSum).to.equal(1);

            result = generateSequence({ totalBeats: 7, allowedLengths: [.25], hitChance });
            let beats = result.map(length => Math.round(length.beat * 100) / 100)

            expect(beats).to.deep.equal([.25, 0.33]);
        })
    })

    describe('convertAllowedLengthsToArray()', () => {
        const initial_allowedLengths = [
            {
                id: "0.25",
                name: 'whole',
                amount: 0,
                isTriplet: false
            },
            {
                id: "0.5",
                name: 'half',
                amount: 0,
                isTriplet: false
            },
            {
                id: "1",
                name: 'quarter',
                amount: 0,
                isTriplet: false
            },
            {
                id: "2",
                name: 'eighth',
                amount: 0,
                isTriplet: false
            },
            {
                id: "4",
                name: 'sixteenth',
                amount: 0,
                isTriplet: false
            },
        ];

        it('should return an array', () => {
            let result = convertAllowedLengthsToArray(initial_allowedLengths);
            expect(result).to.be.a('array');
        })

        it('should return an empty array if no amounts are on the passed objects', () => {
            let result = convertAllowedLengthsToArray(initial_allowedLengths);
            expect(result).to.deep.equal([]);
        })

        it('should otherwise return an array of only numbers', () => {
            let allowedLengths = [
                {
                    id: "0.25",
                    name: 'whole',
                    amount: 2,
                    isTriplet: false
                },
                {
                    id: "0.5",
                    name: 'half',
                    amount: 2,
                    isTriplet: false
                },
            ]

            let result = convertAllowedLengthsToArray(allowedLengths);
            let nonNumbers = result.filter(length => isNaN(length));

            expect(nonNumbers.length).to.equal(0)
        })

        it('should return an array of IDs repeated by the "amount"', () => {
            let allowedLengths = [
                {
                    id: "0.25",
                    name: 'whole',
                    amount: 2,
                    isTriplet: false
                },
                {
                    id: "0.5",
                    name: 'half',
                    amount: 2,
                    isTriplet: false
                },
            ]

            let result = convertAllowedLengthsToArray(allowedLengths);

            expect(result).to.deep.equal([0.25, 0.25, 0.5, 0.5])
        })

        it('should multiply IDs by 1.5 if isTriplet is true', () => {
            let allowedLengths = [
                {
                    id: "0.5",
                    name: 'half',
                    amount: 2,
                    isTriplet: true
                },
            ]

            let result = convertAllowedLengthsToArray(allowedLengths);

            expect(result).to.deep.equal([0.75, 0.75])
        })
    })

    describe('loopSequence()', () => {
        it('should return an array', () => {
            let sequence = [
                { beat: 1, volume: 0 },
                { beat: 1, volume: 0 },
                { beat: 1, volume: 1 },
                { beat: 1, volume: 0 },
            ];
            let result = loopSequence(sequence, 8);

            expect(result).to.be.a('array');
        })

        it('should return an array of lengths which add up to the totalBeats amount', () => {
            let sequence = [
                { beat: 1, volume: 0 },
                { beat: 1, volume: 0 },
                { beat: 1, volume: 1 },
                { beat: 1, volume: 0 },
            ];
            let result = loopSequence(sequence, 8);
            let resultSum = result.reduce(sumBeats, 0);

            expect(resultSum).to.equal(8);

            result = loopSequence(sequence, 5);
            resultSum = result.reduce(sumBeats, 0);

            expect(resultSum).to.equal(5);

            sequence = [
                { beat: 1, volume: 0 },
                { beat: 1, volume: 0 },
                { beat: 1, volume: 1 },
                { beat: 2, volume: 0 },
            ];
            result = loopSequence(sequence, 5);
            resultSum = result.reduce(sumBeats, 0);

            expect(resultSum).to.equal(5);

            sequence = [
                { beat: 1, volume: 0 },
                { beat: 1, volume: 0 },
                { beat: 1, volume: 1 },
                { beat: 2, volume: 0 },
            ];
            result = loopSequence(sequence, 1);
            resultSum = result.reduce(sumBeats, 0);

            expect(resultSum).to.equal(1);

            sequence = [
                { beat: 1, volume: 0 },
                { beat: 1, volume: 0 },
                { beat: 1, volume: 1 },
                { beat: 2, volume: 0 },
            ];
            result = loopSequence(sequence, 2);
            resultSum = result.reduce(sumBeats, 0);

            expect(resultSum).to.equal(2);
        })
    })
})
