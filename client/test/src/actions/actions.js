//Import actions
import * as ACTIONS from "../../../src/actions"

//Module to create mock store
import configureStore from 'redux-mock-store';

//Middleware module
import reduxThunk from 'redux-thunk';

//Add middleware
const middleWares = [reduxThunk];

//create mockstore
const mockStore = configureStore(middleWares);

//Import AJAX request module
import nock from 'nock';


xdescribe('actions', () => {

    describe('ActionDispatchers', () => {
        it('should dispatch action', (done) => {
            const getState = {}; // initial state of the store
            const action = { };
            const expectedActions = [action];

            const store = mockStore(getState, expectedActions, done);
            store.dispatch(action);
        })

    })
})


