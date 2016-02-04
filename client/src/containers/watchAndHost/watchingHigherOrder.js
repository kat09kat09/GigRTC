import React,{Component} from 'react';
import {connect} from 'react-redux';
//import {pushState} from 'redux-router';
import {browserHistory} from 'react-router'
import {performanceActive} from '../../actions';

export function videoHigherOrderFunction(Component) {

    const skylink = new Skylink();


    skylink.on('mediaAccessSuccess', function(stream){
        var vid = document.getElementById('video');
        attachMediaStream(vid, stream);
    });

    function onBroadcast(room){
        console.log("ON BROADCAST",room)
        skylink.init({
            apiKey: 'e8a678bc-e0e4-4605-aa76-cc857b7dbbd0',
            defaultRoom: room  //this will be managed by state at a later point
        }, () => {
            skylink.joinRoom({
                audio: true,
                video: true
            });
        });

    };

    function endBroadcast(){
        console.log(document.getElementById('video'))
        skylink.stopStream();
        var vid = document.getElementById('video');
        vid.poster = "public/img/guitarist.jpg";
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
                        {...this.state} {...this.props}/>
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
        isAuthenticated: state.auth.isAuthenticated,
        environment: state.environment
    });

    return connect(mapStateToProps, mapDispatchToProps)(VidContainer);

}
