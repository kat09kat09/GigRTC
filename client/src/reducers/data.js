import {createReducer} from '../utils';
import CONSTANTS from '../constants';
const { FETCH_ACTIVE_STREAMS,FETCH_REGISTERED_ARTISTS} = CONSTANTS
import jwtDecode from 'jwt-decode';

const initialState = {
    activeStreams: null,
    registeredArtists : null,
    isFetching: false
};

export default createReducer(initialState, {

    [FETCH_ACTIVE_STREAMS] : (state,payload) =>{
        return Object.assign({}, state, {

              activeStreams: payload.data

        });
    },

    [FETCH_REGISTERED_ARTISTS] : (state,payload) =>{

        console.log("FETCHING REGISTED ARTISTS STATE should contain active streams",state)
        return Object.assign({}, state, {
                registeredArtists : payload.data.registeredArtists
        });
    }

});
