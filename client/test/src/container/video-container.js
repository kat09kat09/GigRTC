//React and Redux imports
var React = require('react')


//Component&Container imports
import VideoContainer from '../../../src/containers/video-container';
import StreamButtons from '../../../src/components/streamButtons';


//Testing imports
import expect from 'expect'
var  TestUtils = require('react-addons-test-utils');


function setup() {

    let props = { id: 'video',
        autoPlay: true,
        width: '640px',
        height: '480px',
        poster: 'public/img/guitarist.jpg'
    };

    let renderer = TestUtils.createRenderer()
    renderer.render(<VideoContainer {...props} />)
    let output = renderer.getRenderOutput()
    //console.log("VIDEO",output.props.children[0])
    return {
        props,
        output,
        renderer
    }
}

describe('components', () => {
    const { output } = setup();
     const element = output.props.children
    describe('ArtistContainer', () => {

        it('Stream buttons should exist', () => {

            expect(element[2].type).toBe(StreamButtons);
        })

        it('Contain a video player', () => {

            const properties = { id: 'video',
                autoPlay: true,
                width: '640px',
                height: '480px',
                poster: 'public/img/guitarist.jpg'
            }

            expect(element[0].props.id).toBe(properties.id);
        })

    })
})
