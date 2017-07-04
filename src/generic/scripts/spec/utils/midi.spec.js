import {
    combineMultipleTracks,
    convertBPMtoMidi,
    getMidiDataFromHitTypes,
    getTimemapFromTrack,
} from 'utils/midi'

describe('Midi', () => {
    describe('convertBPMtoMidi()', () => {
        it('should return a number', () => {
            expect(typeof convertBPMtoMidi(120)).toBe('number')
        })
        it('should return, in milliseconds, the length of a quarter note at a given bpm', () => {
            expect(convertBPMtoMidi(60)).toBe(250)
            expect(convertBPMtoMidi(120)).toBe(500)
        })
    })

    describe('getMidiDataFromHitTypes()', () => {
        const sounds = [
            {
                id: 'k',
                midi: {
                    pitch: [ 'C2' ],
                }
            },
            {
                id: 's',
                midi: {
                    pitch: [ 'D2' ],
                }
            }
        ]

        const hitTypes = ['k', 'k', 's']

        it('should return an array', () => {
            expect(getMidiDataFromHitTypes(sounds, hitTypes)).toHaveLength(hitTypes.length)
        })
        it('should return an array of midi pitches', () => {
            expect(getMidiDataFromHitTypes(sounds, hitTypes)[0].pitch).toEqual(['C2'])
            expect(getMidiDataFromHitTypes(sounds, hitTypes)[1].pitch).toEqual(['C2'])
            expect(getMidiDataFromHitTypes(sounds, hitTypes)[2].pitch).toEqual(['D2'])
        })
    })

    describe('getTimemapFromTrack()', () => {
        const track1 = [
            {
                duration: 1,
                wait: 0,
                pitch: [ 'C2' ]
            },
            {
                duration: 1,
                wait: 0,
                pitch: [ 'C2' ]
            },
            {
                duration: 1,
                wait: 0,
                pitch: [ 'C2' ]
            },
            {
                duration: 1,
                wait: 0,
                pitch: [ 'C2' ]
            },
        ]
        const track2 = [
            {
                duration: 1,
                wait: 1,
                pitch: [ 'D2' ]
            },
            {
                duration: 1,
                wait: 1.5,
                pitch: [ 'D2' ]
            },
            {
                duration: 1,
                wait: 1,
                pitch: [ 'D2' ]
            },
        ]

        it('should return a array of the same length', () => {
            expect(getTimemapFromTrack(track1)).toHaveLength(track1.length)
            expect(getTimemapFromTrack(track2)).toHaveLength(track2.length)
        })
        it('should return an array of objects, each with a timestamp property', () => {
            expect(getTimemapFromTrack(track1)[0]).toHaveProperty('timestamp', 0)
            expect(getTimemapFromTrack(track1)[1]).toHaveProperty('timestamp', 1)
            expect(getTimemapFromTrack(track1)[2]).toHaveProperty('timestamp', 2)
            expect(getTimemapFromTrack(track1)[3]).toHaveProperty('timestamp', 3)

            expect(getTimemapFromTrack(track2)[0]).toHaveProperty('timestamp', 1)
            expect(getTimemapFromTrack(track2)[1]).toHaveProperty('timestamp', 3.5)
            expect(getTimemapFromTrack(track2)[2]).toHaveProperty('timestamp', 5.5)
        })
    })

    describe('combineMultipleTracks()', () => {
        const track1 = [
            {
                duration: 1,
                wait: 0,
                pitch: [ 'C2' ]
            },
            {
                duration: 1,
                wait: 0,
                pitch: [ 'C2' ]
            },
            {
                duration: 1,
                wait: 0,
                pitch: [ 'C2' ]
            },
            {
                duration: 1,
                wait: 0,
                pitch: [ 'C2' ]
            },
        ]
        const track2 = [
            {
                duration: 1,
                wait: 1,
                pitch: [ 'D2' ]
            },
            {
                duration: 1,
                wait: 1,
                pitch: [ 'D2' ]
            },
        ]
        const track3 = [
            {
                duration: 1,
                wait: 1.5,
                pitch: [ 'D2' ]
            },
            {
                duration: 1,
                wait: 1,
                pitch: [ 'D2' ]
            },
        ]

        const track1and2Merge = [
            {
                duration: 1,
                wait: 0,
                pitch: [ 'C2' ],
                timestamp: 0
            },
            {
                duration: 1,
                wait: 0,
                pitch: [ 'C2', 'D2' ],
                timestamp: 1
            },
            {
                duration: 1,
                wait: 0,
                pitch: [ 'C2' ],
                timestamp: 2
            },
            {
                duration: 1,
                wait: 0,
                pitch: [ 'C2', 'D2' ],
                timestamp: 3
            },
        ]

        const track1and3Merge = [
            {
                duration: 1,
                wait: 0,
                pitch: [ 'C2' ],
                timestamp: 0,
            },
            {
                duration: .5,
                wait: 0,
                pitch: [ 'C2' ],
                timestamp: 1,
            },
            {
                duration: .5,
                wait: 0,
                pitch: [ 'D2' ],
                timestamp: 1.5
            },
            {
                duration: 1,
                wait: 0,
                pitch: [ 'C2' ],
                timestamp: 2,
            },
            {
                duration: .5,
                wait: 0,
                pitch: [ 'C2' ],
                timestamp: 3,
            },
            {
                duration: 1,
                wait: 0,
                pitch: [ 'D2' ],
                timestamp: 3.5,
            },
        ]

        it('should return an array with length 4', () => {
            expect(combineMultipleTracks(track1, track2)).toHaveLength(4)
        })

        it('should merge track1 with track2', () => {
            expect(combineMultipleTracks(track1, track2)).toEqual(track1and2Merge)
            expect(combineMultipleTracks(track2, track1)).toEqual(track1and2Merge)
        })

        it('should take offset beats into account', () => {
            expect(combineMultipleTracks(track1, track3)).toEqual(track1and3Merge)
        })
    })
})
