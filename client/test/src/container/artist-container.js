//React and Redux imports
var React = require('react')


//Component&Container imports
import VideoContainer from '../../../src/containers/video-container';
import StreamButtons from '../../../src/components/streamButtons';
import {ArtistContainer} from '../../../src/containers/artist-container';

//Testing imports
import expect from 'expect'
var  TestUtils = require('react-addons-test-utils');



function setup() {
     function saveBroadcast(data){
        return new Promise(function(resolve,reject){
            resolve('brodcast successful' + data)
        })
    }

    let props = {
        addTodo: expect.createSpy(),
        saveBroadcast : saveBroadcast,
        handleSubmit(){
            return "return login submit"
        },
        fields : {
            title : 'Mr Apple',
            details : 'Bottom Jeans'
        }

    };

    let renderer = TestUtils.createRenderer()
    renderer.render(<ArtistContainer {...props} />)
    let output = renderer.getRenderOutput()
    //console.log("ARTIST",output.props.children)
    return {
        props,
        output,
        renderer
    }
}

describe('components', () => {
    const { output } = setup();
    describe('ArtistContainer', () => {

        it('should render correctly, clarify by className', () => {
            expect(output.props.className).toBe('streamYourself');
        })
        it('should contain a 2 children elements ', () => {
            var form= (output.props.children)
            expect( form.length).toBe(2)
        })
        it('should contain a  form element ', () => {
            var form= (output.props.children[0])
            expect( form.type).toBe('form')
        })
        it('should contain a videoContainer ', () => {
            var form= (output.props.children[1])
            expect( form.type.name).toBe('VideoContainer')
        })

    })
})
