import settings from 'settings';

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

const getSoundURL = (path) => settings.useExternalSoundFiles
    ? `https://raw.githubusercontent.com/RossMcMillan92/djent/master/src/generic${path}`
    : path;

const defaultInstruments = [
    {
        ...defaultInstrumentProps,
        id: 'g',
        description: 'Guitar/Bass (Drop G#)',
        fadeOutDuration: 0.025,
        sequences: [
            'CUSTOM_SEQUENCE_1',
        ],
        sounds: [
            {
                id: 'sixth-0-muted',
                description: 'Fret 0',
                path: getSoundURL('/assets/audio/guitar/sixth-0-muted.mp3'),
                enabled: false,
                category: 'Sixth string [Muted]',
                midi: {
                    pitch: [ getMidiNote('G#', 0), getMidiNote('D#', 1), getMidiNote('G#', 1) ],
                    muted: true,
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 0 ],
                    palmMuted: true,
                },
            },
            {
                id: 'sixth-1-muted',
                description: 'Fret 1',
                path: getSoundURL('/assets/audio/guitar/sixth-1-muted.mp3'),
                enabled: false,
                category: 'Sixth string [Muted]',
                midi: {
                    pitch: [ getMidiNote('A', 0), getMidiNote('E', 1), getMidiNote('A', 1) ],
                    muted: true,
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 1 ],
                    palmMuted: true,
                },
            },
            {
                id: 'sixth-2-muted',
                description: 'Fret 2',
                path: getSoundURL('/assets/audio/guitar/sixth-2-muted.mp3'),
                enabled: false,
                category: 'Sixth string [Muted]',
                midi: {
                    pitch: [ getMidiNote('A#', 0), getMidiNote('F', 1), getMidiNote('A#', 1) ],
                    muted: true,
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 2 ],
                    palmMuted: true,
                },
            },
            {
                id: 'sixth-3-muted',
                description: 'Fret 3',
                path: getSoundURL('/assets/audio/guitar/sixth-3-muted.mp3'),
                enabled: false,
                category: 'Sixth string [Muted]',
                midi: {
                    pitch: [ getMidiNote('B', 0), getMidiNote('F#', 1), getMidiNote('B', 1) ],
                    muted: true,
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 3 ],
                    palmMuted: true,
                },
            },
            {
                id: 'sixth-4-muted',
                description: 'Fret 4',
                path: getSoundURL('/assets/audio/guitar/sixth-4-muted.mp3'),
                enabled: false,
                category: 'Sixth string [Muted]',
                midi: {
                    pitch: [ getMidiNote('C', 1), getMidiNote('G', 1), getMidiNote('C', 2) ],
                    muted: true,
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 4 ],
                    palmMuted: true,
                },
            },
            {
                id: 'sixth-8-muted',
                description: 'Fret 8',
                path: getSoundURL('/assets/audio/guitar/sixth-8-muted.mp3'),
                enabled: false,
                category: 'Sixth string [Muted]',
                midi: {
                    pitch: [ getMidiNote('E', 1), getMidiNote('B', 1), getMidiNote('E', 2) ],
                    muted: true,
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 8 ],
                    palmMuted: true,
                },
            },
            {
                id: 'sixth-0-open',
                description: 'Fret 0',
                path: getSoundURL('/assets/audio/guitar/sixth-0-open.mp3'),
                enabled: false,
                category: 'Sixth string [Open]',
                midi: {
                    pitch: [ getMidiNote('G#', 0) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 0 ],
                },
            },
            {
                id: 'sixth-1-open',
                description: 'Fret 1',
                path: getSoundURL('/assets/audio/guitar/sixth-1-open.mp3'),
                enabled: false,
                category: 'Sixth string [Open]',
                midi: {
                    pitch: [ getMidiNote('A', 0) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 1 ],
                },
            },
            {
                id: 'sixth-2-open',
                description: 'Fret 2',
                path: getSoundURL('/assets/audio/guitar/sixth-2-open.mp3'),
                enabled: false,
                category: 'Sixth string [Open]',
                midi: {
                    pitch: [ getMidiNote('A#', 0) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 2 ],
                },
            },
            {
                id: 'sixth-3-open',
                description: 'Fret 3',
                path: getSoundURL('/assets/audio/guitar/sixth-3-open.mp3'),
                enabled: false,
                category: 'Sixth string [Open]',
                midi: {
                    pitch: [ getMidiNote('B', 0) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 3 ],
                },
            },
            {
                id: 'sixth-4-open',
                description: 'Fret 4',
                path: getSoundURL('/assets/audio/guitar/sixth-4-open.mp3'),
                enabled: false,
                category: 'Sixth string [Open]',
                midi: {
                    pitch: [ getMidiNote('C', 1) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 4 ],
                },
            },
            {
                id: 'sixth-5-open',
                description: 'Fret 5',
                path: getSoundURL('/assets/audio/guitar/sixth-5-open.mp3'),
                enabled: false,
                category: 'Sixth string [Open]',
                midi: {
                    pitch: [ getMidiNote('C#', 1) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 5 ],
                },
            },
            {
                id: 'sixth-6-open',
                description: 'Fret 6',
                path: getSoundURL('/assets/audio/guitar/sixth-6-open.mp3'),
                enabled: false,
                category: 'Sixth string [Open]',
                midi: {
                    pitch: [ getMidiNote('D', 1) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 6 ],
                },
            },
            {
                id: 'sixth-7-open',
                description: 'Fret 7',
                path: getSoundURL('/assets/audio/guitar/sixth-7-open.mp3'),
                enabled: false,
                category: 'Sixth string [Open]',
                midi: {
                    pitch: [ getMidiNote('D#', 1) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 7 ],
                },
            },
            {
                id: 'sixth-8-open',
                description: 'Fret 8',
                path: getSoundURL('/assets/audio/guitar/sixth-8-open.mp3'),
                enabled: false,
                category: 'Sixth string [Open]',
                midi: {
                    pitch: [ getMidiNote('E', 1) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 8 ],
                },
            },
            {
                id: 'sixth-9-open',
                description: 'Fret 9',
                path: getSoundURL('/assets/audio/guitar/sixth-9-open.mp3'),
                enabled: false,
                category: 'Sixth string [Open]',
                midi: {
                    pitch: [ getMidiNote('F', 1) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 9 ],
                },
            },
            {
                id: 'sixth-10-open',
                description: 'Fret 10',
                path: getSoundURL('/assets/audio/guitar/sixth-10-open.mp3'),
                enabled: false,
                category: 'Sixth string [Open]',
                midi: {
                    pitch: [ getMidiNote('F#', 1) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 10 ],
                },
            },
            {
                id: 'sixth-11-open',
                description: 'Fret 11',
                path: getSoundURL('/assets/audio/guitar/sixth-11-open.mp3'),
                enabled: false,
                category: 'Sixth string [Open]',
                midi: {
                    pitch: [ getMidiNote('G', 1) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 11 ],
                },
            },
            {
                id: 'sixth-12-open',
                description: 'Fret 12',
                path: getSoundURL('/assets/audio/guitar/sixth-12-open.mp3'),
                enabled: false,
                category: 'Sixth string [Open]',
                midi: {
                    pitch: [ getMidiNote('G#', 1) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 12 ],
                },
            },
            {
                id: 'sixth-13-open',
                description: 'Fret 13',
                path: getSoundURL('/assets/audio/guitar/sixth-13-open.mp3'),
                enabled: false,
                category: 'Sixth string [Open]',
                midi: {
                    pitch: [ getMidiNote('A', 1) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 13 ],
                },
            },
            {
                id: 'sixth-14-open',
                description: 'Fret 14',
                path: getSoundURL('/assets/audio/guitar/sixth-14-open.mp3'),
                enabled: false,
                category: 'Sixth string [Open]',
                midi: {
                    pitch: [ getMidiNote('A#', 1) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 14 ],
                },
            },
            {
                id: 'sixth-15-open',
                description: 'Fret 15',
                path: getSoundURL('/assets/audio/guitar/sixth-15-open.mp3'),
                enabled: false,
                category: 'Sixth string [Open]',
                midi: {
                    pitch: [ getMidiNote('B', 1) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 15 ],
                },
            },
            {
                id: 'sixth-0-chord',
                description: 'Fret 0',
                path: getSoundURL('/assets/audio/guitar/sixth-0-chord.mp3'),
                enabled: false,
                category: 'Sixth string [Chord]',
                midi: {
                    pitch: [ getMidiNote('G#', 0) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 0 ],
                },
            },
            {
                id: 'sixth-1-chord',
                description: 'Fret 1',
                path: getSoundURL('/assets/audio/guitar/sixth-1-chord.mp3'),
                enabled: false,
                category: 'Sixth string [Chord]',
                midi: {
                    pitch: [ getMidiNote('A', 0) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 1 ],
                },
            },
            {
                id: 'sixth-2-chord',
                description: 'Fret 2',
                path: getSoundURL('/assets/audio/guitar/sixth-2-chord.mp3'),
                enabled: false,
                category: 'Sixth string [Chord]',
                midi: {
                    pitch: [ getMidiNote('A#', 0) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 2 ],
                },
            },
            {
                id: 'sixth-3-chord',
                description: 'Fret 3',
                path: getSoundURL('/assets/audio/guitar/sixth-3-chord.mp3'),
                enabled: false,
                category: 'Sixth string [Chord]',
                midi: {
                    pitch: [ getMidiNote('B', 0) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 3 ],
                },
            },
            {
                id: 'sixth-4-chord',
                description: 'Fret 4',
                path: getSoundURL('/assets/audio/guitar/sixth-4-chord.mp3'),
                enabled: false,
                category: 'Sixth string [Chord]',
                midi: {
                    pitch: [ getMidiNote('C', 1) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 4 ],
                },
            },
            {
                id: 'sixth-5-chord',
                description: 'Fret 5',
                path: getSoundURL('/assets/audio/guitar/sixth-5-chord.mp3'),
                enabled: false,
                category: 'Sixth string [Chord]',
                midi: {
                    pitch: [ getMidiNote('C#', 1) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 5 ],
                },
            },
            {
                id: 'sixth-6-chord',
                description: 'Fret 6',
                path: getSoundURL('/assets/audio/guitar/sixth-6-chord.mp3'),
                enabled: false,
                category: 'Sixth string [Chord]',
                midi: {
                    pitch: [ getMidiNote('D', 1) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 6 ],
                },
            },
            {
                id: 'sixth-7-chord',
                description: 'Fret 7',
                path: getSoundURL('/assets/audio/guitar/sixth-7-chord.mp3'),
                enabled: false,
                category: 'Sixth string [Chord]',
                midi: {
                    pitch: [ getMidiNote('D#', 1) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 7 ],
                },
            },
            {
                id: 'sixth-8-chord',
                description: 'Fret 8',
                path: getSoundURL('/assets/audio/guitar/sixth-8-chord.mp3'),
                enabled: false,
                category: 'Sixth string [Chord]',
                midi: {
                    pitch: [ getMidiNote('E', 1) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 8 ],
                },
            },
            {
                id: 'sixth-9-chord',
                description: 'Fret 9',
                path: getSoundURL('/assets/audio/guitar/sixth-9-chord.mp3'),
                enabled: false,
                category: 'Sixth string [Chord]',
                midi: {
                    pitch: [ getMidiNote('F', 1) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 9 ],
                },
            },
            {
                id: 'sixth-10-chord',
                description: 'Fret 10',
                path: getSoundURL('/assets/audio/guitar/sixth-10-chord.mp3'),
                enabled: false,
                category: 'Sixth string [Chord]',
                midi: {
                    pitch: [ getMidiNote('F#', 1) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 10 ],
                },
            },
            {
                id: 'sixth-11-chord',
                description: 'Fret 11',
                path: getSoundURL('/assets/audio/guitar/sixth-11-chord.mp3'),
                enabled: false,
                category: 'Sixth string [Chord]',
                midi: {
                    pitch: [ getMidiNote('G', 1) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 11 ],
                },
            },
            {
                id: 'sixth-12-chord',
                description: 'Fret 12',
                path: getSoundURL('/assets/audio/guitar/sixth-12-chord.mp3'),
                enabled: false,
                category: 'Sixth string [Chord]',
                midi: {
                    pitch: [ getMidiNote('G#', 1) ],
                },
                tabConfig: {
                    strings: [ 6 ],
                    frets: [ 12 ],
                },
            },

            {
                id: 'fifth-5-open',
                description: 'Fret 5',
                path: getSoundURL('/assets/audio/guitar/fifth-5-open.mp3'),
                enabled: false,
                category: 'Fifth string [Open]',
                midi: {
                    pitch: [ getMidiNote('G#', 1) ],
                },
                tabConfig: {
                    strings: [ 5 ],
                    frets: [ 6 ],
                    palmMuted: true,
                },
            },
            {
                id: 'fifth-6-open',
                description: 'Fret 6',
                path: getSoundURL('/assets/audio/guitar/fifth-6-open.mp3'),
                enabled: false,
                category: 'Fifth string [Open]',
                midi: {
                    pitch: [ getMidiNote('A', 1) ],
                },
                tabConfig: {
                    strings: [ 5 ],
                    frets: [ 6 ],
                },
            },
            {
                id: 'fifth-7-open',
                description: 'Fret 7',
                path: getSoundURL('/assets/audio/guitar/fifth-7-open.mp3'),
                enabled: false,
                category: 'Fifth string [Open]',
                midi: {
                    pitch: [ getMidiNote('A#', 1) ],
                },
                tabConfig: {
                    strings: [ 5 ],
                    frets: [ 7 ],
                },
            },
            {
                id: 'fifth-8-open',
                description: 'Fret 8',
                path: getSoundURL('/assets/audio/guitar/fifth-8-open.mp3'),
                enabled: false,
                category: 'Fifth string [Open]',
                midi: {
                    pitch: [ getMidiNote('B', 1) ],
                },
                tabConfig: {
                    strings: [ 5 ],
                    frets: [ 8 ],
                },
            },
            {
                id: 'fifth-9-open',
                description: 'Fret 9',
                path: getSoundURL('/assets/audio/guitar/fifth-9-open.mp3'),
                enabled: false,
                category: 'Fifth string [Open]',
                midi: {
                    pitch: [ getMidiNote('C', 2) ],
                },
                tabConfig: {
                    strings: [ 5 ],
                    frets: [ 9 ],
                },
            },
            {
                id: 'fifth-10-open',
                description: 'Fret 10',
                path: getSoundURL('/assets/audio/guitar/fifth-10-open.mp3'),
                enabled: false,
                category: 'Fifth string [Open]',
                midi: {
                    pitch: [ getMidiNote('Db', 2) ],
                },
                tabConfig: {
                    strings: [ 5 ],
                    frets: [ 10 ],
                },
            },
            {
                id: 'fifth-11-open',
                description: 'Fret 11',
                path: getSoundURL('/assets/audio/guitar/fifth-11-open.mp3'),
                enabled: false,
                category: 'Fifth string [Open]',
                midi: {
                    pitch: [ getMidiNote('D', 2) ],
                },
                tabConfig: {
                    strings: [ 5 ],
                    frets: [ 11 ],
                },
            },
            {
                id: 'fifth-12-open',
                description: 'Fret 12',
                path: getSoundURL('/assets/audio/guitar/fifth-12-open.mp3'),
                enabled: false,
                category: 'Fifth string [Open]',
                midi: {
                    pitch: [ getMidiNote('Eb', 2) ],
                },
                tabConfig: {
                    strings: [ 5 ],
                    frets: [ 12 ],
                },
            },

            {
                id: 'third-7-open',
                description: 'Fret 7',
                path: getSoundURL('/assets/audio/guitar/third-7-open.mp3'),
                enabled: false,
                category: 'Third string [Open]',
                midi: {
                    pitch: [ getMidiNote('G#', 2) ],
                },
                tabConfig: {
                    strings: [ 3 ],
                    frets: [ 7 ],
                },
            },
            {
                id: 'third-8-open',
                description: 'Fret 8',
                path: getSoundURL('/assets/audio/guitar/third-8-open.mp3'),
                enabled: false,
                category: 'Third string [Open]',
                midi: {
                    pitch: [ getMidiNote('A', 2) ],
                },
                tabConfig: {
                    strings: [ 3 ],
                    frets: [ 8 ],
                },
            },
            {
                id: 'third-9-open',
                description: 'Fret 9',
                path: getSoundURL('/assets/audio/guitar/third-9-open.mp3'),
                enabled: false,
                category: 'Third string [Open]',
                midi: {
                    pitch: [ getMidiNote('A#', 2) ],
                },
                tabConfig: {
                    strings: [ 3 ],
                    frets: [ 9 ],
                },
            },
            {
                id: 'third-10-open',
                description: 'Fret 10',
                path: getSoundURL('/assets/audio/guitar/third-10-open.mp3'),
                enabled: false,
                category: 'Third string [Open]',
                midi: {
                    pitch: [ getMidiNote('B', 2) ],
                },
                tabConfig: {
                    strings: [ 3 ],
                    frets: [ 10 ],
                },
            },

            {
                id: 'third-7-bend',
                description: 'Fret 7',
                path: getSoundURL('/assets/audio/guitar/third-7-bend.mp3'),
                enabled: false,
                category: 'Third string [Bend]',
                midi: {
                    pitch: [ getMidiNote('G#', 2) ],
                },
                tabConfig: {
                    strings: [ 3 ],
                    frets: [ 7 ],
                    bend: true,
                },
            },
            {
                id: 'third-8-bend',
                description: 'Fret 8',
                path: getSoundURL('/assets/audio/guitar/third-8-bend.mp3'),
                enabled: false,
                category: 'Third string [Bend]',
                midi: {
                    pitch: [ getMidiNote('A', 2) ],
                },
                tabConfig: {
                    strings: [ 3 ],
                    frets: [ 8 ],
                    bend: true,
                },
            },

            {
                id: 'dissonance-10-shifted',
                description: 'Dissonance fret 10 - shifted',
                path: getSoundURL('/assets/audio/guitar/dissonance-10-shifted.mp3'),
                enabled: false,
                category: 'Misc',
                midi: {
                    pitch: [ getMidiNote('G#', 3), getMidiNote('G', 3) ],
                    muted: true,
                },
                tabConfig: {
                    strings: [ 1, 2 ],
                    frets: [ 10, 14 ],
                },
            },
            {
                id: 'dissonance-11-shifted',
                description: 'Dissonance fret 11 - shifted',
                path: getSoundURL('/assets/audio/guitar/dissonance-11-shifted.mp3'),
                enabled: false,
                category: 'Misc',
                midi: {
                    pitch: [ getMidiNote('G#', 3), getMidiNote('G', 3) ],
                    muted: true,
                },
                tabConfig: {
                    strings: [ 1, 2 ],
                    frets: [ 11, 14 ],
                },
            },
            {
                id: 'dissonance-13-shifted',
                description: 'Dissonance fret 13 - shifted',
                path: getSoundURL('/assets/audio/guitar/dissonance-13-shifted.mp3'),
                enabled: false,
                category: 'Misc',
                midi: {
                    pitch: [ getMidiNote('G#', 3), getMidiNote('G', 3) ],
                    muted: true,
                },
                tabConfig: {
                    strings: [ 1, 2 ],
                    frets: [ 13, 14 ],
                },
            },

            {
                id: 'scratch',
                description: 'Scratch',
                path: getSoundURL('/assets/audio/guitar/scratch.mp3'),
                enabled: false,
                category: 'Misc',
                midi: {
                    pitch: [ getMidiNote('G#', 0), getMidiNote('D#', 1), getMidiNote('G#', 1) ],
                    duration: 0.125,
                    muted: true,
                },
                tabConfig: {
                    strings: [ 4, 5, 6 ],
                    frets: [ 'x', 'x', 'x' ],
                },
            },

        ],
    },
    {
        ...defaultInstrumentProps,
        id: 'lg',
        description: 'Lead Guitar',
        volume: 0.8,
        fadeOutDuration: 0.025,
        sequences: [
            'steadyQuarters',
        ],
        sounds: [
            {
                id: 'gs3',
                description: 'G#3',
                path: getSoundURL('/assets/audio/lead-guitar/lead-gs3.mp3'),
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('G#', 2) ],
                },
            },
            {
                id: 'a4',
                description: 'A4',
                path: getSoundURL('/assets/audio/lead-guitar/lead-a4.mp3'),
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'as4',
                description: 'A#4',
                path: getSoundURL('/assets/audio/lead-guitar/lead-as4.mp3'),
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'b4',
                description: 'B4',
                path: getSoundURL('/assets/audio/lead-guitar/lead-b4.mp3'),
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'c4',
                description: 'C4',
                path: getSoundURL('/assets/audio/lead-guitar/lead-c4.mp3'),
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'cs4',
                description: 'C#4',
                path: getSoundURL('/assets/audio/lead-guitar/lead-cs4.mp3'),
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'd4',
                description: 'D4',
                path: getSoundURL('/assets/audio/lead-guitar/lead-d4.mp3'),
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'ds4',
                description: 'D#4',
                path: getSoundURL('/assets/audio/lead-guitar/lead-ds4.mp3'),
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'e4',
                description: 'E4',
                path: getSoundURL('/assets/audio/lead-guitar/lead-e4.mp3'),
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'f4',
                description: 'F4',
                path: getSoundURL('/assets/audio/lead-guitar/lead-f4.mp3'),
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'fs4',
                description: 'F#4',
                path: getSoundURL('/assets/audio/lead-guitar/lead-fs4.mp3'),
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'g4',
                description: 'G4',
                path: getSoundURL('/assets/audio/lead-guitar/lead-g4.mp3'),
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'gs4',
                description: 'G#4',
                path: getSoundURL('/assets/audio/lead-guitar/lead-gs4.mp3'),
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'a5',
                description: 'A5',
                path: getSoundURL('/assets/audio/lead-guitar/lead-a5.mp3'),
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'as5',
                description: 'A#5',
                path: getSoundURL('/assets/audio/lead-guitar/lead-as5.mp3'),
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'b5',
                description: 'B5',
                path: getSoundURL('/assets/audio/lead-guitar/lead-b5.mp3'),
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'c5',
                description: 'C5',
                path: getSoundURL('/assets/audio/lead-guitar/lead-c5.mp3'),
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'cs5',
                description: 'C#5',
                path: getSoundURL('/assets/audio/lead-guitar/lead-cs5.mp3'),
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'd5',
                description: 'D5',
                path: getSoundURL('/assets/audio/lead-guitar/lead-d5.mp3'),
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'ds5',
                description: 'D#5',
                path: getSoundURL('/assets/audio/lead-guitar/lead-ds5.mp3'),
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'e5',
                description: 'E5',
                path: getSoundURL('/assets/audio/lead-guitar/lead-e5.mp3'),
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'f5',
                description: 'F5',
                path: getSoundURL('/assets/audio/lead-guitar/lead-f5.mp3'),
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'fs5',
                description: 'F#5',
                path: getSoundURL('/assets/audio/lead-guitar/lead-fs5.mp3'),
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'g5',
                description: 'G5',
                path: getSoundURL('/assets/audio/lead-guitar/lead-g5.mp3'),
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'gs5',
                description: 'G#5',
                path: getSoundURL('/assets/audio/lead-guitar/lead-gs5.mp3'),
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'a6',
                description: 'A6',
                path: getSoundURL('/assets/audio/lead-guitar/lead-a6.mp3'),
                enabled: false,
                midi: {
                    pitch: [ getMidiNote('A', 3) ],
                },
            },
            {
                id: 'as6',
                description: 'A#6',
                path: getSoundURL('/assets/audio/lead-guitar/lead-as6.mp3'),
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
            // 'steadySixteenths'.map(b => ({ ...b, volume: .7})),
        ],
        sounds: [
            {
                id: 'k',
                description: 'Basic kick',
                path: getSoundURL('/assets/audio/mastered/kick.wav'),
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
                description: 'Basic snare',
                path: getSoundURL('/assets/audio/mastered/snare.wav'),
                enabled: false,
                midi: {
                    pitch: [ snareMidiNote ],
                },
            }
        ],
    },
    {
        ...defaultInstrumentProps,
        id: 'h',
        description: 'Hihat',
        sequences: [
            'steadyHalfs',
            'steadyQuarters',
        ],
        sounds: [
            {
                id: 'h',
                description: 'Open hihat',
                path: getSoundURL('/assets/audio/mastered/hihat-open.wav'),
                enabled: false,
                midi: {
                    pitch: [ hihatMidiNote ],
                },
            },
            {
                id: 'hc',
                description: 'Closed hihat',
                path: getSoundURL('/assets/audio/mastered/hihat-closed.wav'),
                enabled: false,
                midi: {
                    pitch: [ hihatMidiNote ],
                },
            }
        ],
    },
    {
        ...defaultInstrumentProps,
        id: 'c',
        description: 'Cymbal',
        ringout: true,
        sequences: [
            'steadyHalfs',
            'steadyQuarters',
        ],
        sounds: [
            {
                id: 'crash-left',
                description: 'Crash left',
                path: getSoundURL('/assets/audio/mastered/crash-left.wav'),
                enabled: false,
                category: 'Crash',
                midi: {
                    pitch: [ crash1MidiNote ],
                    duration: 0.125,
                },
            },
            {
                id: 'crash-right',
                description: 'Crash right',
                path: getSoundURL('/assets/audio/mastered/crash-right.wav'),
                enabled: false,
                category: 'Crash',
                midi: {
                    pitch: [ crash2MidiNote ],
                    duration: 0.125,
                },
            },
            {
                id: 'china-left',
                description: 'China left',
                path: getSoundURL('/assets/audio/mastered/china-left.wav'),
                enabled: false,
                category: 'China',
                midi: {
                    pitch: [ chinaMidiNote ],
                    duration: 0.125,
                },
            }
        ],
    },
    {
        ...defaultInstrumentProps,
        id: 'd',
        description: 'Drone',
        sequences: [
            'twoBars',
        ],
        sounds: [
            {
                id: 'drone-medium',
                description: 'Medium',
                path: getSoundURL('/assets/audio/drones/drone-medium.mp3'),
                enabled: false,
            },
            {
                id: 'drone-high',
                description: 'High',
                path: getSoundURL('/assets/audio/drones/drone-high.mp3'),
                enabled: false,
            },
            {
                id: 'drone-high-2',
                description: 'Creepy',
                path: getSoundURL('/assets/audio/drones/drone-high-2.mp3'),
                enabled: false,
            },
        ],
    },
];

export default defaultInstruments;
