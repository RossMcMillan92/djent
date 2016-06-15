export function updateCustomPresetInstruments(instruments) {
    console.log('INSTRUMENTS', instruments)
    return {
        type: 'UPDATE_CUSTOM_PRESET_INSTRUMENTS',
        payload: { instruments },
    };
}
