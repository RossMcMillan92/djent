import { extendObjectArrayByID, deepCloneObject } from '../utils/tools';

const initialState = [
    {
        id: 'g',
        description: 'Guitar/Bass (Drop G#)',
        sounds: [
            {
                id: 'sixth-0-open',
                description: 'Fret 0',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/sixth-0-open.mp3',
                enabled: false,
                category: 'Sixth string [Open]',
            },
            {
                id: 'sixth-0-muted',
                description: 'Fret 0',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/sixth-0-muted.mp3',
                enabled: false,
                category: 'Sixth string [Muted]',
            },
            {
                id: 'sixth-1-muted',
                description: 'Fret 1',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/sixth-1-muted.mp3',
                enabled: false,
                category: 'Sixth string [Muted]'
            },
            {
                id: 'sixth-1-open',
                description: 'Fret 1',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/sixth-1-open.mp3',
                enabled: false,
                category: 'Sixth string [Open]'
            },
            {
                id: 'sixth-2-muted',
                description: 'Fret 2',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/sixth-2-muted.mp3',
                enabled: false,
                category: 'Sixth string [Muted]'
            },
            {
                id: 'sixth-2-open',
                description: 'Fret 2',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/sixth-2-open.mp3',
                enabled: false,
                category: 'Sixth string [Open]'
            },
            {
                id: 'sixth-3-muted',
                description: 'Fret 3',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/sixth-3-muted.mp3',
                enabled: false,
                category: 'Sixth string [Muted]'
            },
            {
                id: 'sixth-3-open',
                description: 'Fret 3',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/sixth-3-open.mp3',
                enabled: false,
                category: 'Sixth string [Open]'
            },
            {
                id: 'sixth-4-muted',
                description: 'Fret 4',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/sixth-4-muted.mp3',
                enabled: false,
                category: 'Sixth string [Muted]'
            },
            {
                id: 'sixth-4-open',
                description: 'Fret 4',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/sixth-4-open.mp3',
                enabled: false,
                category: 'Sixth string [Open]'
            },
            {
                id: 'sixth-8-muted',
                description: 'Fret 8',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/sixth-8-muted.mp3',
                enabled: false,
                category: 'Sixth string [Muted]'
            },
            {
                id: 'sixth-8-open',
                description: 'Fret 8',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/sixth-8-open.mp3',
                enabled: false,
                category: 'Sixth string [Open]'
            },

            {
                id: 'fifth-5-open',
                description: 'Fret 5',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/fifth-5-open.mp3',
                enabled: false,
                category: 'Fifth string [Open]'
            },
            {
                id: 'fifth-6-open',
                description: 'Fret 6',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/fifth-6-open.mp3',
                enabled: false,
                category: 'Fifth string [Open]'
            },
            {
                id: 'fifth-7-open',
                description: 'Fret 7',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/fifth-7-open.mp3',
                enabled: false,
                category: 'Fifth string [Open]'
            },
            {
                id: 'fifth-8-open',
                description: 'Fret 8',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/fifth-8-open.mp3',
                enabled: false,
                category: 'Fifth string [Open]'
            },
            {
                id: 'fifth-9-open',
                description: 'Fret 9',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/fifth-9-open.mp3',
                enabled: false,
                category: 'Fifth string [Open]'
            },
            {
                id: 'fifth-10-open',
                description: 'Fret 10',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/fifth-10-open.mp3',
                enabled: false,
                category: 'Fifth string [Open]'
            },
            {
                id: 'fifth-11-open',
                description: 'Fret 11',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/fifth-11-open.mp3',
                enabled: false,
                category: 'Fifth string [Open]'
            },
            {
                id: 'fifth-12-open',
                description: 'Fret 12',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/fifth-12-open.mp3',
                enabled: false,
                category: 'Fifth string [Open]'
            },

            {
                id: 'third-7-open',
                description: 'Fret 7',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/third-7-open.mp3',
                enabled: false,
                category: 'Third string [Open]'
            },
            {
                id: 'third-8-open',
                description: 'Fret 8',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/third-8-open.mp3',
                enabled: false,
                category: 'Third string [Open]'
            },
            {
                id: 'third-9-open',
                description: 'Fret 9',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/third-9-open.mp3',
                enabled: false,
                category: 'Third string [Open]'
            },
            {
                id: 'third-10-open',
                description: 'Fret 10',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/third-10-open.mp3',
                enabled: false,
                category: 'Third string [Open]'
            },

            {
                id: 'third-7-bend',
                description: 'Fret 7',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/third-7-bend.mp3',
                enabled: false,
                category: 'Third string [Bend]'
            },
            {
                id: 'third-8-bend',
                description: 'Fret 8',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/third-8-bend.mp3',
                enabled: false,
                category: 'Third string [Bend]'
            },

            {
                id: 'dissonance-10',
                description: 'Dissonance at fret 10',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/dissonance-10.mp3',
                enabled: false,
                category: 'Misc'
            },
            {
                id: 'dissonance-16',
                description: 'Dissonance at fret 16',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/dissonance-16.mp3',
                enabled: false,
                category: 'Misc'
            },
            {
                id: 'scratch',
                description: 'Scratch',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/guitar/scratch.mp3',
                enabled: false,
                category: 'Misc'
            },

        ],
    },
    {
        id: 'k',
        description: 'Kick',
        sounds: [
            {
                id: 'k',
                description: 'Basic kick',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/mastered/kick.wav',
                enabled: false,
            }
        ],
    },
    {
        id: 's',
        description: 'Snare',
        sounds: [
            {
                id: 's',
                description: 'Basic snare',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/mastered/snare.wav',
                enabled: false,
            }
        ],
    },
    {
        id: 'h',
        description: 'Hihat',
        sounds: [
            {
                id: 'h',
                description: 'Basic hihat',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/mastered/hihat.wav',
                enabled: false,
            }
        ],
    },
    {
        id: 'c',
        description: 'Cymbal',
        ringout: true,
        sounds: [
            {
                id: 'crash-left',
                description: 'Crash left',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/mastered/crash-left.wav',
                enabled: false,
                category: 'Crash'
            },
            {
                id: 'crash-right',
                description: 'Crash right',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/mastered/crash-right.wav',
                enabled: false,
                category: 'Crash'
            },
            {
                id: 'china-left',
                description: 'China left',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/mastered/china-left.wav',
                enabled: false,
                category: 'China'
            }
        ],
    },
    {
        id: 'd',
        description: 'Drone',
        sounds: [
            {
                id: 'drone-medium',
                description: 'Medium',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/drones/drone-medium.mp3',
                enabled: false,
            },
            {
                id: 'drone-high',
                description: 'High',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/drones/drone-high.mp3',
                enabled: false,
            },
            {
                id: 'drone-high-2',
                description: 'Creepy',
                path: 'https://raw.githubusercontent.com/RossMcMillan92/djent/master/assets/audio/drones/drone-high-2.mp3',
                enabled: false,
            },
        ],
    },
];

const updateInstrumentSoundByID = ({ instruments, soundID, parentID, prop, value }) => {
    const newInstruments = instruments.map(instrument => {
        if (instrument.id !== parentID) return instrument;

        const sounds = instrument.sounds.map(sound => {
            const newSound = { ...sound };
            if (newSound.id === soundID) newSound[prop] = value;
            return newSound;
        });

        return {
            ...instrument,
            sounds
        }
    })

    return newInstruments;
}

export default function instruments(state = initialState, action) {
    const { type, payload } = action;
    let newState

    switch (type) {
        case 'UPDATE_INSTRUMENT_SOUND_PROP':
            return updateInstrumentSoundByID({ ...payload, instruments: state })

        case 'APPLY_PRESET':
            const { preset } = payload;
            const instruments = preset.settings.instruments;

            newState = initialState.map(instrument => {
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

            return newState;

        case 'UPDATE_CUSTOM_PRESET_INSTRUMENTS':
            newState = state
                .map(instrument => {
                    const i = payload.instruments
                        .find(i => i.id === instrument.id);

                    if (!i) return { ...instrument };

                    return {
                        ...instrument,
                        hitTypes: [ ...i.hitTypes ],
                        sequence: i.sequence.map(seq => deepCloneObject(seq)),
                    }
                });

            return newState;
        default:
            return state;
  }
}
