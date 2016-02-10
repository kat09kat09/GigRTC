import React,{Component} from 'react';
import {connect} from 'react-redux';
//import {pushState} from 'redux-router';
import {browserHistory} from 'react-router'
import {performanceActive,
    emailAllSubscribers,
    updatePerformanceViewCount,
    showTotalViewersWatching} from '../../actions';
import { bindActionCreators } from 'redux';
import Chat from  '../../components/Chat';
import CONFIG from '../../../../config'
import DescribePerformance from '../../components/performanceDescription/describePerformance';
import axios from 'axios'

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

        emailAllSubscribers(artistID){
            axios.get('/api/emailAllSubscribers',{params : artistID}).then((emails)=>{
                console.log("ALL ARTIST SUBSRCRIBERS",emails)
            })

        }

        componentDidMount(){
                //var self = this;
                //if(this.props.params.room === self.props.userDetails.user_name) {
                //    setInterval(function () {
                //        showTotalViewersWatching(self.props.userDetails.user_name);
                //    }, 1000)
                //}
            //Based on user/artist it will call broadcast/watch
            if(this.props.userPrivelege == 'artist'  && !this.props.params.room){

                //This function may need to change to a Redux action call, based on twilio //TODO
                this.emailAllSubscribers.call(this,{artist_id : this.props.userDetails.id, artist_name  : this.props.userDetails.user_name})
            }
            else if (this.props.params.room){
                this.onWatchVideoBroadcast.call(this)
            }
            else{
                browserHistory.push('/')
            }
        }

        componentWillUnmount(){
            this.onVideoBroadCastEnd.call(this)
        }

        render () {
            return (
                <div className="art-land-wrap">
                    <div className="chatComponent">
                        <Chat/>
                    </div>
                    <div className="broadcastComponent">
                        <Component startBroadcast={this.onVideoBroadCast.bind(this)}
                                   endBroadcast={this.onVideoBroadCastEnd.bind(this)}

                                   currentPrivelege={this.props.userPrivelege}
                                   watchMode={!!this.props.params.room}
                                   watchVideo={this.onWatchVideoBroadcast.bind(this)}
                            {...this.state} {...this.props}/>

                    </div>

                </div>
            )

        }
    }



    function mapDispatchToProps(dispatch) {
        return bindActionCreators({
            performanceActive,
            updatePerformanceViewCount,
            showTotalViewersWatching,
                emailAllSubscribers
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
