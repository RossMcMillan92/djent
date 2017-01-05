import { combineReducers } from 'redux'

import config from './config'
import sequences from './sequences'
import instruments from './instruments'
import modal from './modal'
import sound from './sound'

const rootReducer = combineReducers({
    config,
    sequences,
    instruments,
    modal,
    sound,
})

export default rootReducer
