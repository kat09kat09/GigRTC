import { combineReducers } from 'redux';
import auth from '../reducers/auth'
import data from '../reducers/data'
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  auth,
  data,
  form : formReducer

});

export default rootReducer;
