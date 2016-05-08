const initialState = [
    {
        id: 'guitar',
        sounds: [
            {
                id: 'guitar-palm-zero-1',
                path: 'assets/audio/guitar-palm-zero-1.wav',
                enabled: false,
            },
            {
                id: 'guitar-palm-zero-2',
                path: 'assets/audio/guitar-palm-zero-2.wav',
                enabled: false,
            },
            {
                id: 'guitar-open-zero-1',
                path: 'assets/audio/guitar-open-zero-1.wav',
                enabled: false,
            },
            {
                id: 'guitar-open-zero-2',
                path: 'assets/audio/guitar-open-zero-2.wav',
                enabled: false,
            },
            {
                id: 'guitar-palm-first-1',
                path: 'assets/audio/guitar-palm-first-1.wav',
                enabled: true,
            },
            {
                id: 'guitar-open-first-1',
                path: 'assets/audio/guitar-open-first-1.wav',
                enabled: false,
            },
            {
                id: 'guitar-open-first-2',
                path: 'assets/audio/guitar-open-first-2.wav',
                enabled: false,
            },
            {
                id: 'guitar-open-eighth',
                path: 'assets/audio/guitar-open-eighth.wav',
                enabled: false,
            },
            {
                id: 'guitar-open-sixth-second-1',
                path: 'assets/audio/guitar-open-sixth-second-1.wav',
                enabled: false,
            },
            {
                id: 'guitar-root-dissonance',
                path: 'assets/audio/guitar-root-dissonance.wav',
                enabled: false,
            },
            {
                id: 'guitar-dissonance-high',
                path: 'assets/audio/guitar-dissonance-high.wav',
                enabled: false,
            },
            {
                id: 'guitar-dissonance-high-2',
                path: 'assets/audio/guitar-dissonance-high-2.wav',
                enabled: false,
            }
        ],
    },
    {
        id: 'kick',
        sounds: [
            {
                id: 'kick',
                path: 'assets/audio/mastered/kick.wav',
                enabled: true,
            }
        ],
    },
    {
        id: 'snare',
        sounds: [
            {
                id: 'snare',
                path: 'assets/audio/mastered/snare.wav',
                enabled: true,
            }
        ],
    },
    {
        id: 'hihat',
        sounds: [
            {
                id: 'hihat',
                path: 'assets/audio/mastered/hihat.wav',
                enabled: true,
            }
        ],
    },
    {
        id: 'crash',
        ringout: true,
        sounds: [
            {
                id: 'crash-left',
                path: 'assets/audio/mastered/crash-left.wav',
                enabled: true,
            },
            {
                id: 'crash-right',
                path: 'assets/audio/mastered/crash-right.wav',
                enabled: true,
            },
            {
                id: 'china-left',
                path: 'assets/audio/mastered/china-left.wav',
                enabled: true,
            }
        ],
    },
    {
        id: 'drone',
        sounds: [
            {
                id: 'drone-high',
                path: 'assets/audio/drone-high.wav',
                enabled: false,
            },
            {
                id: 'drone-medium',
                path: 'assets/audio/drone-medium.wav',
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
