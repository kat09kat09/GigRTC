import React, { Component } from 'react';
import StreamButtons from '../components/streamButtons';
import {connect} from 'react-redux';
import AuthenticateFacebook from '../components/auth/authenticatePage'


export class VideoContainer extends Component {

    render() {

        return (
            <div id="videoBig">
                <video id="video"  autoPlay width="640px" height="480px" poster="public/img/guitarist.jpg" />
                <div className="video-overlay"></div>
                <StreamButtons startBroadcast={this.props.startBroadcast} isBroadcaster={true}
                               endBroadcast={this.props.endBroadcast} currentRoom="gigg.tv"/>
                {//isBroadcaster will be managed by state, is true when artist is logged in
                }

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