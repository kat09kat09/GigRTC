import React,{Component} from 'react';
import {connect} from 'react-redux';
//import {pushState} from 'redux-router';
import {browserHistory} from 'react-router'
import {performanceActive} from '../../actions';
import {updatePerformanceViewCount} from '../../actions'
import {showTotalViewersWatching} from '../../actions'
import { bindActionCreators } from 'redux';
import Chat from  '../../components/Chat';
import CONFIG from '../../../../config'

export function videoHigherOrderFunction(Component) {

    const skylink = new Skylink();


    skylink.on('mediaAccessSuccess', function(stream){
        var vid = document.getElementById('video');
        attachMediaStream(vid, stream);
    });

    function onBroadcast(room){
        console.log("FROM SKYLINK BROADCASTIG HIGHER ORDER WATCH STREAM",room)

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
        console.log("FROM SKYLINK WATCHING HIGHER ORDER WATCH STREAM",room)
        skylink.init({
            apiKey: CONFIG.SKYLINK_KEY,
            defaultRoom: room
        }, () => {
            skylink.joinRoom({});
        });

        skylink.on('incomingStream', function(peerId, stream, isSelf){
            //if(isSelf) return;
            console.log("ROOM FROM INCOMING STREAM EVENT LISTENER",room)
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
            this.props.performanceActive({room:this.props.userDetails.user_name, active : true});
        }

        onVideoBroadCastEnd(){
            endBroadcast();
            this.props.performanceActive({room:this.props.userDetails.user_name, active : false});
        }

        onWatchVideoBroadcast(){
            onStream(this.props.params.room);//this section needs the room of the clicked stream
            this.props.updatePerformanceViewCount({room:this.props.params.room})

        }

        componentDidMount(){
                var self = this;
                if(this.props.params.room === self.props.userDetails.user_name) {
                    setInterval(function () {
                        showTotalViewersWatching(self.props.userDetails.user_name);
                    }, 1000)
                }
        }

        render () {

            return (
                <div>
                    <Component startBroadcast={this.onVideoBroadCast.bind(this)}
                               endBroadcast={this.onVideoBroadCastEnd.bind(this)}

                               currentPrivelege={this.props.userPrivelege}
                               watchMode={!!this.props.params.room}
                               watchVideo={this.onWatchVideoBroadcast.bind(this)}
                        {...this.state} {...this.props}/>
                    <Chat/>
                </div>
            )

        }
    }



    function mapDispatchToProps(dispatch) {
        return bindActionCreators({
            performanceActive,
            updatePerformanceViewCount,
            showTotalViewersWatching
        },
            dispatch)
    }

    const mapStateToProps = (state) => ({
        token: state.auth.token,
        userDetails: state.auth.userDetails,
        userPrivelege : state.auth.userPrivelege,
        isAuthenticated: state.auth.isAuthenticated,
        environment: state.environment
    });

    return connect(mapStateToProps, mapDispatchToProps)(VidContainer);

}
