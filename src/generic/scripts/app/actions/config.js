export function updateBPM(bpm) {
    if (!bpm)       bpm = 100
    if (bpm < 50)   bpm = 50
    if (bpm > 300) bpm = 300

    return {
        type: 'UPDATE_BPM',
        payload: { bpm },
    }
}

export function applyPreset(preset) {
    return {
        type: 'APPLY_PRESET',
        payload: { preset },
    }
}
