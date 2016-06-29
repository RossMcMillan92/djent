import { extendObjectArrayByID, deepClone } from '../utils/tools';
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
                        sequence: deepClone(i.sequence),
                    }
                });

            return newState;
        default:
            return state;
  }
}
