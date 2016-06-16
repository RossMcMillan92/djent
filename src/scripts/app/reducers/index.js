import { combineReducers } from 'redux';

import config from './config';
import beats from './beats';
import instruments from './instruments';
import modal from './modal';

const rootReducer = combineReducers({
    config,
    beats,
    instruments,
    modal,
});

export default rootReducer;
