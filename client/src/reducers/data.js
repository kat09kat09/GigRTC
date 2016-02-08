import {createReducer} from '../utils';
import CONSTANTS from '../constants';
const { FETCH_ACTIVE_STREAMS,FETCH_REGISTERED_ARTISTS,FETCH_ALL_STREAMS,SUBSCRIPTION_STATUS,SUBSCRIBED_USERS} = CONSTANTS
import jwtDecode from 'jwt-decode';

const initialState = {
    activeStreams: null,
    registeredArtists : null,
    allStreams : null,
    isFetching: false
};

export default createReducer(initialState, {

    [FETCH_ACTIVE_STREAMS] : (state,payload) =>{
        return Object.assign({}, state, {

              activeStreams: payload.data

        });
    },

    [FETCH_REGISTERED_ARTISTS] : (state,payload) =>{

        return Object.assign({}, state, {
                registeredArtists : payload.data.registeredArtists
        });
    },

    [FETCH_ALL_STREAMS] : (state,payload) =>{

        console.log("FETCHING ALL PERFORMANCES ",payload)
        return Object.assign({}, state, {
            allStreams : payload.data
        });
    }

});
