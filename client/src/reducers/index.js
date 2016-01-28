import { combineReducers } from 'redux';
import auth from '../reducers/auth'
import data from '../reducers/data'

const rootReducer = combineReducers({
  auth,
  data
});

export default rootReducer;
