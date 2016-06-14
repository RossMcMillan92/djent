import { combineReducers } from 'redux';

import config from './config';
import beats from './beats';
import instruments from './instruments';
import customPreset from './customPreset';

const rootReducer = combineReducers({
    config,
    beats,
    instruments,
    customPreset,
});

export default rootReducer;
