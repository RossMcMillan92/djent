import { identity } from 'ramda'
import { Maybe } from 'ramda-fantasy'
import { ACTIVE_PRESET_ID } from 'constants/localStorage'
import { safeGetLocalStorageIO } from 'modules/localStorageIO'

const defaultActivePresetID = 'thall-chicken'

const activePresetID = safeGetLocalStorageIO(ACTIVE_PRESET_ID)
    .map(Maybe.maybe(defaultActivePresetID, identity))
    .runIO()

const initialState = {
    activePresetID,
    bpm : 50,
}

export default initialState
