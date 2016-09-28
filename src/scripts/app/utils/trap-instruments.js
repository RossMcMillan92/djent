const rootOctave = 1;
const getMidiNote = (note, octave) => note + (rootOctave + octave);

const kickMidiNote = 'C2';
const snareMidiNote = 'D2';
const hihatMidiNote = 'A#2';
const crash1MidiNote = 'C#3';
const crash2MidiNote = 'A3';
const chinaMidiNote = 'E3';

const defaultInstrumentProps = {
    pitch: 0,
    volume: 1,
    repeatHitTypeForXBeat: 0,
};

const defaultInstruments = [
    {
        ...defaultInstrumentProps,
        id: 'bass',
        description: 'Bass (808)',
        fadeOutDuration: 0.025,
        sequences: [
            'CUSTOM_SEQUENCE_1',
        ],
        sounds: [
            {
                id: 'a',
                description: 'A',
                path: '/assets/audio/trap/mastered/808-a.mp3',
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'as',
                description: 'A#',
                path: '/assets/audio/trap/mastered/808-as.mp3',
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'b',
                description: 'B',
                path: '/assets/audio/trap/mastered/808-b.mp3',
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'c',
                description: 'C',
                path: '/assets/audio/trap/mastered/808-c.mp3',
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'cs',
                description: 'C#',
                path: '/assets/audio/trap/mastered/808-cs.mp3',
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'd',
                description: 'D',
                path: '/assets/audio/trap/mastered/808-d.mp3',
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'ds',
                description: 'D#',
                path: '/assets/audio/trap/mastered/808-ds.mp3',
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'e',
                description: 'E',
                path: '/assets/audio/trap/mastered/808-e.mp3',
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'f',
                description: 'F',
                path: '/assets/audio/trap/mastered/808-f.mp3',
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'fs',
                description: 'F#',
                path: '/assets/audio/trap/mastered/808-fs.mp3',
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'g',
                description: 'G',
                path: '/assets/audio/trap/mastered/808-g.mp3',
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'gs',
                description: 'G#',
                path: '/assets/audio/trap/mastered/808-gs.mp3',
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
        ],
    },
    {
        ...defaultInstrumentProps,
        id: 'k',
        description: 'Kick',
        sequences: [
            'CUSTOM_SEQUENCE_1',
        ],
        sounds: [
            {
                id: 'k',
                description: 'Kick',
                path: '/assets/audio/trap/mastered/kick1.mp3',
                enabled: false,
                midi: {
                    pitch: [ kickMidiNote ],
                },
            }
        ],
    },
    {
        ...defaultInstrumentProps,
        id: 's',
        description: 'Snare',
        sequences: [
            'offsetWholes',
        ],
        sounds: [
            {
                id: 's',
                description: 'Snare',
                path: '/assets/audio/trap/mastered/snare1.mp3',
                enabled: false,
                midi: {
                    pitch: [ snareMidiNote ],
                },
            }
        ],
    },
    {
        ...defaultInstrumentProps,
        id: 'tuba',
        description: 'Tuba',
        sequences: [
            'CUSTOM_SEQUENCE_1',
        ],
        sounds: [
            {
                id: 'a',
                description: 'A3',
                path: '/assets/audio/trap/tuba-hits/tuba-a2.mp3',
                enabled: false,
                midi: {
                    pitch: [ snareMidiNote ],
                },
            },
            {
                id: 'brass',
                description: 'Brass',
                path: '/assets/audio/trap/tuba-hits/brass.wav',
                enabled: false,
                midi: {
                    pitch: [ snareMidiNote ],
                },
            },
            {
                id: 'fx',
                description: 'FX',
                path: '/assets/audio/trap/FX6.wav',
                enabled: false,
                midi: {
                    pitch: [ snareMidiNote ],
                },
            },
        ],
    },
    {
        ...defaultInstrumentProps,
        id: 'h',
        description: 'Hihat',
        sequences: [
            'steadyQuarters',
            'steadyEighths',
        ],
        sounds: [
            {
                id: 'hc',
                description: 'Closed hihat',
                path: '/assets/audio/trap/mastered/hhc1.mp3',
                enabled: false,
                midi: {
                    pitch: [ hihatMidiNote ],
                },
            },
            {
                id: 'h',
                description: 'Open hihat',
                path: '/assets/audio/trap/mastered/hho1.mp3',
                enabled: false,
                midi: {
                    pitch: [ hihatMidiNote ],
                },
            },
        ],
    },
];

export default defaultInstruments;
