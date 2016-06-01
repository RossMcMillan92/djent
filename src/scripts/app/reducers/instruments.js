import { extendObjectArrayByID } from '../utils/tools';

const initialState = [
    {
        id: 'guitar',
        description: 'Guitar/Bass (Drop G#)',
        sounds: [
            // {
            //     id: 'sixth-0-muted',
            //     description: 'Sixth string, fret zero [muted]',
            //     path: 'assets/audio/guitar/sixth-0-muted.mp3',
            //     enabled: false,
            // },

            {
                id: 'sixth-0-open-3',
                description: 'Sixth string, fret zero [open] -3',
                path: 'assets/audio/guitar/sixth-0-open-3.mp3',
                enabled: false,
            },
            {
                id: 'sixth-0-muted-3',
                description: 'Sixth string, fret zero [muted] -3',
                path: 'assets/audio/guitar/sixth-0-muted-3.mp3',
                enabled: false,
            },
            // {
            //     id: 'sixth-1-muted',
            //     description: 'Sixth string, fret zero [muted]',
            //     path: 'assets/audio/guitar/sixth-1-muted.mp3',
            //     enabled: false,
            // },
            // {
            //     id: 'sixth-1-open',
            //     description: 'Sixth string, fret zero [open]',
            //     path: 'assets/audio/guitar/sixth-1-open.mp3',
            //     enabled: false,
            // },
            // {
            //     id: 'sixth-2-muted',
            //     description: 'Sixth string, fret zero [muted]',
            //     path: 'assets/audio/guitar/sixth-2-muted.mp3',
            //     enabled: false,
            // },
            // {
            //     id: 'sixth-2-open',
            //     description: 'Sixth string, fret zero [open]',
            //     path: 'assets/audio/guitar/sixth-2-open.mp3',
            //     enabled: false,
            // },
            // {
            //     id: 'sixth-3-muted',
            //     description: 'Sixth string, fret zero [muted]',
            //     path: 'assets/audio/guitar/sixth-3-muted.mp3',
            //     enabled: false,
            // },
            // {
            //     id: 'sixth-3-open',
            //     description: 'Sixth string, fret zero [open]',
            //     path: 'assets/audio/guitar/sixth-3-open.mp3',
            //     enabled: false,
            // },
            // {
            //     id: 'sixth-4-muted',
            //     description: 'Sixth string, fret zero [muted]',
            //     path: 'assets/audio/guitar/sixth-4-muted.mp3',
            //     enabled: false,
            // },
            // {
            //     id: 'sixth-4-open',
            //     description: 'Sixth string, fret zero [open]',
            //     path: 'assets/audio/guitar/sixth-4-open.mp3',
            //     enabled: false,
            // },

        ],
    },
    {
        id: 'kick',
        sounds: [
            {
                id: 'kick',
                path: 'assets/audio/mastered/kick.wav',
                enabled: false,
            }
        ],
    },
    {
        id: 'snare',
        sounds: [
            {
                id: 'snare',
                path: 'assets/audio/mastered/snare.wav',
                enabled: false,
            }
        ],
    },
    {
        id: 'hihat',
        sounds: [
            {
                id: 'hihat',
                path: 'assets/audio/mastered/hihat.wav',
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
                path: 'assets/audio/mastered/crash-left.wav',
                enabled: false,
            },
            {
                id: 'crash-right',
                path: 'assets/audio/mastered/crash-right.wav',
                enabled: false,
            },
            {
                id: 'china-left',
                path: 'assets/audio/mastered/china-left.wav',
                enabled: false,
            }
        ],
    },
    {
        id: 'drone',
        sounds: [
            {
                id: 'drone-high',
                path: 'assets/audio/drone-high.wav',
                enabled: true,
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

export default function instruments(state = initialState, action) {
    let { type, payload } = action;

    switch (type) {
        case 'UPDATE_INSTRUMENT_SOUND_PROP':
            return updateInstrumentSoundByID({ ...payload, instruments: state })

        case 'APPLY_PRESET':
            const { preset } = payload;
            const instruments = preset.settings.instruments;

            let newState = initialState.map(instrument => {
                const newInstrument = instruments.find(newInstrument => newInstrument.id === instrument.id);

                if (!newInstrument) return instrument;

                let sounds = instrument.sounds;
                if (newInstrument.sounds) {
                    sounds = extendObjectArrayByID(instrument.sounds, newInstrument.sounds)
                }

                return {
                    ...instrument,
                    ...newInstrument,
                    sounds
                };
            });

            return [
                ...newState
            ];

        default:
            return state;
  }
}
