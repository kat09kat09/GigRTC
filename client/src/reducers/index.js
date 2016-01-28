import { combineReducers } from 'redux';

import BroadcastReducer from './reducer_broadcast';

const rootReducer = combineReducers({
  state: (state = {}) => state,
  // broadcasts: BroadcastReducer
  form: BroadcastReducer
});

export default rootReducer;
