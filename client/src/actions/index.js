import { checkHttpStatus, parseJSON } from '../utils';
import CONSTANTS from '../constants/index';
import axios from 'axios';
const {LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER, FETCH_PROTECTED_DATA_REQUEST, RECEIVE_PROTECTED_DATA, SAVE_BROADCAST,CURRENT_ENVIRONMENT} = CONSTANTS
import jwtDecode from 'jwt-decode';
import {browserHistory} from 'react-router';

export function loginUserSuccess(token){
    localStorage.setItem('token',token);

    return{
        type : LOGIN_USER_SUCCESS,
        payload : {
            token
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
        console.log('login',`${environment}/auth/getToken/`)
        return fetch(`/auth/getToken/`, config)
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    let decoded = jwtDecode(response.token);
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
                dispatch(receiveProtectedData(response.data));
                console.log(response.data)
            })
            .catch(error => {
                if(error.response.status === 401) {
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
       return fetch('https://localhost:1338/auth/getToken/', config)
            .then(response=> {
                dispatch(environmentLocation('https://localhost:1338'))
            }).catch((error)=> {
            dispatch(environmentLocation('https://tranquil-dusk-46949.herokuapp.com'))

        })
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
