import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

export function createReducer(initialState,allSwitches){
    return (state = initialState,action) =>{
        const reduceSelection = allSwitches[action.type];

        return reduceSelection ? reduceSelection(state,action.payload) : state;
    }
}

export function createConstants(...constants) {
    return constants.reduce((acc, constant) => {
        acc[constant] = constant;
        return acc;
    }, {});
}


export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

export function parseJSON(response) {
    return response.json()


}

