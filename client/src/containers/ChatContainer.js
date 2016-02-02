import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/actions';
// import {receiveAuth} from '../actions/authActions';
import {Chat} from '../components/Chat';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import io from 'socket.io-client';

//we need to set up this route in express
// const socket = io('', { path: '/api/chat' });
// const socket = io.connect('https://127.0.0.1', {path: '/api/chat', reconnect: 'false'}); 
// console.log('socket', socket); 
// const socket= io(); 

//should set the initialChannel to the the artist's username + Broadcast... like "Mike's Broadcast"
const initialChannel = 'Lobby'; // NOTE: I hard coded this value for my example.  Change this as you see fit
const initialUser= 'TestUser'; 

class ChatContainer extends Component {

  constructor(props, context) {
    super(props, context);
    console.log('props in ChatContainer', props); 
    // this.state = {
    //   privateChannelModal: false,
    //   targetedUser: ''
    // }
  }

  componentWillMount() {
    const { dispatch, user } = this.props;
    console.log('this.props', this.props); 

    if(!user.username) {
      dispatch(receiveAuth());
    }
    dispatch(actions.fetchMessages(initialChannel));
    // dispatch(actions.fetchChannels(user.username));

    

  }
  render() {
    return (
      <div>Chat should be here
        <Chat {...this.props} socket={socket} />
        
      </div>
      
    );
  }
}
// ChatContainer.propTypes = {
//   messages: PropTypes.array.isRequired,
//   user: PropTypes.object.isRequired,
//   dispatch: PropTypes.func.isRequired,
//   // channels: PropTypes.array.isRequired,
//   activeChannel: PropTypes.string.isRequired, //this should simply be the artist's username
//   // typers: PropTypes.array.isRequired
// }

function mapStateToProps(state) {
  return {
      messages: state.messages.data,
      // channels: state.channels.data,
      activeChannel: state.activeChannel.name,
      user: state.auth.user,
      // typers: state.typers
  }
}
export default connect(mapStateToProps)(ChatContainer)
