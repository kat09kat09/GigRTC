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

    return {
        props,
        output,
        renderer
    }
}

describe('components', () => {
    describe('Header', () => {
        it('should render correctly', () => {
            const { output } = setup()

            //expect(output.type).toBe('Navbar')
            expect(output.props.className).toBe('header')

            //let [ h1, input ] = output.props.children
            //
            //expect(h1.type).toBe('h1')
            //expect(h1.props.children).toBe('todos')
            //
            //expect(input.type).toBe(TodoTextInput)
            //expect(input.props.newTodo).toBe(true)
            //expect(input.props.placeholder).toBe('What needs to be done?')
        })

    })
})
