import React, { Component } from 'react';
import StreamButtons from '../components/streamButtons';
import {connect} from 'react-redux';
import AuthenticateFacebook from '../components/auth/authenticatePage'

export class VideoContainer extends Component {

  componentWillMount(){
      //var script   = document.createElement("script");
      //script.type  = "text/javascript";
      //script.src   = "../../public/js/webRTC.js";
      //document.body.appendChild(script);
  }

  render () {
    return (
      <div id="videoBig">
        <video id="video" autoPlay width="640px" height="480px" poster="public/img/guitarist.jpg"></video>
          <div className="video-overlay"></div>
        <StreamButtons />
      </div>
    );
  }
}


function mapStateToProps(state){
    return {
        environment : state.environment
    }
}

export default connect(mapStateToProps)(VideoContainer)