import React, {Component} from 'react';

import VideoContainer from './video-container'; 
import StreamButtons from '../components/streamButtons'; 

class ArtistContainer extends Component {
  render() {
    return (
      <div className='streamYourself'>
        <form>
          <input
            placeholder='Title'>
          </input>
          <input
            placeholder="Details about the stream">
          </input>
          <button type= 'submit'>
            Submit Stream Details
          </button>
        </form>
        <VideoContainer />
      </div>
    )
  }
}

export default ArtistContainer