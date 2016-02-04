import React,{Component} from 'react';
import {connect} from 'react-redux';
//import {pushState} from 'redux-router';
import {browserHistory} from 'react-router'
import {performanceActive} from '../../actions';
import Chat from  '../../components/Chat';
import CONFIG from '../../../../config'

export function videoHigherOrderFunction(Component) {

    const skylink = new Skylink();


    skylink.on('mediaAccessSuccess', function(stream){
        var vid = document.getElementById('video');
        attachMediaStream(vid, stream);
    });

    function onBroadcast(room){
        skylink.init({
            apiKey: CONFIG.SKYLINK_KEY,
            defaultRoom: room  //this will be managed by state at a later point
        }, () => {
            skylink.joinRoom({
                audio: true,
                video: true
            });
        });

    };
    
    function onStream(room){
        skylink.init({
            apiKey: CONFIG.SKYLINK_KEY,
            defaultRoom: room
        }, () => {
            skylink.joinRoom({});
        });

        skylink.on('incomingStream', function(peerId, stream, isSelf){
            if(isSelf) return;
            var vid = document.getElementById('video');
            attachMediaStream(vid, stream);
        });
    };

    function endBroadcast(){
        skylink.stopStream();
        var vid = document.getElementById('video');
        vid.poster = "../../../public/img/guitarist.jpg";
        vid.src = '';
        vid.style.background = ';'
    }


    class VidContainer extends Component {

        onVideoBroadCast(){
            onBroadcast(this.props.userDetails.user_name);
            performanceActive({room:this.props.userDetails.user_name});
        }

        onVideoStream(){
            var room = window.location.href;
            //NEEDS TO BE ALTERED FOR SERVER DON'T OVERLOOK
            var re = /https\:\/\/localhost\:1338\/activeStream\//gi;//THIS NEEDS TO BE CHANGED TO WORK ON SERVER
            onStream(room.replace(re,""));//this section needs the room of the clicked stream
        }

        render () {
            return (
                <div>
                    <Component startBroadcast={this.onVideoBroadCast.bind(this)}
                               endBroadcast={endBroadcast}
                               startStream={this.onVideoStream.bind(this)}
                               currentPrivelege={this.props.userPrivelege}
                               watchMode={!!this.props.params.room}
                        {...this.state} {...this.props}/>
                    <Chat/>
                </div>
            )

        }
    }

    const mapDispatchToProps = {
        performanceActive
    };

    const mapStateToProps = (state) => ({
        token: state.auth.token,
        userDetails: state.auth.userDetails,
        userPrivelege : state.auth.userPrivelege,
        isAuthenticated: state.auth.isAuthenticated,
        environment: state.environment
    });

    return connect(mapStateToProps, mapDispatchToProps)(VidContainer);

}
