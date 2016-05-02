import { combineReducers } from 'redux';
import { instruments } from './instruments';
import { config } from './config';

const rootReducer = combineReducers({
  /* your reducers */
  config,
  instruments,
});

export default rootReducer;
