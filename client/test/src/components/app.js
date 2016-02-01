//React and Redux imports
var React = require('react')
//import { Provider } from 'react-redux';
//import { createStore,applyMiddleware } from 'redux'
//import thunkMiddleware from 'redux-thunk'

//Component&Container imports
import {App} from  '../../../src/components/app'
import SideBar from '../../../src/components/sidebar'
import HeaderConnect,{Header} from '../../../src/components/header'
import VideoContainer from '../../../src/containers/video-container';

//Testing imports
import expect from 'expect'
var  TestUtils = require('react-addons-test-utils');

//// Reducer imports
//import reducers from '../../../src/reducers'
//
//// Create store
//const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);


//
//function setup() {
//    let props = {
//        addTodo: expect.createSpy(),
//        determineEnvironment : function(){
//            return "currently in dev"
//        },
//        children : VideoContainer
//    };
//
//    // Create Component
//    const component  = (<App {...props} />)
//
//    let renderer = TestUtils.createRenderer()
//    renderer.render(component)
//    let output = renderer.getRenderOutput()
//    //console.log("app",output.props.children[2]);
//    return {
//        props,
//        output,
//        renderer
//    }
//}
//
//(function () {
//    var localStorage = {};
//    localStorage.setItem = function (key, val) {
//        this[key] = val + '';
//    }
//    localStorage.getItem = function (key) {
//        return this[key];
//    }
//    Object.defineProperty(localStorage, 'length', {
//        get: function () { return Object.keys(this).length - 2; }
//    });
//
//    // Your tests here
//
//})();

//xdescribe('components', () => {
//    const { output } = setup();
//    describe('MainApp', () => {
//
//        it('should render correctly, clarify by className', () => {
//            expect(output.props.className).toBe('appComponentBody');
//        })
//        it('should contain a functional, "dumb" SideBar ', () => {
//           var func= (output.props.children[1].type)
//            expect( func).toBe(SideBar)
//        })
//        it('should contain a Header wrapped in redux connection ', () => {
//            expect(output.props.children[0].type).toBe(HeaderConnect)
//        })
//        it('should contain a props.children container with VideoContainer  ', () => {
//            expect(output.props.children[2].props.children).toBe(VideoContainer)
//        })
//
//    })
//});
