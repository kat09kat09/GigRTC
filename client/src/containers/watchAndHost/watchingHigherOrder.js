import React,{Component} from 'react';
import {connect} from 'react-redux';
//import {pushState} from 'redux-router';
import {browserHistory} from 'react-router'

export function videoHigherOrderFunction(Component) {

    const skylink = new Skylink();

    skylink.on('mediaAccessSuccess', function(stream){
        var vid = document.getElementById('video');
        attachMediaStream(vid, stream);
    });

    function onBroadcast(){

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

    function endBroadcast(){
        skylink.stopStream();
        //Need to add poster when stram is stopped
    }

    class VidContainer extends Component {


        render () {
            return (
                <div>
                    <Component startBroadcast={onBroadcast}
                               endBroadcast={endBroadcast}
                        {...this.state} {...this.props}/>
                </div>
            )

        }
    }

    const mapStateToProps = (state) => ({
        token: state.auth.token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated,
        environment: state.environment
    });

    return connect(mapStateToProps)(VidContainer);

}
