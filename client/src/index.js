import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, hashHistory,browserHistory } from 'react-router';
import Routes from './routes';
import ReduxPromise from 'redux-promise';
import thunkMiddleware from 'redux-thunk'
import ReduxLogger from 'redux-logger'

const logger = ReduxLogger()

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware,ReduxPromise,logger)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={ browserHistory } routes={ Routes } />
  </Provider>
  , document.querySelector('.container'));
