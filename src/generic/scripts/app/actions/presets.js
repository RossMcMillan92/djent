import { assoc, compose } from 'ramda'
import { Maybe, Future as Task } from 'ramda-fantasy'
import { PRESETS } from 'constants/localStorage'
import { safeGetLocalStorageIO, setLocalStorageIO } from 'modules/localStorageIO'
import { updatePresets } from 'utils/presets'

//    storePresetsInLS :: [preset] -> IO [preset]
const storePresetsInLS = compose(
    setLocalStorageIO(PRESETS),
    JSON.stringify
)

//    storePresetInLS :: preset -> IO [preset]
const storePresetInLS = (preset) => {
    const presetsFromLS = safeGetLocalStorageIO(PRESETS)
        .map(Maybe.maybe([], JSON.parse))
        .runIO()
    const newPresetsToStore = updatePresets(presetsFromLS, preset)
    return storePresetsInLS(newPresetsToStore)
}

//    preparePresetForStore :: preset -> preset
const preparePresetForStore = compose(
    p => assoc('load', Task.of({ default: p }), p),
    assoc('group', 'Custom'),
)

export function addPreset(preset) {
    storePresetInLS(preset).runIO()
    const newPreset = preparePresetForStore(preset)

    return {
        type: 'ADD_PRESET',
        payload: newPreset,
    }
}
