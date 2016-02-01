import {createReducer} from '../utils';
import jwtDecode from 'jwt-decode';
import CONSTANTS from '../constants/index';
//import { pushState } from 'redux-router';
const {LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER,PUBLIC_TOKEN} = CONSTANTS

const initialState = {
    token: null,
    userName: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

export default createReducer(initialState, {
    [LOGIN_USER_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': true,
            'statusText': null
        });
    },
    [LOGIN_USER_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': true,
            'token': payload.token,
            'userName': jwtDecode(payload.token).userName,
            'statusText': 'You have been successfully logged in.'
        });

    },
    [PUBLIC_TOKEN]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': payload.isAuthenticated,
            'token': payload.token,
            'userName': jwtDecode(payload.token).userName,
            'statusText': 'You have been successfully logged in.'
        });

    },
    [LOGIN_USER_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': false,
            'token': null,
            'userName': null,
            'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
        });
    },
    [LOGOUT_USER]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticated': false,
            'token': null,
            'userName': null,
            'statusText': 'You have been successfully logged out.'
        });
    }
});
