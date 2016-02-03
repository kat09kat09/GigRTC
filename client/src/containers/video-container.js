import React, { Component } from 'react';
import StreamButtons from '../components/streamButtons';
import {connect} from 'react-redux';
import AuthenticateFacebook from '../components/auth/authenticatePage'



export class VideoContainer extends Component {

  componentDidMount(){
   skylink.on('mediaAccessSuccess', function(stream){
    var vid = document.getElementById('video');
    attachMediaStream(vid, stream);
  });
   
  }
  render () {
    
    return (
      <div id="videoBig">
        <video id="video" autoPlay width="640px" height="480px" poster="public/img/guitarist.jpg"></video>
          <div className="video-overlay"></div>
        <StreamButtons startBroadcast={this.onBroadcast} isBroadcaster={true} endBroadcast={this.endBroadcast} currentRoom="gigg.tv"/>
        {//isBroadcaster will be managed by state, is true when artist is logged in
}
      </div>
    );
  }

onBroadcast(){

skylink.init({
  apiKey: 'e8a678bc-e0e4-4605-aa76-cc857b7dbbd0',
  defaultRoom: 'gigg.tv' //this will be managed by state at a later point
}, () => {
  skylink.joinRoom({
    audio: true,
    video: true
  });
});
};

endBroadcast(){
  skylink.stopStream();
  //Need to add poster when stram is stopped
}

}


function mapStateToProps(state){
    return {
        environment : state.environment
    }
}

export default connect(mapStateToProps)(VideoContainer)