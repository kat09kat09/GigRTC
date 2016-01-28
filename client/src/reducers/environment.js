import {createReducer} from '../utils';
import CONSTANTS from '../constants';
const { CURRENT_ENVIRONMENT} = CONSTANTS
import jwtDecode from 'jwt-decode';

const initialState = '';

export default createReducer(initialState, {
    [CURRENT_ENVIRONMENT]: (state, payload) => {
        console.log("reaching reducer",payload)
       return payload
    }
});
