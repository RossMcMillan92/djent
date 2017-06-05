import { expect, assert } from 'chai'
import {
    convertAllowedLengthsToArray,
    generateSequence,
    generateTimeMap,
    getAllowedLengthsFromSequence,
    loopSequence,
} from '../../utils/sequences'

const sumBeats = (a, b) => a + (b.beat ? (1 / b.beat) : 0)

describe('Sequences', () => {
    describe('generateSequence()', () => {
        const totalBeats = 4
        const allowedLengths = [1]
        const hitChance = 1

        it('should return an array', () => {
            expect(generateSequence({ totalBeats, allowedLengths, hitChance })).to.be.a('array')
        })

        it('result array items should all contain beat and volume properties', () => {
            const result         = generateSequence({ totalBeats, allowedLengths, hitChance })
            const filteredResult = result.filter(item => item.beat && item.volume)

            expect(filteredResult.length).to.equal(result.length)
        })

        it('result items beat properties should add up to totalBeats input', () => {
            let result    = generateSequence({ totalBeats, allowedLengths, hitChance })
            let resultSum = result.reduce(sumBeats, 0)

            expect(resultSum).to.equal(4)

            result = generateSequence({ totalBeats, allowedLengths: [2,4], hitChance })
            resultSum = result.reduce(sumBeats, 0)

            expect(resultSum).to.equal(4)
        })

        it('should return the remainder available if no allowedLengths will fit', () => {
            let result = generateSequence({ totalBeats: 1, allowedLengths: [2], hitChance })
            const resultSum = result.reduce(sumBeats, 0)

            expect(resultSum).to.equal(1)

            result = generateSequence({ totalBeats: 7, allowedLengths: [0.25], hitChance })
            const beats = result.map(length => Math.round(length.beat * 100) / 100)

            expect(beats).to.deep.equal([0.25, 0.33])
        })
    })

    describe('convertAllowedLengthsToArray()', () => {
        const initialAllowedLengths = [
            {
                id: '0.25',
                name: 'whole',
                amount: 0,
                isTriplet: false
            },
            {
                id: '0.5',
                name: 'half',
                amount: 0,
                isTriplet: false
            },
            {
                id: '1',
                name: 'quarter',
                amount: 0,
                isTriplet: false
            },
            {
                id: '2',
                name: 'eighth',
                amount: 0,
                isTriplet: false
            },
            {
                id: '4',
                name: 'sixteenth',
                amount: 0,
                isTriplet: false
            },
        ]

        it('should return an array', () => {
            const result = convertAllowedLengthsToArray(initialAllowedLengths)
            expect(result).to.be.a('array')
        })

        it('should return an empty array if no amounts are on the passed objects', () => {
            const result = convertAllowedLengthsToArray(initialAllowedLengths)
            expect(result).to.deep.equal([])
        })

        it('should otherwise return an array of only numbers', () => {
            const allowedLengths = [
                {
                    id: '0.25',
                    name: 'whole',
                    amount: 2,
                    isTriplet: false
                },
                {
                    id: '0.5',
                    name: 'half',
                    amount: 2,
                    isTriplet: false
                },
            ]

            const result = convertAllowedLengthsToArray(allowedLengths)
            const nonNumbers = result.filter(length => isNaN(length))

            expect(nonNumbers.length).to.equal(0)
        })

        it('should return an array of IDs repeated by the "amount"', () => {
            const allowedLengths = [
                {
                    id: '0.25',
                    name: 'whole',
                    amount: 2,
                    isTriplet: false
                },
                {
                    id: '0.5',
                    name: 'half',
                    amount: 2,
                    isTriplet: false
                },
            ]

            const result = convertAllowedLengthsToArray(allowedLengths)

            expect(result).to.deep.equal([0.25, 0.25, 0.5, 0.5])
        })

        it('should multiply IDs by 1.5 if isTriplet is true', () => {
            const allowedLengths = [
                {
                    id: '0.5',
                    name: 'half',
                    amount: 2,
                    isTriplet: true
                },
            ]

            const result = convertAllowedLengthsToArray(allowedLengths)

            expect(result).to.deep.equal([0.75, 0.75])
        })

        it('should divide IDs by 1.5 if isDotted is true', () => {
            const allowedLengths = [
                {
                    id: '0.5',
                    name: 'half',
                    amount: 2,
                    isDotted: true
                },
            ]

            const result = convertAllowedLengthsToArray(allowedLengths)
            const finalID = 0.5 / 1.5

            expect(result).to.deep.equal([finalID, finalID])
        })
    })

    describe('loopSequence()', () => {
        it('should return an array', () => {
            const sequence = [
                { beat: 1, volume: 0 },
                { beat: 1, volume: 0 },
                { beat: 1, volume: 1 },
                { beat: 1, volume: 0 },
            ]
            const result = loopSequence(sequence, 8)

            expect(result).to.be.a('array')
        })

        it('should return an array of lengths which add up to the totalBeats amount', () => {
            let sequence = [
                { beat: 1, volume: 0 },
                { beat: 1, volume: 0 },
                { beat: 1, volume: 1 },
                { beat: 1, volume: 0 },
            ]
            let result = loopSequence(sequence, 8)
            let resultSum = result.reduce(sumBeats, 0)

            expect(resultSum).to.equal(8)

            result = loopSequence(sequence, 5)
            resultSum = result.reduce(sumBeats, 0)

            expect(resultSum).to.equal(5)

            sequence = [
                { beat: 1, volume: 0 },
                { beat: 1, volume: 0 },
                { beat: 1, volume: 1 },
                { beat: 2, volume: 0 },
            ]
            result = loopSequence(sequence, 5)
            resultSum = result.reduce(sumBeats, 0)

            expect(resultSum).to.equal(5)

            sequence = [
                { beat: 1, volume: 0 },
                { beat: 1, volume: 0 },
                { beat: 1, volume: 1 },
                { beat: 2, volume: 0 },
            ]
            result = loopSequence(sequence, 1)
            resultSum = result.reduce(sumBeats, 0)

            expect(resultSum).to.equal(1)

            sequence = [
                { beat: 1, volume: 0 },
                { beat: 1, volume: 0 },
                { beat: 1, volume: 1 },
                { beat: 2, volume: 0 },
            ]
            result = loopSequence(sequence, 2)
            resultSum = result.reduce(sumBeats, 0)

            expect(resultSum).to.equal(2)
        })
    })

    describe('generateTimeMap()', () => {
        const initialSequence = [
            { beat: 1, volume: 0 },
            { beat: 1, volume: 0 },
            { beat: 1, volume: 1 },
            { beat: 2, volume: 0 },
            { beat: 2, volume: 0 },
        ]

        it('should return an array', () => {
            const result = generateTimeMap(initialSequence, 8)

            expect(result).to.be.a('array')
        })

        it('should return an array where the first entry is 0', () => {
            const result = generateTimeMap(initialSequence, 8)

            expect(result[0]).to.equal(0)
        })

        it('should convert an array of beat lengths to map of times based on 120bpm', () => {
            let result = generateTimeMap(initialSequence, 8)
            let expectedResult = [0, 1, 2, 3, 3.5]

            expect(result).to.deep.equal(expectedResult)

            const sequence = [
                { beat: 0.25, volume: 0 },
                { beat: 0.25, volume: 0 },
                { beat: 1, volume: 1 },
                { beat: 2, volume: 0 },
                { beat: 2, volume: 0 },
            ]
            result = generateTimeMap(sequence, 8)
            expectedResult = [0, 4, 8, 9, 9.5]

            expect(result).to.deep.equal(expectedResult)
        })
    })

    describe('getAllowedLengthsFromSequence()', () => {
        const initialAllowedLengths = [
            {
                id: '0.25',
                name: 'whole',
                amount: 0,
                isTriplet: false
            },
            {
                id: '0.5',
                name: 'half',
                amount: 0,
                isTriplet: false
            },
            {
                id: '1',
                name: 'quarter',
                amount: 0,
                isTriplet: false
            },
            {
                id: '2',
                name: 'eighth',
                amount: 0,
                isTriplet: false
            },
            {
                id: '4',
                name: 'sixteenth',
                amount: 0,
                isTriplet: false
            },
        ]

        it('should return an array', () => {
            expect(getAllowedLengthsFromSequence([
                { beat: 1, volume: 1 },
                { beat: 2, volume: 1 },
                { beat: 1, volume: 1 },
                { beat: 1, volume: 1 },
                { beat: 4, volume: 1 },
                { beat: 2, volume: 1 },
            ], initialAllowedLengths)).to.be.a('array')
        })

        it('should return a clone of initial allowedLengths with the summed amounts', () => {
            const results = getAllowedLengthsFromSequence([
                { beat: 1, volume: 1 },
                { beat: 2, volume: 1 },
                { beat: 1, volume: 1 },
                { beat: 1, volume: 1 },
                { beat: 4, volume: 1 },
                { beat: 2, volume: 1 },
            ], initialAllowedLengths)

            expect(results.find(result => result.id === '0.25').amount).to.equal(0)
            expect(results.find(result => result.id === '0.5').amount).to.equal(0)
            expect(results.find(result => result.id === '1').amount).to.equal(3)
            expect(results.find(result => result.id === '2').amount).to.equal(2)
            expect(results.find(result => result.id === '4').amount).to.equal(1)
        })

        it('should take into account triplets', () => {
            const results = getAllowedLengthsFromSequence([
                { beat: 1.5, volume: 1 },
                { beat: 3, volume: 1 },
                { beat: 1.5, volume: 1 },
                { beat: 1.5, volume: 1 },
                { beat: 4, volume: 1 },
                { beat: 3, volume: 1 },
            ], initialAllowedLengths)

            expect(results.find(result => result.id === '0.25').amount).to.equal(0)
            expect(results.find(result => result.id === '0.5').amount).to.equal(0)
            expect(results.find(result => result.id === '1').amount).to.equal(3)
            expect(results.find(result => result.id === '2').amount).to.equal(2)
            expect(results.find(result => result.id === '4').amount).to.equal(1)

            expect(results.find(result => result.id === '1').isTriplet).to.equal(true)
            expect(results.find(result => result.id === '2').isTriplet).to.equal(true)
        })
    })
})
