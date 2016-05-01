import { combineReducers } from 'redux';
import { items } from './items';
import { config } from './config';

const rootReducer = combineReducers({
  /* your reducers */
  items,
  config,
});

export default rootReducer;
