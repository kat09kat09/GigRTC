import {createReducer} from '../utils';
import jwtDecode from 'jwt-decode';
import CONSTANTS from '../constants/index';
//import { pushState } from 'redux-router';
const {LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER,PUBLIC_TOKEN,LOGIN_ARTIST_SUCCESS,AUTH_SIGNIN_SUCCESS} = CONSTANTS


const initialState = {
    token: null,
    userPrivilege : 'guest',
    userDetails: {},
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
            "userPrivilege" : 'user',
            'token': payload.token,
            'userDetails': payload.user_details,
            'userName': jwtDecode(payload.token).userName,
            'statusText': 'You have been successfully logged in.'
        });

    },
    [LOGIN_ARTIST_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': true,
            "userPrivilege" : 'artist',
            'token': payload.token,
            'userDetails': payload.artist_details,
            'statusText': 'You have been successfully logged in.'
        });

    },

    [PUBLIC_TOKEN]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': payload.isAuthenticated,
            'token': payload.token,
            'userDetails': jwtDecode(payload.token).userName,
            'userName': jwtDecode(payload.token).userName,
            'statusText': 'You have been successfully logged in.'
        });

    },

    [LOGIN_USER_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': false,
            'token': null,
            'userDetails': null,
            'userName': null,
            'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
        });
    },
    [LOGOUT_USER]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticated': false,
            'token': null,
            'userDetails': null,
            'userName': null,
            'statusText': 'You have been successfully logged out.'
        });
    }

});
