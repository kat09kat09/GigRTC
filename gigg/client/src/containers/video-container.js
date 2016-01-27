import React, { Component } from 'react';

class VideoContainer extends Component {
  render () {
    return (
      <div id="videoBig">
         <video id="video" autoplay width="640px" height="480px" poster="public/img/guitarist.jpg">
         </video>
              <div class="video-overlay">
              <div class="btn-group video-controls">
           <a id="call" href="#" class="btn btn-success">
             <span class="glyphicon glyphicon-facetime-video"></span> Go Live!</a>
           <a id="viewer" href="#" class="btn btn-primary">
             <span class="glyphicon glyphicon-music"></span> Watch Now!</a>
          <a id="terminate" href="#" class="btn btn-danger">
             <span class="glyphicon glyphicon-stop"></span> Stop</a>
             </div>
             </div>
      </div>
    );
  }
}

export default VideoContainer;

