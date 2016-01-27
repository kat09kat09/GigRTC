import { combineReducers } from 'redux';

import BroadcastReducer from './reducer_broadcast';

const rootReducer = combineReducers({
  state: (state = {}) => state,
  broadcasts: BroadcastReducer
});

export default rootReducer;
