export function updateInstrumentSound({ soundID, parentID, prop, value }) {
  return {
    type: 'UPDATE_INSTRUMENT_SOUND_PROP',
    payload: { soundID, parentID, prop, value },
  };
}

export function updateInstrumentDetune({ instrumentID, value }) {
  return {
    type: 'UPDATE_INSTRUMENT_DETUNE_PROP',
    payload: { instrumentID, value },
  };
}

export function updateCustomPresetInstruments(instruments) {
    return {
        type: 'UPDATE_CUSTOM_PRESET_INSTRUMENTS',
        payload: { instruments },
    };
}
