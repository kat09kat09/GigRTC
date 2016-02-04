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

        render () {
            return (
                <div>
                    <Component startBroadcast={this.onVideoBroadCast.bind(this)}
                               endBroadcast={endBroadcast}
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
