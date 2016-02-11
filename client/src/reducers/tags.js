import {createReducer} from '../utils';
import jwtDecode from 'jwt-decode';
import CONSTANTS from '../constants/index';
//import { pushState } from 'redux-router';
const {FETCH_TAGS} = CONSTANTS


const initialState = {
    tags : []
};

export default createReducer(initialState, {
    [FETCH_TAGS]: (state, payload) => {
        return Object.assign({}, state, {
            data : payload
        });
    }
});
