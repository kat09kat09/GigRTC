import { checkHttpStatus, parseJSON } from '../utils';
import CONSTANTS from '../constants/index';
import axios from 'axios';
const {
    LOGIN_USER_REQUEST,
    LOGIN_USER_FAILURE,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    FETCH_PROTECTED_DATA_REQUEST,
    RECEIVE_PROTECTED_DATA,
    SAVE_BROADCAST,
    CURRENT_ENVIRONMENT,
    PUBLIC_TOKEN,
    FETCH_ACTIVE_STREAMS
    } = CONSTANTS;

import jwtDecode from 'jwt-decode';
import {browserHistory,hashHistory} from 'react-router';
import io from 'socket.io-client';


export function loginUserSuccess(userObj){
    console.log("LOGIN USER SUCCESS",userObj)
    localStorage.setItem('token',userObj.token);

    return{
        type : LOGIN_USER_SUCCESS,
        payload : userObj
    }
}

export function refreshLoginState(){
    const localToken = localStorage.getItem('token')
    return {
        type : PUBLIC_TOKEN,
        payload : {
            token : localToken,
            isAuthenticated : !!localToken
        }
    }
}

export function loginUserFailure(error) {
    localStorage.removeItem('token');
    return {
        type: LOGIN_USER_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    }
}

export function loginUserRequest() {
    return {
        type: LOGIN_USER_REQUEST
    }
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER
    }
}

export function logoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(logout());
        browserHistory.push('/');
    }
}

export function environmentLocation(data) {

        return {
            type : CURRENT_ENVIRONMENT,
            payload : data
        }
}


export function loginUser(creds,environment){
    let config = {
        method: 'post',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    }

    return (dispatch) =>{
        //return fetch(location.host + '/auth/getToken/', config) -> initial approach
        dispatch(loginUserRequest());
        //console.log('login',`${environment}/auth/getToken/`)
        return fetch(`/auth/getToken/`, config)
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                console.log("login respinse",response)

                try {
                    let decoded = jwtDecode(response.token);
                    console.log('successful login', response.token); 
                    connect_socket(response.token); 
                    dispatch(loginUserSuccess(response.token));
                    browserHistory.push('/')
                } catch (e) {
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error));
            })
    }

}export function receiveProtectedData(data) {
    return {
        type: RECEIVE_PROTECTED_DATA,
        payload: {
            data: data
        }
    }
}

export function fetchProtectedDataRequest() {
    return {
        type: FETCH_PROTECTED_DATA_REQUEST
    }
}

export function fetchProtectedData(token,environment) {
    return (dispatch) => {
        dispatch(fetchProtectedDataRequest());
        return fetch(`${environment}/getData/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                console.log('response data after login', response.data);
                dispatch(receiveProtectedData(response.data));
                
            })
            .catch(error => {
                if(error.response.status === 401) {
                    console.log('there was an error with logging in'); 
                    dispatch(loginUserFailure(error));
                    browserHistory.push('/');
                }
            })
    }
}

//establish Environment
export function determineEnvironment(){
    let config = {
        method: 'post',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    return (dispatch,state) => {
       return fetch('/auth/getToken/', config)
            .then(response=> {
                dispatch(environmentLocation('https://localhost:1338'))
            }).catch((error)=> {
            dispatch(environmentLocation('https://tranquil-dusk-46949.herokuapp.com'))

        })
    }
}


// export function getSocialDetails(){


export function getSocialToken(){


    return (dispatch) =>{
        //return fetch(location.host + '/auth/getToken/', config) -> initial approach
        //console.log('login',`${environment}/auth/getToken/`)
        return  fetch(`/auth/validateSocialToken`)
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    //let decoded = jwtDecode(response.token);
                    dispatch(loginUserSuccess({token : response.token, user_details:response.user_details._json}));
                    browserHistory.push('/')
                } catch (e) {
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }));
                }
            })
            .catch(error => {

                dispatch(loginUserFailure(error));
            })
    }

function connect_socket(token){
  console.log('connect socket fxn is called'); 
  console.log('io exists', io)
  console.log('token', token); 
  // var socket= io(); 
  // var socket= io.connect('https://localhost:1338', { path: '/api/chat' }); 
  // var socket = io('https://localhost:1338', { path: '/api/chat' });
  var socket = io.connect('https://localhost:1338'); 
  console.log('socket on outer layer', socket)
  // socket.on('connect', function () {
  //   console.log('connect event')
  //   console.log('socket', socket); 
    socket.on('authenticated', function () {
        //do things
        console.log('socket has been authenticated')
    })
    .emit('authenticate', {token: token})
  // })
  return socket; 

}

export function getActivePerformances(){

    var data = axios.get('/api/activeStreams')

    return {
        type : FETCH_ACTIVE_STREAMS,
        payload : data
    }

}

//placeholder for post to /api/saveBroadcast endpoint
export function saveBroadcast(broadcastData) {
  axios.post('api/saveBroadcast', broadcastData);

  return {
    type: SAVE_BROADCAST,
    payload: broadcastData
  }
}
