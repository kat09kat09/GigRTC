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


// function connect_socket(token){
//   console.log('connect socket fxn is called'); 
//   console.log('io exists', io)
//   console.log('token', token); 
//   // var socket= io(); 
//   // var socket= io.connect('https://localhost:1338', { path: '/api/chat' }); 
//   // var socket = io('https://localhost:1338', { path: '/api/chat' });
//   var socket = io.connect('https://localhost:1338'); 
//   console.log('socket on outer layer', socket)
//   // socket.on('connect', function () {
//   //   console.log('connect event')
//   //   console.log('socket', socket); 
//     socket.on('authenticated', function () {
//         //do things
//         console.log('socket has been authenticated')
//         socket.on('receive socket', socketID =>{
//             console.log('received socket id', socketID)
//             dispatch(authActions.receiveSocket(socketID))
//         }); 
//     });

//     socket.emit('authenticate', {token: token})
//   // })
//   return socket; 

// }

// function connect_socket(){
//   console.log('connect socket fxn is called'); 
//   console.log('io exists', io)
  // var socket= io(); 
  // var socket= io.connect('https://localhost:1338', { path: '/api/chat' }); 
  // var socket = io('https://localhost:1338', { path: '/api/chat' });
  // var socket = io.connect('https://localhost:1338'); 
  // console.log('socket on outer layer', socket)
  // socket.on('connect', function () {
  //   console.log('connect event')
  //   console.log('socket', socket); 
    // socket.on('authenticated', function () {
        //do things
        // console.log('socket has been authenticated')
        // socket.on('receive socket', socketID =>{
        //     console.log('received socket id', socketID)
        //     dispatch(authActions.receiveSocket(socketID))
        // }); 
    // });

    // socket.emit('authenticate', {token: token})
  // })
//   return socket; 

// }

 // const socket= connect_socket(); 
 // console.log('socket in chat container def', socket); 

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
    // console.log('this.props in chat container', this.props); 

    // if(!user.username) {
    //   dispatch(receiveAuth());
    // }
    

    // dispatch(actions.fetchMessages(initialChannel));
    // dispatch(actions.fetchChannels(user.username));
    
    //socket={socket}
         // <Chat {...this.props} />

  }
  render() {
    return (
      <div>Chat should be here
   
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
  // console.log('state in Chat contianer', state); 
  return {
      messages: state.messages.data,
      // channels: state.channels.data,
      activeChannel: state.activeChannel.name
      // user: state.auth.userName,
      // typers: state.typers,
      // token: state.auth.token
  }
}
export default connect(mapStateToProps,null)(ChatContainer)
