const initialState = [
    {
        id: 'guitar',
        description: 'Guitar/Bass (Drop G#)',
        sounds: [
            {
                id: 'guitar-palm-zero-1',
                description: 'Sixth string, fret zero [Palm muted] - 1',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar-palm-zero-1.wav',
                enabled: true,
            },
            {
                id: 'guitar-palm-zero-2',
                description: 'Sixth string, fret zero [Palm muted] - 2',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar-palm-zero-2.wav',
                enabled: true,
            },
            {
                id: 'guitar-open-zero-1',
                description: 'Sixth string, fret zero [Open note] - 1',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar-open-zero-1.wav',
                enabled: true,
            },
            {
                id: 'guitar-open-zero-2',
                description: 'Sixth string, fret zero [Open note] - 2',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar-open-zero-2.wav',
                enabled: true,
            },
            {
                id: 'guitar-palm-first-1',
                description: 'Sixth string, fret one [Palm muted]',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar-palm-first-1.wav',
                enabled: false,
            },
            {
                id: 'guitar-open-first-1',
                description: 'Sixth string, fret one [Open note] - 1',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar-open-first-1.wav',
                enabled: true,
            },
            {
                id: 'guitar-open-first-2',
                description: 'Sixth string, fret one [Open note] \t - 2',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar-open-first-2.wav',
                enabled: false,
            },
            {
                id: 'guitar-open-eighth',
                description: 'Sixth string, fret eigh [Open]',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar-open-eighth.wav',
                enabled: false,
            },
            {
                id: 'guitar-open-sixth-second-1',
                description: 'Fifth string, fret six [Open note]',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar-open-sixth-second-1.wav',
                enabled: true,
            },
            {
                id: 'guitar-root-dissonance',
                description: 'Third string, fret seven [Dissonant bend]',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar-root-dissonance.wav',
                enabled: true,
            },
            {
                id: 'guitar-dissonance-high',
                description: 'First string, fret ten [Dissonant chord]',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar-dissonance-high.wav',
                enabled: false,
            },
            {
                id: 'guitar-dissonance-high-2',
                description: 'First string, fret eleven [Dissonant chord]',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar-dissonance-high-2.wav',
                enabled: false,
            }
        ],
    },
    {
        id: 'kick',
        sounds: [
            {
                id: 'kick',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/mastered/kick.wav',
                enabled: true,
            }
        ],
    },
    {
        id: 'snare',
        sounds: [
            {
                id: 'snare',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/mastered/snare.wav',
                enabled: true,
            }
        ],
    },
    {
        id: 'hihat',
        sounds: [
            {
                id: 'hihat',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/mastered/hihat.wav',
                enabled: false,
            }
        ],
    },
    {
        id: 'crash',
        ringout: true,
        sounds: [
            {
                id: 'crash-left',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/mastered/crash-left.wav',
                enabled: true,
            },
            {
                id: 'crash-right',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/mastered/crash-right.wav',
                enabled: true,
            },
            {
                id: 'china-left',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/mastered/china-left.wav',
                enabled: true,
            }
        ],
    },
    {
        id: 'drone',
        sounds: [
            {
                id: 'drone-high',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/drone-high.wav',
                enabled: true,
            },
            {
                id: 'drone-medium',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/drone-medium.wav',
                enabled: false,
            }
        ],
    },
];

const updateInstrumentSoundByID = ({ instruments, soundID, parentID, prop, value }) => {
    const newInstruments = instruments.map(instrument => {
        if (instrument.id !== parentID) return instrument;

        const sounds = instrument.sounds.map(sound => {
            if (sound.id === soundID) sound[prop] = value;
            return sound;
        });

        return {
            ...instrument,
            sounds
        }
    })

    return newInstruments;
}

export function instruments(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case 'UPDATE_INSTRUMENT_SOUND_PROP':
            return updateInstrumentSoundByID({ ...payload, instruments: state })

        default:
            return state;
  }
}
