var React = require('react')
import expect from 'expect'
import {Header} from  '../../../src/components/header'
import LoginView from  '../../../src/components/login'
var  TestUtils = require('react-addons-test-utils');
import AppBar from 'material-ui/lib/app-bar';

function setup() {
    let props = {
        isAuthenticated: false
    }

    let renderer = TestUtils.createRenderer()
    renderer.render(<Header {...props} />)
    let output = renderer.getRenderOutput()
    console.log("HEADER",output.props.children[1].props.children)
    return {
        props,
        output,
        renderer
    }
}

describe('components', () => {
    const { output } = setup();
    describe('Header', () => {
        var elements = output.props.children
        it('should render an appBar', () => {
            expect(elements[0].type).toBe(AppBar);
        })
        it('should contain a Login Component', () => {
            expect(elements[1].props.children.type).toBe(LoginView)
        })

    })
})
