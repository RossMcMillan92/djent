import { combineReducers } from 'redux';

import config from './config';
import beats from './beats';
import instruments from './instruments';
import modal from './modal';
import sound from './sound';

const rootReducer = combineReducers({
    config,
    beats,
    instruments,
    modal,
    sound,
});

export default rootReducer;
