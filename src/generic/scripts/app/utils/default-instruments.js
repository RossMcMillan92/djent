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
const getSoundURL = path => `${absolutePath}${path}`

const getSound = (id, description, path, category, midi) => ({
    id,
    description,
    path: getSoundURL(path),
    category,
    midi,
    amount: 0,
})

const getInstrument = (id, description, sequences, sounds, fadeOutDuration = 0, ringout = false, volume = 1) => ({
    id,
    description,
    sequences,
    sounds,
    fadeOutDuration,
    ringout,
    pitch: 0,
    volume: volume,
    repeatHitTypeForXBeat: 0,
})

const defaultInstruments = [
    getInstrument(
        'b',
        '808 Bass',
        [
            'CUSTOM_SEQUENCE_1',
        ],
        [
            getSound(
                'a',
                'A',
                'assets/audio/trap/mastered/808-a.mp3',
                '808',
                {
                    pitch: [ getMidiNote('A', 0) ],
                },
            ),
            getSound(
                'as',
                'A#',
                'assets/audio/trap/mastered/808-as.mp3',
                '808',
                {
                    pitch: [ getMidiNote('A#', 0) ],
                },
            ),
            getSound(
                'b',
                'B',
                'assets/audio/trap/mastered/808-b.mp3',
                '808',
                {
                    pitch: [ getMidiNote('B', 0) ],
                },
            ),
            getSound(
                'c',
                'C',
                'assets/audio/trap/mastered/808-c.mp3',
                '808',
                {
                    pitch: [ getMidiNote('C', 1) ],
                },
            ),
            getSound(
                'cs',
                'C#',
                'assets/audio/trap/mastered/808-cs.mp3',
                '808',
                {
                    pitch: [ getMidiNote('C#', 1) ],
                },
            ),
            getSound(
                'd',
                'D',
                'assets/audio/trap/mastered/808-d.mp3',
                '808',
                {
                    pitch: [ getMidiNote('D', 1) ],
                },
            ),
            getSound(
                'ds',
                'D#',
                'assets/audio/trap/mastered/808-ds.mp3',
                '808',
                {
                    pitch: [ getMidiNote('D#', 1) ],
                },
            ),
            getSound(
                'e',
                'E',
                'assets/audio/trap/mastered/808-e.mp3',
                '808',
                {
                    pitch: [ getMidiNote('E', 1) ],
                },
            ),
            getSound(
                'f',
                'F',
                'assets/audio/trap/mastered/808-f.mp3',
                '808',
                {
                    pitch: [ getMidiNote('F', 1) ],
                },
            ),
            getSound(
                'fs',
                'F#',
                'assets/audio/trap/mastered/808-fs.mp3',
                '808',
                {
                    pitch: [ getMidiNote('F#', 1) ],
                },
            ),
            getSound(
                'g',
                'G',
                'assets/audio/trap/mastered/808-g.mp3',
                '808',
                {
                    pitch: [ getMidiNote('G', 1) ],
                },
            ),
            getSound(
                'gs',
                'G#',
                'assets/audio/trap/mastered/808-gs.mp3',
                '808',
                {
                    pitch: [ getMidiNote('G#', 1) ],
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
        'fx',
        'FX',
        [
            'CUSTOM_SEQUENCE_1',
        ],
        [
            getSound(
                't',
                'Tweet',
                'assets/audio/trap/tweet.wav',
                'Tweet',
                {
                    pitch: [ kickMidiNote ],
                },
            )
        ],
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
                'assets/audio/trap/mastered/kick1.mp3',
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
                'assets/audio/trap/mastered/snare1.mp3',
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
                'assets/audio/trap/mastered/hho1.mp3',
                'Hihat',
                {
                    pitch: [ hihatMidiNote ],
                },
            ),
            getSound(
                'hc',
                'Closed hihat',
                'assets/audio/trap/mastered/hhc1.mp3',
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
            'steadyWholes',
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
        0.5,
    ),
]

export default defaultInstruments
