import {createReducer} from '../utils';
import CONSTANTS from '../constants';

const { FETCH_ACTIVE_STREAMS,FETCH_REGISTERED_ARTISTS,FETCH_ALL_STREAMS,SUBSCRIPTION_STATUS,SUBSCRIBED_USERS, ADD_TAG} = CONSTANTS

import jwtDecode from 'jwt-decode';

const initialState = {
    activeStreams: null,
    registeredArtists : null,
    allStreams : null,
    isFetching: false,
    activeTags: []
};

export default createReducer(initialState, {

    [FETCH_ACTIVE_STREAMS] : (state,payload) =>{
        var uniqueActiveTags= payload.data.reduce(function(uniqueTags,stream){
          stream.tags.forEach(function(tag){
            if(!uniqueTags[tag.tagname]) { uniqueTags[tag.tagname]= true }
          })
          return uniqueTags;
        }, {}); 
        var activeTags= Object.keys(uniqueActiveTags);
        return Object.assign({}, state, {

              activeStreams: payload.data, 
              activeTags: activeTags

        });
    },

    [FETCH_REGISTERED_ARTISTS] : (state,payload) =>{

        return Object.assign({}, state, {
                registeredArtists : payload.data.registeredArtists
        });
    },

    [FETCH_ALL_STREAMS] : (state,payload) =>{

        return Object.assign({}, state, {
            allStreams : payload.data
        });
    },
    [ADD_TAG] : (state,payload) =>{
        if(!payload.tagname) {
            //tagname exists, don't change attributes on state
            return Object.assign({}, state); 
        } else {
           var newState= Object.assign({}, state); 
          
           newState.activeStreams= newState.activeStreams.map(function (stream){
             if(stream.id===payload.performanceId) {
                stream.tags.push({tagname: payload.tagname}); 
             }
             return stream; 
           })
           newState.activeTags.push(payload.tagname); 
           return newState; 
        }    
        
    }

});
