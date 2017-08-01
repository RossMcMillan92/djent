import { Either } from 'ramda-fantasy'
import { ACTIVE_PRESET_ID } from 'constants/localStorage'
import { setLocalStorageIO } from 'modules/localStorageIO'

export function updateBPM(bpm) {
    if (!bpm)       bpm = 100
    if (bpm < 50)   bpm = 50
    if (bpm > 300) bpm = 300

    return {
        type: 'UPDATE_BPM',
        payload: { bpm },
    }
}

//    getPresetId :: preset -> Either String IO String
const getPresetId = preset => preset.id === 'custom'
    ? Either.Left('custom')
    : Either.Right(preset.id)

export function applyPreset(preset) {
    getPresetId(preset)
        .map(setLocalStorageIO(ACTIVE_PRESET_ID))
        .map(p => p.runIO())

    return {
        type: 'APPLY_PRESET',
        payload: { preset },
    }
}
