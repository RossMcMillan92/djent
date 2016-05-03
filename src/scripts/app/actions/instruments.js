export function updateInstrumentSound({ soundID, parentID, prop, value }) {
  return {
    type: 'UPDATE_INSTRUMENT_SOUND_PROP',
    payload: { soundID, parentID, prop, value },
  };
}
