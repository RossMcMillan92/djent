import {
    combineMultipleTracks,
    convertBPMtoMidi,
    getMidiDataFromHitTypes,
    getTimemapFromTrack,
} from '../../utils/midi';

import { expect, assert } from 'chai';

describe('Midi', () => {
    describe('convertBPMtoMidi()', () => {
        it('should return a number', () => {
            expect(convertBPMtoMidi(120)).to.be.a('number');
        });
        it('should return, in milliseconds, the length of a quarter note at a given bpm', () => {
            expect(convertBPMtoMidi(60)).to.equal(250)
            expect(convertBPMtoMidi(120)).to.equal(500)
        });
    });

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
        ];

        const hitTypes = ['k', 'k', 's']

        it('should return an array', () => {
            expect(getMidiDataFromHitTypes(sounds, hitTypes)).to.be.a('array');
            expect(getMidiDataFromHitTypes(sounds, hitTypes)).to.have.length(hitTypes.length);
        });
        it('should return an array of midi pitches', () => {
            expect(getMidiDataFromHitTypes(sounds, hitTypes)[0].pitch).to.deep.equal(['C2']);
            expect(getMidiDataFromHitTypes(sounds, hitTypes)[1].pitch).to.deep.equal(['C2']);
            expect(getMidiDataFromHitTypes(sounds, hitTypes)[2].pitch).to.deep.equal(['D2']);
        });
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
        ];
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
        ];

        it('should return a array of the same length', () => {
            expect(getTimemapFromTrack(track1)).to.be.a('array');
            expect(getTimemapFromTrack(track1)).to.have.length(track1.length)
            expect(getTimemapFromTrack(track2)).to.have.length(track2.length)
        });
        it('should return an array of objects, each with a timestamp property', () => {
            expect(getTimemapFromTrack(track1)[0]).to.have.property('timestamp')
                .and.to.equal(0)
            expect(getTimemapFromTrack(track1)[1]).to.have.property('timestamp')
                .and.to.equal(1)
            expect(getTimemapFromTrack(track1)[2]).to.have.property('timestamp')
                .and.to.equal(2)
            expect(getTimemapFromTrack(track1)[3]).to.have.property('timestamp')
                .and.to.equal(3)

            expect(getTimemapFromTrack(track2)[0]).to.have.property('timestamp')
                .and.to.equal(1)
            expect(getTimemapFromTrack(track2)[1]).to.have.property('timestamp')
                .and.to.equal(3.5)
            expect(getTimemapFromTrack(track2)[2]).to.have.property('timestamp')
                .and.to.equal(5.5)
        });
    });

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

        it('should return an array with length 1', () => {
            expect(combineMultipleTracks(track1, track2)).to.be.a('array');
        });

        it('should merge track1 with track2', () => {
            expect(combineMultipleTracks(track1, track2)).to.deep.equal(track1and2Merge)
            expect(combineMultipleTracks(track2, track1)).to.deep.equal(track1and2Merge)
        });

        it('should take offset beats into account', () => {
            expect(combineMultipleTracks(track1, track3)).to.deep.equal(track1and3Merge)
        });
    });
});
