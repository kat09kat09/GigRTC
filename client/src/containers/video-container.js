import React, { Component } from 'react';
import StreamButtons from '../components/streamButtons';
import {connect} from 'react-redux';
import AuthenticateFacebook from '../components/auth/authenticatePage'


export class VideoContainer extends Component {

    render() {

        return (
            <div id="videoBig">
                <video id="video"  autoPlay width="640px" height="480px" poster="../../public/img/guitarist.jpg" />
                <div className="video-overlay"></div>
                <StreamButtons startBroadcast={this.props.startBroadcast}
                               endBroadcast={this.props.endBroadcast}
                               startStream={this.props.startStream}
                               currentPrivelege={this.props.currentPrivelege}
                               watchMode={this.props.watchMode}
                               watchVideo={this.props.watchVideo}
                />
                {//isBroadcaster will be managed by state, is true when artist is logged in
                }

                <div>{this.props.view_count}</div>


            </div>
        );

    }
}

function mapStateToProps(state){
    return {
        view_count : state.performance.view_count
    }
}

export default connect(mapStateToProps)(VideoContainer)