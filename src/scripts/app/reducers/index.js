import { combineReducers } from 'redux';
import { instruments } from './instruments';
import { beats } from './beats';
import { config } from './config';

const rootReducer = combineReducers({
  /* your reducers */
  beats,
  config,
  instruments,
});

export default rootReducer;
