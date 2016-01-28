import { combineReducers } from 'redux';
import auth from '../reducers/auth'
import data from '../reducers/data'
import environment from '../reducers/environment'

import {reducer as formReducer} from 'redux-form';

import BroadcastReducer from './reducer_broadcast';

const rootReducer = combineReducers({
  auth,
  data,
  broadcasts: BroadcastReducer,
  environment,
  form : formReducer


});

export default rootReducer;
