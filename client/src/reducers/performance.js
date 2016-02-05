import {createReducer} from '../utils';
import jwtDecode from 'jwt-decode';
import CONSTANTS from '../constants/index';
//import { pushState } from 'redux-router';
const {VIEW_COUNT_UPDATE} = CONSTANTS


const initialState = {
    view_count : 0
};

export default createReducer(initialState, {
    [VIEW_COUNT_UPDATE]: (state, payload) => {
        console.log("CREATE REDUCER FOR PERFORMANCE",payload)
        return Object.assign({}, state, {
            view_count : payload.views
        });
    }
});
