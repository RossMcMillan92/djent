import getAbsolutePath from 'modules/getAbsolutePath'
import isPhoneGap from 'modules/phonegap'

const rootOctave = 1
const getMidiNote = (note, octave) => note + (rootOctave + octave)

const kickMidiNote   = 'C2'
const snareMidiNote  = 'D2'
const hihatMidiNote  = 'A#2'
const crash1MidiNote = 'C#3'
const crash2MidiNote = 'A3'
const chinaMidiNote  = 'E3'

const absolutePath = getAbsolutePath()
const getSoundURL = path => isPhoneGap
    ? `${absolutePath}${path}`
    : `https://raw.githubusercontent.com/RossMcMillan92/djent/master/src/generic/${path}`

const getSound = (id, description, path, category, midi) => ({
    id,
    description,
    path: getSoundURL(path),
    category,
    midi,
    enabled: false,
})

const getInstrument = (id, description, sequences, sounds, fadeOutDuration = 0, ringout = false) => ({
    id,
    description,
    sequences,
    sounds,
    fadeOutDuration,
    ringout,
    pitch: 0,
    volume: 1,
    repeatHitTypeForXBeat: 0,
})

const defaultInstruments = [
    getInstrument(
        'g',
        'Rythm Guitar/Bass (Drop G#)',
        [
            'CUSTOM_SEQUENCE_1',
        ],
        [
            getSound(
                'sixth-0-muted',
                'Fret 0',
                'assets/audio/guitar/sixth-0-muted.mp3',
                'Sixth string [Muted]',
                {
                    pitch: [ getMidiNote('G#', 0), getMidiNote('D#', 1), getMidiNote('G#', 1) ],
                    muted: true,
                },
            ),
            getSound(
                'sixth-1-muted',
                'Fret 1',
                'assets/audio/guitar/sixth-1-muted.mp3',
                'Sixth string [Muted]',
                {
                    pitch: [ getMidiNote('A', 0), getMidiNote('E', 1), getMidiNote('A', 1) ],
                    muted: true,
                },
            ),
            getSound(
                'sixth-2-muted',
                'Fret 2',
                'assets/audio/guitar/sixth-2-muted.mp3',
                'Sixth string [Muted]',
                {
                    pitch: [ getMidiNote('A#', 0), getMidiNote('F', 1), getMidiNote('A#', 1) ],
                    muted: true,
                },
            ),
            getSound(
                'sixth-3-muted',
                'Fret 3',
                'assets/audio/guitar/sixth-3-muted.mp3',
                'Sixth string [Muted]',
                {
                    pitch: [ getMidiNote('B', 0), getMidiNote('F#', 1), getMidiNote('B', 1) ],
                    muted: true,
                },
            ),
            getSound(
                'sixth-4-muted',
                'Fret 4',
                'assets/audio/guitar/sixth-4-muted.mp3',
                'Sixth string [Muted]',
                {
                    pitch: [ getMidiNote('C', 1), getMidiNote('G', 1), getMidiNote('C', 2) ],
                    muted: true,
                },
            ),
            getSound(
                'sixth-8-muted',
                'Fret 8',
                'assets/audio/guitar/sixth-8-muted.mp3',
                'Sixth string [Muted]',
                {
                    pitch: [ getMidiNote('E', 1), getMidiNote('B', 1), getMidiNote('E', 2) ],
                    muted: true,
                },
            ),
            getSound(
                'sixth-0-open',
                'Fret 0',
                'assets/audio/guitar/sixth-0-open.mp3',
                'Sixth string [Open]',
                {
                    pitch: [ getMidiNote('G#', 0) ],
                },
            ),
            getSound(
                'sixth-1-open',
                'Fret 1',
                'assets/audio/guitar/sixth-1-open.mp3',
                'Sixth string [Open]',
                {
                    pitch: [ getMidiNote('A', 0) ],
                },
            ),
            getSound(
                'sixth-2-open',
                'Fret 2',
                'assets/audio/guitar/sixth-2-open.mp3',
                'Sixth string [Open]',
                {
                    pitch: [ getMidiNote('A#', 0) ],
                },
            ),
            getSound(
                'sixth-3-open',
                'Fret 3',
                'assets/audio/guitar/sixth-3-open.mp3',
                'Sixth string [Open]',
                {
                    pitch: [ getMidiNote('B', 0) ],
                },
            ),
            getSound(
                'sixth-4-open',
                'Fret 4',
                'assets/audio/guitar/sixth-4-open.mp3',
                'Sixth string [Open]',
                {
                    pitch: [ getMidiNote('C', 1) ],
                },
            ),
            getSound(
                'sixth-5-open',
                'Fret 5',
                'assets/audio/guitar/sixth-5-open.mp3',
                'Sixth string [Open]',
                {
                    pitch: [ getMidiNote('C#', 1) ],
                },
            ),
            getSound(
                'sixth-6-open',
                'Fret 6',
                'assets/audio/guitar/sixth-6-open.mp3',
                'Sixth string [Open]',
                {
                    pitch: [ getMidiNote('D', 1) ],
                },
            ),
            getSound(
                'sixth-7-open',
                'Fret 7',
                'assets/audio/guitar/sixth-7-open.mp3',
                'Sixth string [Open]',
                {
                    pitch: [ getMidiNote('D#', 1) ],
                },
            ),
            getSound(
                'sixth-8-open',
                'Fret 8',
                'assets/audio/guitar/sixth-8-open.mp3',
                'Sixth string [Open]',
                {
                    pitch: [ getMidiNote('E', 1) ],
                },
            ),
            getSound(
                'sixth-9-open',
                'Fret 9',
                'assets/audio/guitar/sixth-9-open.mp3',
                'Sixth string [Open]',
                {
                    pitch: [ getMidiNote('F', 1) ],
                },
            ),
            getSound(
                'sixth-10-open',
                'Fret 10',
                'assets/audio/guitar/sixth-10-open.mp3',
                'Sixth string [Open]',
                {
                    pitch: [ getMidiNote('F#', 1) ],
                },
            ),
            getSound(
                'sixth-11-open',
                'Fret 11',
                'assets/audio/guitar/sixth-11-open.mp3',
                'Sixth string [Open]',
                {
                    pitch: [ getMidiNote('G', 1) ],
                },
            ),
            getSound(
                'sixth-12-open',
                'Fret 12',
                'assets/audio/guitar/sixth-12-open.mp3',
                'Sixth string [Open]',
                {
                    pitch: [ getMidiNote('G#', 1) ],
                },
            ),
            getSound(
                'sixth-13-open',
                'Fret 13',
                'assets/audio/guitar/sixth-13-open.mp3',
                'Sixth string [Open]',
                {
                    pitch: [ getMidiNote('A', 1) ],
                },
            ),
            getSound(
                'sixth-14-open',
                'Fret 14',
                'assets/audio/guitar/sixth-14-open.mp3',
                'Sixth string [Open]',
                {
                    pitch: [ getMidiNote('A#', 1) ],
                },
            ),
            getSound(
                'sixth-15-open',
                'Fret 15',
                'assets/audio/guitar/sixth-15-open.mp3',
                'Sixth string [Open]',
                {
                    pitch: [ getMidiNote('B', 1) ],
                },
            ),
            getSound(
                'sixth-0-chord',
                'Fret 0',
                'assets/audio/guitar/sixth-0-chord.mp3',
                'Sixth string [Chord]',
                {
                    pitch: [
                        getMidiNote('G#', 0),
                        getMidiNote('D#', 1),
                        getMidiNote('G#', 1),
                        getMidiNote('D#', 2),
                        getMidiNote('G#', 2),
                        getMidiNote('D#', 3),
                    ],
                },
            ),
            getSound(
                'sixth-1-chord',
                'Fret 1',
                'assets/audio/guitar/sixth-1-chord.mp3',
                'Sixth string [Chord]',
                {
                    pitch: [
                        getMidiNote('A', 1),
                        getMidiNote('E', 1),
                        getMidiNote('A', 2),
                        getMidiNote('E', 2),
                        getMidiNote('A', 3),
                    ],
                },
            ),
            getSound(
                'sixth-2-chord',
                'Fret 2',
                'assets/audio/guitar/sixth-2-chord.mp3',
                'Sixth string [Chord]',
                {
                    pitch: [
                        getMidiNote('A#', 1),
                        getMidiNote('F', 1),
                        getMidiNote('A#', 2),
                        getMidiNote('F', 2),
                        getMidiNote('A#', 3),
                    ],
                },
            ),
            getSound(
                'sixth-3-chord',
                'Fret 3',
                'assets/audio/guitar/sixth-3-chord.mp3',
                'Sixth string [Chord]',
                {
                    pitch: [
                        getMidiNote('B', 1),
                        getMidiNote('F#', 1),
                        getMidiNote('B', 2),
                        getMidiNote('F#', 2),
                        getMidiNote('B', 3),
                    ],
                },
            ),
            getSound(
                'sixth-4-chord',
                'Fret 4',
                'assets/audio/guitar/sixth-4-chord.mp3',
                'Sixth string [Chord]',
                {
                    pitch: [
                        getMidiNote('C', 1),
                        getMidiNote('G', 1),
                        getMidiNote('C', 2),
                        getMidiNote('G', 2),
                        getMidiNote('C', 3),
                    ],
                },
            ),
            getSound(
                'sixth-5-chord',
                'Fret 5',
                'assets/audio/guitar/sixth-5-chord.mp3',
                'Sixth string [Chord]',
                {
                    pitch: [
                        getMidiNote('C#', 1),
                        getMidiNote('G#', 1),
                        getMidiNote('C#', 2),
                        getMidiNote('G#', 2),
                        getMidiNote('C#', 3),
                    ],
                },
            ),
            getSound(
                'sixth-6-chord',
                'Fret 6',
                'assets/audio/guitar/sixth-6-chord.mp3',
                'Sixth string [Chord]',
                {
                    pitch: [
                        getMidiNote('D', 1),
                        getMidiNote('A', 2),
                        getMidiNote('D', 2),
                        getMidiNote('A', 3),
                        getMidiNote('D', 3),
                    ],
                },
            ),
            getSound(
                'sixth-7-chord',
                'Fret 7',
                'assets/audio/guitar/sixth-7-chord.mp3',
                'Sixth string [Chord]',
                {
                    pitch: [
                        getMidiNote('D#', 1),
                        getMidiNote('A#', 2),
                        getMidiNote('D#', 2),
                        getMidiNote('A#', 3),
                        getMidiNote('D#', 3),
                    ],
                },
            ),
            getSound(
                'sixth-8-chord',
                'Fret 8',
                'assets/audio/guitar/sixth-8-chord.mp3',
                'Sixth string [Chord]',
                {
                    pitch: [
                        getMidiNote('E', 1),
                        getMidiNote('B', 2),
                        getMidiNote('E', 2),
                        getMidiNote('B', 3),
                        getMidiNote('E', 3),
                    ],
                },
            ),
            getSound(
                'sixth-9-chord',
                'Fret 9',
                'assets/audio/guitar/sixth-9-chord.mp3',
                'Sixth string [Chord]',
                {
                    pitch: [
                        getMidiNote('F', 1),
                        getMidiNote('C', 2),
                        getMidiNote('F', 2),
                        getMidiNote('C', 3),
                        getMidiNote('F', 3),
                    ],
                },
            ),
            getSound(
                'sixth-10-chord',
                'Fret 10',
                'assets/audio/guitar/sixth-10-chord.mp3',
                'Sixth string [Chord]',
                {
                    pitch: [
                        getMidiNote('F#', 1),
                        getMidiNote('C#', 2),
                        getMidiNote('F#', 2),
                        getMidiNote('C#', 3),
                        getMidiNote('F#', 3),
                    ],
                },
            ),
            getSound(
                'sixth-11-chord',
                'Fret 11',
                'assets/audio/guitar/sixth-11-chord.mp3',
                'Sixth string [Chord]',
                {
                    pitch: [
                        getMidiNote('G', 1),
                        getMidiNote('D', 2),
                        getMidiNote('G', 2),
                        getMidiNote('D', 3),
                        getMidiNote('G', 3),
                    ],
                },
            ),
            getSound(
                'sixth-12-chord',
                'Fret 12',
                'assets/audio/guitar/sixth-12-chord.mp3',
                'Sixth string [Chord]',
                {
                    pitch: [
                        getMidiNote('G#', 1),
                        getMidiNote('D#', 2),
                        getMidiNote('G#', 2),
                        getMidiNote('D#', 3),
                        getMidiNote('G#', 3),
                    ],
                },
            ),

            getSound(
                'fifth-5-open',
                'Fret 5',
                'assets/audio/guitar/fifth-5-open.mp3',
                'Fifth string [Open]',
                {
                    pitch: [ getMidiNote('G#', 1) ],
                },
            ),
            getSound(
                'fifth-6-open',
                'Fret 6',
                'assets/audio/guitar/fifth-6-open.mp3',
                'Fifth string [Open]',
                {
                    pitch: [ getMidiNote('A', 1) ],
                },
            ),
            getSound(
                'fifth-7-open',
                'Fret 7',
                'assets/audio/guitar/fifth-7-open.mp3',
                'Fifth string [Open]',
                {
                    pitch: [ getMidiNote('A#', 1) ],
                },
            ),
            getSound(
                'fifth-8-open',
                'Fret 8',
                'assets/audio/guitar/fifth-8-open.mp3',
                'Fifth string [Open]',
                {
                    pitch: [ getMidiNote('B', 1) ],
                },
            ),
            getSound(
                'fifth-9-open',
                'Fret 9',
                'assets/audio/guitar/fifth-9-open.mp3',
                'Fifth string [Open]',
                {
                    pitch: [ getMidiNote('C', 2) ],
                },
            ),
            getSound(
                'fifth-10-open',
                'Fret 10',
                'assets/audio/guitar/fifth-10-open.mp3',
                'Fifth string [Open]',
                {
                    pitch: [ getMidiNote('Db', 2) ],
                },
            ),
            getSound(
                'fifth-11-open',
                'Fret 11',
                'assets/audio/guitar/fifth-11-open.mp3',
                'Fifth string [Open]',
                {
                    pitch: [ getMidiNote('D', 2) ],
                },
            ),
            getSound(
                'fifth-12-open',
                'Fret 12',
                'assets/audio/guitar/fifth-12-open.mp3',
                'Fifth string [Open]',
                {
                    pitch: [ getMidiNote('Eb', 2) ],
                },
            ),

            getSound(
                'third-7-open',
                'Fret 7',
                'assets/audio/guitar/third-7-open.mp3',
                'Third string [Open]',
                {
                    pitch: [ getMidiNote('G#', 2) ],
                },
            ),
            getSound(
                'third-8-open',
                'Fret 8',
                'assets/audio/guitar/third-8-open.mp3',
                'Third string [Open]',
                {
                    pitch: [ getMidiNote('A', 2) ],
                },
            ),
            getSound(
                'third-9-open',
                'Fret 9',
                'assets/audio/guitar/third-9-open.mp3',
                'Third string [Open]',
                {
                    pitch: [ getMidiNote('A#', 2) ],
                },
            ),
            getSound(
                'third-10-open',
                'Fret 10',
                'assets/audio/guitar/third-10-open.mp3',
                'Third string [Open]',
                {
                    pitch: [ getMidiNote('B', 2) ],
                },
            ),

            getSound(
                'third-7-bend',
                'Fret 7',
                'assets/audio/guitar/third-7-bend.mp3',
                'Third string [Bend]',
                {
                    pitch: [ getMidiNote('G#', 2) ],
                },
            ),
            getSound(
                'third-8-bend',
                'Fret 8',
                'assets/audio/guitar/third-8-bend.mp3',
                'Third string [Bend]',
                {
                    pitch: [ getMidiNote('A', 2) ],
                },
            ),

            getSound(
                'dissonance-10',
                'Dissonance fret 10',
                'assets/audio/guitar/dissonance-10.mp3',
                'Misc',
                {
                    pitch: [ getMidiNote('G#', 3), getMidiNote('G', 3) ],
                    muted: true,
                },
            ),
            getSound(
                'dissonance-16',
                'Dissonance fret 16',
                'assets/audio/guitar/dissonance-16.mp3',
                'Misc',
                {
                    pitch: [ getMidiNote('G#', 3), getMidiNote('G', 3) ],
                    muted: true,
                },
            ),

            getSound(
                'scratch',
                'Scratch',
                'assets/audio/guitar/scratch.mp3',
                'Misc',
                {
                    pitch: [ getMidiNote('G#', 0), getMidiNote('D#', 1), getMidiNote('G#', 1) ],
                    duration: 0.125,
                    muted: true,
                },
            ),

        ],
        0.025,
    ),
    getInstrument(
        'lg',
        'Lead Guitar',
        [],
        [
            getSound(
                'gs3',
                'G#3',
                'assets/audio/lead-guitar/lead-gs3.mp3',
                'Upper Frets',
                {
                    pitch: [ getMidiNote('G#', 2) ],
                },
            ),
            getSound(
                'a4',
                'A4',
                'assets/audio/lead-guitar/lead-a4.mp3',
                'Upper Frets',
                {
                    pitch: [ getMidiNote('A', 3) ],
                },
            ),
            getSound(
                'as4',
                'A#4',
                'assets/audio/lead-guitar/lead-as4.mp3',
                'Upper Frets',
                {
                    pitch: [ getMidiNote('A#', 3) ],
                },
            ),
            getSound(
                'b4',
                'B4',
                'assets/audio/lead-guitar/lead-b4.mp3',
                'Upper Frets',
                {
                    pitch: [ getMidiNote('B', 3) ],
                },
            ),
            getSound(
                'c4',
                'C4',
                'assets/audio/lead-guitar/lead-c4.mp3',
                'Upper Frets',
                {
                    pitch: [ getMidiNote('C', 3) ],
                },
            ),
            getSound(
                'cs4',
                'C#4',
                'assets/audio/lead-guitar/lead-cs4.mp3',
                'Upper Frets',
                {
                    pitch: [ getMidiNote('C#', 3) ],
                },
            ),
            getSound(
                'd4',
                'D4',
                'assets/audio/lead-guitar/lead-d4.mp3',
                'Upper Frets',
                {
                    pitch: [ getMidiNote('D', 3) ],
                },
            ),
            getSound(
                'ds4',
                'D#4',
                'assets/audio/lead-guitar/lead-ds4.mp3',
                'Upper Frets',
                {
                    pitch: [ getMidiNote('D#', 3) ],
                },
            ),
            getSound(
                'e4',
                'E4',
                'assets/audio/lead-guitar/lead-e4.mp3',
                'Upper Frets',
                {
                    pitch: [ getMidiNote('E', 3) ],
                },
            ),
            getSound(
                'f4',
                'F4',
                'assets/audio/lead-guitar/lead-f4.mp3',
                'Upper Frets',
                {
                    pitch: [ getMidiNote('F', 3) ],
                },
            ),
            getSound(
                'fs4',
                'F#4',
                'assets/audio/lead-guitar/lead-fs4.mp3',
                'Upper Frets',
                {
                    pitch: [ getMidiNote('F#', 3) ],
                },
            ),
            getSound(
                'g4',
                'G4',
                'assets/audio/lead-guitar/lead-g4.mp3',
                'Upper Frets',
                {
                    pitch: [ getMidiNote('G', 3) ],
                },
            ),
            getSound(
                'gs4',
                'G#4',
                'assets/audio/lead-guitar/lead-gs4.mp3',
                'Upper Frets',
                {
                    pitch: [ getMidiNote('G#', 3) ],
                },
            ),
            getSound(
                'a5',
                'A5',
                'assets/audio/lead-guitar/lead-a5.mp3',
                'Upper Frets',
                {
                    pitch: [ getMidiNote('A', 4) ],
                },
            ),
            getSound(
                'as5',
                'A#5',
                'assets/audio/lead-guitar/lead-as5.mp3',
                'Upper Frets',
                {
                    pitch: [ getMidiNote('A#', 4) ],
                },
            ),
            getSound(
                'b5',
                'B5',
                'assets/audio/lead-guitar/lead-b5.mp3',
                'Upper Frets',
                {
                    pitch: [ getMidiNote('B', 4) ],
                },
            ),
            getSound(
                'c5',
                'C5',
                'assets/audio/lead-guitar/lead-c5.mp3',
                'Upper Frets',
                {
                    pitch: [ getMidiNote('C', 4) ],
                },
            ),
            getSound(
                'cs5',
                'C#5',
                'assets/audio/lead-guitar/lead-cs5.mp3',
                'Upper Frets',
                {
                    pitch: [ getMidiNote('C#', 4) ],
                },
            ),
            getSound(
                'd5',
                'D5',
                'assets/audio/lead-guitar/lead-d5.mp3',
                'Upper Frets',
                {
                    pitch: [ getMidiNote('D', 4) ],
                },
            ),
            getSound(
                'ds5',
                'D#5',
                'assets/audio/lead-guitar/lead-ds5.mp3',
                'Upper Frets',
                {
                    pitch: [ getMidiNote('D#', 4) ],
                },
            ),
            getSound(
                'e5',
                'E5',
                'assets/audio/lead-guitar/lead-e5.mp3',
                'Upper Frets',
                {
                    pitch: [ getMidiNote('E', 4) ],
                },
            ),
            getSound(
                'f5',
                'F5',
                'assets/audio/lead-guitar/lead-f5.mp3',
                'Upper Frets',
                {
                    pitch: [ getMidiNote('F', 4) ],
                },
            ),
            getSound(
                'fs5',
                'F#5',
                'assets/audio/lead-guitar/lead-fs5.mp3',
                'Upper Frets',
                {
                    pitch: [ getMidiNote('F#', 4) ],
                },
            ),
            getSound(
                'g5',
                'G5',
                'assets/audio/lead-guitar/lead-g5.mp3',
                'Upper Frets',
                {
                    pitch: [ getMidiNote('G', 4) ],
                },
            ),
            getSound(
                'gs5',
                'G#5',
                'assets/audio/lead-guitar/lead-gs5.mp3',
                'Upper Frets',
                {
                    pitch: [ getMidiNote('G#', 4) ],
                },
            ),
            getSound(
                'a6',
                'A6',
                'assets/audio/lead-guitar/lead-a6.mp3',
                'Upper Frets',
                {
                    pitch: [ getMidiNote('A', 5) ],
                },
            ),
            getSound(
                'as6',
                'A#6',
                'assets/audio/lead-guitar/lead-as6.mp3',
                'Upper Frets',
                {
                    pitch: [ getMidiNote('A#', 5) ],
                },
            ),
        ],
        0.025,
    ),
    getInstrument(
        'k',
        'Kick',
        [
            'CUSTOM_SEQUENCE_1',
        ],
        [
            getSound(
                'k',
                'Basic kick',
                'assets/audio/mastered/kick.wav',
                'Kick',
                {
                    pitch: [ kickMidiNote ],
                },
            )
        ],
    ),
    getInstrument(
        's',
        'Snare',
        [
            'offsetWholes',
        ],
        [
            getSound(
                's',
                'Basic snare',
                'assets/audio/mastered/snare.wav',
                'Snare',
                {
                    pitch: [ snareMidiNote ],
                },
            )
        ],
    ),
    getInstrument(
        'h',
        'Hihat',
        [
            'steadyHalfs',
            'steadyQuarters',
        ],
        [
            getSound(
                'h',
                'Open hihat',
                'assets/audio/mastered/hihat-open.wav',
                'Hihat',
                {
                    pitch: [ hihatMidiNote ],
                },
            ),
            getSound(
                'hc',
                'Closed hihat',
                'assets/audio/mastered/hihat-closed.wav',
                'Hihat',
                {
                    pitch: [ hihatMidiNote ],
                },
            )
        ],
    ),
    getInstrument(
        'c',
        'Cymbal',
        [
            'steadyHalfs',
            'steadyQuarters',
        ],
        [
            getSound(
                'crash-left',
                'Crash left',
                'assets/audio/mastered/crash-left.wav',
                'Crash',
                {
                    pitch: [ crash1MidiNote ],
                    duration: 0.125,
                },
            ),
            getSound(
                'crash-right',
                'Crash right',
                'assets/audio/mastered/crash-right.wav',
                'Crash',
                {
                    pitch: [ crash2MidiNote ],
                    duration: 0.125,
                },
            ),
            getSound(
                'china-left',
                'China left',
                'assets/audio/mastered/china-left.wav',
                'China',
                {
                    pitch: [ chinaMidiNote ],
                    duration: 0.125,
                },
            )
        ],
        0,
        true,
    ),
    getInstrument(
        'd',
        'Drone',
        [
            'twoBars',
        ],
        [
            getSound(
                'drone-medium',
                'Medium',
                'assets/audio/drones/drone-medium.mp3',
                'Drone'
            ),
            getSound(
                'drone-high',
                'High',
                'assets/audio/drones/drone-high.mp3',
                'Drone'
            ),
            getSound(
                'drone-high-2',
                'Creepy',
                'assets/audio/drones/drone-high-2.mp3',
                'Drone'
            )
        ]
    ),
]

export default defaultInstruments
