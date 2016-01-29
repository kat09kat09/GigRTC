//React and Redux imports
var React = require('react')


//Reducer imports
import DataReducer from '../../../src/reducers/data';

//Testing imports
import expect from 'expect'

//Constants
import CONSTANTS from '../../../src/constants/index';
const { FETCH_PROTECTED_DATA_REQUEST, RECEIVE_PROTECTED_DATA} = CONSTANTS


describe('reducers', () => {

    describe('DataReducer', () => {

        const initialStateDataReducer = {
            data: null,
            isFetching: false
        };

        it('should return the initial state', () => {
            expect(
                DataReducer(undefined, {})
            ).toEqual(
                {
                    data: null,
                    isFetching: false
                }
            )

        })

        it('should handle FETCH_PROTECTED_DATA_REQUEST', () => {
            expect(
                DataReducer(initialStateDataReducer, {
                    type: FETCH_PROTECTED_DATA_REQUEST
                })
            ).toEqual(
                ({ ...initialStateDataReducer,
                    'isFetching': true
                })
            )
        })
        it('should handle RECEIVE_PROTECTED_DATA', () => {
            expect(
                DataReducer(initialStateDataReducer, {
                    type: RECEIVE_PROTECTED_DATA,
                    payload: {
                        data: 'Valid JWT found! This protected data was fetched from the server.'
                    }
                })
            ).toEqual(
                ({...initialStateDataReducer,
                    'data': 'Valid JWT found! This protected data was fetched from the server.',
                    'isFetching': false
                })
            )
        })


    })
})
