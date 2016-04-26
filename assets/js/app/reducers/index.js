import { combineReducers } from 'redux';
import { items } from './items';

const rootReducer = combineReducers({
  /* your reducers */
  items,
});

export default rootReducer;
