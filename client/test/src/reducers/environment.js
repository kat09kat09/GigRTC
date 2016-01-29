//React and Redux imports
var React = require('react')


//Reducer imports
import EnvironmentReducer from '../../../src/reducers/environment';

//Testing imports
import expect from 'expect'

//Constants
import CONSTANTS from '../../../src/constants/index';
const { CURRENT_ENVIRONMENT} = CONSTANTS


xdescribe('reducers', () => {

    describe('EnvironmentReducer', () => {

        const initialStateEnvironmentReducer = '';

        it('should return the initial state', () => {
            expect(
                AuthReducer(undefined, {})
            ).toEqual(
                {}
            )

        })

        it('should handle CURRENT_ENVIRONMENT', () => {
            expect(
                EnvironmentReducer(initialStateEnvironmentReducer, {
                    type: CURRENT_ENVIRONMENT,
                    payload: 'localhost'
                })
            ).toEqual(
                'localhost'
            )
        })
    })

})
