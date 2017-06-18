import { identity } from 'ramda'
import { Maybe } from 'ramda-fantasy'
import { safeGetLocalStorageIO } from 'modules/localStorageIO'

const defaultActivePresetID = 'thall-chicken'

const activePresetID = safeGetLocalStorageIO('activePresetID')
    .map(Maybe.maybe(defaultActivePresetID, identity))
    .runIO()

const initialState = {
    activePresetID,
    bpm : 50,
}

export default initialState
