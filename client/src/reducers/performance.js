import {createReducer} from '../utils';
import jwtDecode from 'jwt-decode';
import CONSTANTS from '../constants/index';
const {
  VIEW_COUNT_UPDATE,
  PERFORMANCE_DETAIL_UPDATE,
  PERFORMANCE_DETAIL_SUCCESS,
  PERFORMANCE_DETAIL_FAILURE
  } = CONSTANTS;

const initialState = {
    view_count : 0,
    performance_info: null,
    savingData: false
};

export default createReducer(initialState, {
    [VIEW_COUNT_UPDATE]: (state, payload) => {
        return Object.assign({}, state, {
            view_count : payload.views
        });
    },

    [PERFORMANCE_DETAIL_UPDATE]: (state) => {
        return Object.assign({}, state, {
            'savingData': true // this action would be used if we wanted to show something like a "saving your data" gif
        });
    },

    [PERFORMANCE_DETAIL_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            performance_info : payload,
            'savingData': false
        });
    },

    [PERFORMANCE_DETAIL_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            performance_info : payload,
            'savingData': false
        });
    }
});
