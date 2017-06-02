import {
    convertAllowedLengthsToArray,
    generateSequence,
    generateTimeMap,
    getAllowedLengthsFromSequence,
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

        it('should divide IDs by 1.5 if isDotted is true', () => {
            let allowedLengths = [
                {
                    id: "0.5",
                    name: 'half',
                    amount: 2,
                    isDotted: true
                },
            ]

            let result = convertAllowedLengthsToArray(allowedLengths);
            let finalID = 0.5 / 1.5

            expect(result).to.deep.equal([finalID, finalID])
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

    describe('generateTimeMap()', () => {
        let initial_sequence = [
            { beat: 1, volume: 0 },
            { beat: 1, volume: 0 },
            { beat: 1, volume: 1 },
            { beat: 2, volume: 0 },
            { beat: 2, volume: 0 },
        ];

        it('should return an array', () => {
            let result = generateTimeMap(initial_sequence, 8);

            expect(result).to.be.a('array');
        })

        it('should return an array where the first entry is 0', () => {
            let result = generateTimeMap(initial_sequence, 8);

            expect(result[0]).to.equal(0);
        })

        it('should convert an array of beat lengths to map of times based on 120bpm', () => {
            let result = generateTimeMap(initial_sequence, 8);
            let expectedResult = [0, 1, 2, 3, 3.5];

            expect(result).to.deep.equal(expectedResult);

            let sequence = [
                { beat: 0.25, volume: 0 },
                { beat: 0.25, volume: 0 },
                { beat: 1, volume: 1 },
                { beat: 2, volume: 0 },
                { beat: 2, volume: 0 },
            ];
            result = generateTimeMap(sequence, 8);
            expectedResult = [0, 4, 8, 9, 9.5];

            expect(result).to.deep.equal(expectedResult);
        })
    })

    describe('getAllowedLengthsFromSequence()', () => {
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
            expect(getAllowedLengthsFromSequence([
                {"beat":1,"volume":1},
                {"beat":2,"volume":1},
                {"beat":1,"volume":1},
                {"beat":1,"volume":1},
                {"beat":4,"volume":1},
                {"beat":2,"volume":1},
            ], initial_allowedLengths)).to.be.a('array');
        })

        it('should return a clone of initial allowedLengths with the summed amounts', () => {
            const results = getAllowedLengthsFromSequence([
                {"beat":1,"volume":1},
                {"beat":2,"volume":1},
                {"beat":1,"volume":1},
                {"beat":1,"volume":1},
                {"beat":4,"volume":1},
                {"beat":2,"volume":1},
            ], initial_allowedLengths)

            expect(results.find(result => result.id === '0.25').amount).to.equal(0)
            expect(results.find(result => result.id === '0.5').amount).to.equal(0)
            expect(results.find(result => result.id === '1').amount).to.equal(3)
            expect(results.find(result => result.id === '2').amount).to.equal(2)
            expect(results.find(result => result.id === '4').amount).to.equal(1)
        });

        it('should take into account triplets', () => {
            const results = getAllowedLengthsFromSequence([
                {"beat":1.5,"volume":1},
                {"beat":3,"volume":1},
                {"beat":1.5,"volume":1},
                {"beat":1.5,"volume":1},
                {"beat":4,"volume":1},
                {"beat":3,"volume":1},
            ], initial_allowedLengths)

            expect(results.find(result => result.id === '0.25').amount).to.equal(0)
            expect(results.find(result => result.id === '0.5').amount).to.equal(0)
            expect(results.find(result => result.id === '1').amount).to.equal(3)
            expect(results.find(result => result.id === '2').amount).to.equal(2)
            expect(results.find(result => result.id === '4').amount).to.equal(1)

            expect(results.find(result => result.id === '1').isTriplet).to.equal(true)
            expect(results.find(result => result.id === '2').isTriplet).to.equal(true)
        });
    })
})
