import { extendObjectArrayByID } from '../utils/tools';

const initialState = [
    {
        id: 'guitar',
        description: 'Guitar/Bass (Drop G#)',
        sounds: [
            {
                id: 'guitar-palm-zero-1',
                description: 'Sixth string, fret zero [Palm muted] - 1',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar-palm-zero-1.wav',
                enabled: false,
            },
            {
                id: 'guitar-palm-zero-2',
                description: 'Sixth string, fret zero [Palm muted] - 2',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar-palm-zero-2.wav',
                enabled: false,
            },
            {
                id: 'guitar-open-zero-1',
                description: 'Sixth string, fret zero [Open note] - 1',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar-open-zero-1.wav',
                enabled: false,
            },
            {
                id: 'guitar-open-zero-2',
                description: 'Sixth string, fret zero [Open note] - 2',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar-open-zero-2.wav',
                enabled: false,
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
                enabled: false,
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
                enabled: false,
            },
            {
                id: 'guitar-root-dissonance',
                description: 'Third string, fret seven [Dissonant bend]',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar-root-dissonance.wav',
                enabled: false,
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
                enabled: false,
            }
        ],
    },
    {
        id: 'snare',
        sounds: [
            {
                id: 'snare',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/mastered/snare.wav',
                enabled: false,
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
                enabled: false,
            },
            {
                id: 'crash-right',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/mastered/crash-right.wav',
                enabled: false,
            },
            {
                id: 'china-left',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/mastered/china-left.wav',
                enabled: false,
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

                if (newInstrument.sounds) {
                    newInstrument.sounds = extendObjectArrayByID(instrument.sounds, newInstrument.sounds)
                }

                return newInstrument;
            });

            return [
                ...newState
            ];
            
        default:
            return state;
  }
}
