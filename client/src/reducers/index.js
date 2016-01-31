import { combineReducers } from 'redux';
import auth from '../reducers/auth'
import data from '../reducers/data'
import environment from '../reducers/environment'
import messages from './messages';
import activeChannel from './activeChannel';

import {reducer as formReducer} from 'redux-form';

import BroadcastReducer from './reducer_broadcast';

const rootReducer = combineReducers({
  auth,
  data,
  broadcasts: BroadcastReducer,
  environment,
  form : formReducer,

  messages,
  // channels,
  activeChannel
  // auth,
  // typers,
  // welcomePage,
  // userValidation,
  // environment

});

export default rootReducer;
