//React and Redux imports
var React = require('react')

//Component&Container imports
import StreamButtons from  '../../../src/components/streamButtons'


//Testing imports
import expect from 'expect'
var  TestUtils = require('react-addons-test-utils');



function setup() {
    let props = {

    };

    // Create Component
    const component  = (<StreamButtons />)

    let renderer = TestUtils.createRenderer()
    renderer.render(component)
    let output = renderer.getRenderOutput()
    //console.log("output",output.props.children[0]);
    return {
        props,
        output,
        renderer
    }
}

xdescribe('components', () => {
    const { output } = setup();
    describe('streamButtons', () => {

        it('should render 3 buttons', () => {
            expect(output.props.children.length).toBe(3);
            expect(output.props.className).toBe('streamButtons');
        })
        it('should contain a startBroadcast button ', () => {
           var button= (output.props.children[0])
            expect( button.type).toBe("button")
            expect( button.props.className.indexOf('startBroadcast')).toBeGreaterThan(-1)
        })
        it('should contain a joinBroadcast button ', () => {
            var button= (output.props.children[1])
            expect( button.type).toBe("button")
            expect( button.props.className.indexOf('joinBroadcast')).toBeGreaterThan(-1)
        })
        it('should contain a endBroadcast button ', () => {
            var button= (output.props.children[2])
            expect( button.type).toBe("button")
            expect( button.props.className.indexOf('endBroadcast')).toBeGreaterThan(-1)
        })

    })
});
