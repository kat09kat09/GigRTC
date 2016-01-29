//React and Redux imports
var React = require('react')


//Reducer imports
import AuthReducer from '../../../src/reducers/auth';

//Testing imports
import expect from 'expect'

//Constants
import CONSTANTS from '../../../src/constants/index';
const {LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER} = CONSTANTS


describe('reducers', () => {

    describe('AuthReducer', () => {

        const initialState = {
            token: null,
            userName: null,
            isAuthenticated: false,
            isAuthenticating: false,
            statusText: null
        };

        it('should return the initial state', () => {
            expect(
                AuthReducer(undefined, {})
            ).toEqual(
                {
                    token: null,
                    userName: null,
                    isAuthenticated: false,
                    isAuthenticating: false,
                    statusText: null
                }
            )

        })

        it('should handle LOGIN_USER_REQUEST', () => {
            expect(
                AuthReducer(initialState, {
                    type: LOGIN_USER_REQUEST
                })
            ).toEqual(
                Object.assign({}, initialState, {
                    'isAuthenticating': true,
                    'statusText': null
                })
            )
        })
        it('should handle LOGIN_USER_FAILURE', () => {
            expect(
                AuthReducer(initialState, {
                    type: LOGIN_USER_FAILURE,
                    payload: {
                        status: 401,
                        statusText: "Login Unauthorized"
                    }
                })
            ).toEqual(
                Object.assign({}, initialState, {
                    'isAuthenticating': false,
                    'isAuthenticated': false,
                    'token': null,
                    'userName': null,
                    'statusText': `Authentication Error: 401 Login Unauthorized`
                })
            )
        })
        it('should handle LOGIN_USER_SUCCESS', () => {
            expect(
                AuthReducer(initialState, {
                    type: LOGIN_USER_SUCCESS,
                    payload : {
                        token : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6InRkc0B0ZHMuY29tIiwiaWF0IjoxNDU0MDY0MTQ2fQ.ArQkqa8Wgp9MTO7dPQ4aMIyfHS6eQxTBAUk4tyWOoMY'
                    }
                })
            ).toEqual(
                Object.assign({}, initialState, {
                    'isAuthenticating': false,
                    'isAuthenticated': true,
                    'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyTmFtZSI6InRkc0B0ZHMuY29tIiwiaWF0IjoxNDU0MDY0MTQ2fQ.ArQkqa8Wgp9MTO7dPQ4aMIyfHS6eQxTBAUk4tyWOoMY',
                    'userName': 'tds@tds.com',
                    'statusText': 'You have been successfully logged in.'
                })
            )
        })
        it('should handle LOGOUT_USER', () => {
            expect(
                AuthReducer(initialState, {
                    type: LOGOUT_USER
                })
            ).toEqual(
                Object.assign({}, initialState, {
                    'isAuthenticated': false,
                    'token': null,
                    'userName': null,
                    'statusText': 'You have been successfully logged out.'
                })
            )
        })

    })
})
