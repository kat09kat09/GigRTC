import {createReducer} from '../utils';
import CONSTANTS from '../constants';
const { FETCH_ACTIVE_STREAMS,FETCH_REGISTERED_ARTISTS,FILTER_REGISTERED_ARTISTS} = CONSTANTS
import jwtDecode from 'jwt-decode';

const initialState = {
    data: {
      activeStreams: null,
      registeredArtists : null,
      filteredArtists : null
    },
    isFetching: false
};

export default createReducer(initialState, {

    [FETCH_ACTIVE_STREAMS] : (state,payload) =>{
        return Object.assign({}, state, {
            'isFetching': true,
            'data' : {
              activeStreams: payload.data
            }
        });
    },

    [FETCH_REGISTERED_ARTISTS] : (state,payload) =>{
        return Object.assign({}, state, {
            'isFetching': true,
            'data' : {
                registeredArtists : payload.data.registeredArtists
            }
        });
    }

});
