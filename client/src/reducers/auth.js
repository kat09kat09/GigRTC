import {createReducer} from '../utils';
import jwtDecode from 'jwt-decode';
import CONSTANTS from '../constants/index';
//import { pushState } from 'redux-router';
const {LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER,PUBLIC_TOKEN,LOGIN_ARTIST_SUCCESS,AUTH_SIGNIN_SUCCESS} = CONSTANTS


const initialState = {
    token: null,
    userPrivelege : 'guest',
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
            "userPrivelege" : 'user',
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
            "userPrivelege" : 'artist',
            'token': payload.token,
            'userDetails': payload.artist_details,
            'statusText': 'You have been successfully logged in.'
        });

    },

    [PUBLIC_TOKEN]: (state, payload) => {
        var privilege = payload.data.artist_details.genre ? 'artist' : 'user'
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': true,
            "userPrivelege" : privilege ,
            'token': payload.data.token,
            'userDetails': payload.data.artist_details,
            'userName': payload.data.artist_details.user_name,
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
