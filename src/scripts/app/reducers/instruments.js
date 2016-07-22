import { extendObjectArrayByID, deepClone, updateObjByID } from '../utils/tools';
import defaultInstruments from '../utils/default-instruments';

const initialState = defaultInstruments;

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

        case 'UPDATE_INSTRUMENT_DETUNE_PROP':
            return updateObjByID({ objs: state, id: payload.instrumentID, prop: 'pitch', value: payload.value })

        case 'UPDATE_INSTRUMENT_SEQUENCES':
            return state
                .map(i => i.id === payload.instrumentID ? { ...i, sequences: payload.sequences } : i);

        case 'APPLY_PRESET':
            const { preset } = payload;
            const instruments = preset.settings.instruments;

            newState = initialState.map(instrument => {
                const newInstrument = instruments.find(newInstrument => newInstrument.id === instrument.id);

                if (!newInstrument) return instrument;

                let sounds = instrument.sounds;
                if (newInstrument.sounds) {
                    sounds = extendObjectArrayByID(instrument.sounds, newInstrument.sounds);
                }

                let sequences = instrument.sequences;
                if (newInstrument.sequences) {
                    sequences = [ ...newInstrument.sequences ];
                }

                return {
                    ...instrument,
                    ...newInstrument,
                    sounds,
                    sequences
                };
            });

            return newState;

        case 'UPDATE_CUSTOM_PRESET_INSTRUMENTS':
            newState = state
                .map(instrument => {
                    const i = payload.instruments
                        .find(i => i.id === instrument.id);

                    return {
                        ...instrument,
                        hitTypes: i ? [ ...i.hitTypes ] : [],
                        sequence: i ? deepClone(i.sequence) : [],
                    }
                });

            return newState;
        default:
            return state;
  }
}
