var React = require('react')
import expect from 'expect'
import {Header} from  '../../../src/components/header'
import {LoginView} from  '../../../src/components/login'
var  TestUtils = require('react-addons-test-utils');

function setup() {
    let props = {
        addTodo: expect.createSpy()
    }

    let renderer = TestUtils.createRenderer()
    renderer.render(<Header {...props} />)
    let output = renderer.getRenderOutput()
    //console.log(output.props.children.props.children[2])
    return {
        props,
        output,
        renderer
    }
}

describe('components', () => {
    const { output } = setup();
    describe('Header', () => {

        it('should render correctly', () => {
            expect(output.props.className).toBe('header');
        })
        it('should contain a React Router Link', () => {
            expect(output.props.children.props.children[2].type.displayName).toBe('Link')
        })
        it('Link should point to the right location', () => {
            expect(output.props.children.props.children[2].props.to).toBe('/streamYourself')
        })

    })
})
