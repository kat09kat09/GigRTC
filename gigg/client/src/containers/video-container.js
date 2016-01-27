import React, { Component } from 'react';

class VideoContainer extends Component {
  render () {
    return (
      <div id="videoBig">
        <video id="video" autoPlay width="640px" height="480px" poster="public/img/guitarist.jpg"></video>
          <div className="video-overlay"></div>
      </div>
    );
  }
}

export default VideoContainer;

