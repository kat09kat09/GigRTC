//React and Redux imports
var React = require('react')

//Component&Container imports
import {LoginView} from  '../../../src/components/forms/login'


//Testing imports
import expect from 'expect'
var  TestUtils = require('react-addons-test-utils');



function setup() {
    let props = {
        addTodo: expect.createSpy(),
        mochaTest : true,
        fields : {
            userName : 'Mr Corn',
            password : 'Is a fruit'
        },
        handleSubmit(){
            return "return login submit"
        }
    };

    // Create Component
    const component  = (<LoginView {...props} />)

    let renderer = TestUtils.createRenderer()
    renderer.render(component)
    let output = renderer.getRenderOutput()
    //console.log("output",output.props);
    return {
        props,
        output,
        renderer
    }
}

describe('components', () => {
    const { output } = setup();
    describe('LoginView', () => {

        it('should render correctly, clarify by className', () => {
            expect(output.props.className).toBe('loginForm');
        })
        it('should contain a form ', () => {
           var form= (output.props.children.type)
            expect( form).toBe("form")
        })

    })
});
