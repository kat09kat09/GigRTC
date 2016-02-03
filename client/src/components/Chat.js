import React, { Component, PropTypes } from 'react';
import MessageComposer from './MessageComposer';
import MessageListItem from './MessageListItem';
// import Channels from './Channels';
import * as actions from '../actions/actions';
//import * as authActions from '../actions/authActions';
// import TypingListItem from './TypingListItem';
import { Modal, DropdownButton, MenuItem, Button } from 'react-bootstrap';
// const activeChannel='Lobby'; 
// const user= 'tds@tds.com'; 
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import uuid from 'node-uuid';
import moment from 'moment';

var socket = io.connect('https://localhost:1338'); 


function connect_socket(token){
  console.log('connect socket fxn is called'); 
  console.log('io exists', io)
  console.log('token', token); 
  // var socket= io(); 
  // var socket= io.connect('https://localhost:1338', { path: '/api/chat' }); 
  // var socket = io('https://localhost:1338', { path: '/api/chat' });
  var socket = io.connect('https://localhost:1338'); 
  console.log('socket on outer layer', socket)
  // socket.on('connect', function () {
  //   console.log('connect event')
  //   console.log('socket', socket); 
    socket.on('authenticated', function () {
        //do things
        console.log('socket has been authenticated')
        socket.on('receive socket', socketID =>{
            console.log('received socket id', socketID)
            dispatch(authActions.receiveSocket(socketID))
        }); 
    });

    socket.emit('authenticate', {token: token})
  // })
  return socket; 

}


class Chat extends Component {

  // static propTypes = {
  //   messages: PropTypes.array.isRequired,
  //   user: PropTypes.object.isRequired,
  //   dispatch: PropTypes.func.isRequired,
  //   // channels: PropTypes.array.isRequired,
  //   activeChannel: PropTypes.string.isRequired, //this should simply be the artist's username
  //   // typers: PropTypes.array.isRequired,
  //   socket: PropTypes.object.isRequired
  // };
  constructor(props, context) {
    super(props, context);
    console.log('props in Chat', props); 
    this.state = {
      text: '',
      typing: false
    };


    connect_socket(props.token); 


    // socket.on('connect', function () {

    // socket.on('receive socket', socketID =>{
    //     console.log('received socket id', socketID)
    //     dispatch(authActions.receiveSocket(socketID))
    //     }); 
    // });
    // this.state = {
    //   privateChannelModal: false,
    //   targetedUser: ''
    // }
  }
  componentWillMount() {
    const { dispatch, activeChannel } = this.props;
    // console.log('this.props in chat container', this.props); 

    // if(!user.username) {
    //   dispatch(receiveAuth());
    // }
    dispatch(actions.fetchMessages(activeChannel));
    // dispatch(actions.fetchChannels(user.username));
    

  }
  componentDidMount() {
    // const { socket, user, dispatch } = this.props;
    const {userName, dispatch, activeChannel}= this.props; 
    
    console.log('user in Chat', userName); 
    socket.emit('chat mounted', userName);
    socket.on('new bc message', msg =>
      dispatch(actions.receiveRawMessage(msg))
    );
    socket.on('typing bc', user =>
      dispatch(actions.typing(user))
    );
    socket.on('stop typing bc', user =>
      dispatch(actions.stopTyping(user))
    );
    socket.on('new channel', channel =>
      dispatch(actions.receiveRawChannel(channel))
    );
    socket.on('receive socket', socketID =>{
      console.log('received socket', socketID)
      dispatch(authActions.receiveSocket(socketID))
    });
    // socket.on('receive private channel', channel =>
    //   dispatch(actions.receiveRawChannel(channel))
    // );
    
  }
  componentDidUpdate() {
    const messageList = this.refs.messageList;
    messageList.scrollTop = messageList.scrollHeight;
  }
  handleSave(newMessage) {
    const { dispatch } = this.props;
    if (newMessage.text.length !== 0) {
      dispatch(actions.createMessage(newMessage));
    }
  }
  // handleSignOut() {
  //   const { dispatch } = this.props;
  //   dispatch(authActions.signOut());
  // }
  // changeActiveChannel(channel) {
  //   const { socket, activeChannel, dispatch } = this.props;
  //   socket.emit('leave channel', activeChannel);
  //   socket.emit('join channel', channel);
  //   dispatch(actions.changeChannel(channel));
  //   dispatch(actions.fetchMessages(channel.name));
  // }
  // handleClickOnUser(user) {
  //   this.setState({ privateChannelModal: true, targetedUser: user });
  // }
  // closePrivateChannelModal() {
  //   event.preventDefault();
  //   this.setState({privateChannelModal: false});
  // }
  // handleSendDirectMessage() {
  //   const { dispatch, socket, channels, user } = this.props;
  //   const doesPrivateChannelExist = channels.filter(item => {
  //     return item.name === (`${this.state.targetedUser.username}+${user.username}` || `${user.username}+${this.state.targetedUser.username}`)
  //   })
  //   if (user.username !== this.state.targetedUser.username && doesPrivateChannelExist.length === 0) {
  //     const newChannel = {
  //       name: `${this.state.targetedUser.username}+${user.username}`,
  //       id: Date.now(),
  //       private: true,
  //       between: [this.state.targetedUser.username, user.username]
  //     };
  //     dispatch(actions.createChannel(newChannel));
  //     this.changeActiveChannel(newChannel);
  //     socket.emit('new private channel', this.state.targetedUser.socketID, newChannel);
  //   }
  //   if(doesPrivateChannelExist.length > 0) {
  //     this.changeActiveChannel(doesPrivateChannelExist[0]);
  //   }
  //   this.setState({ privateChannelModal: false, targetedUser: '' });
  // }

  //Message Sumbission handlers
  handleSubmit(event) {
     
    const { userName, activeChannel} = this.props;
    const text = event.target.value.trim();
    if (event.which === 13) { //carriage return
      console.log('sumbit message called');
      event.preventDefault();
      var newMessage = {
        id: `${Date.now()}${uuid.v4()}`,
        channelID: activeChannel,
        text: text,
        user: userName,
        time: moment.utc().format('lll')
      };
      socket.emit('new message', newMessage);
      socket.emit('stop typing', { user: userName, channel: activeChannel });
      // this.props.onSave(newMessage);
      this.handleSave(newMessage); 
      this.setState({ text: '', typing: false });
    }
  }
  handleChange(event) {
    const { userName, activeChannel } = this.props;
    this.setState({ text: event.target.value });
    if (event.target.value.length > 0 && !this.state.typing) {
      socket.emit('typing', { user: userName, channel: activeChannel });
      this.setState({ typing: true});
    }
    if (event.target.value.length === 0 && this.state.typing) {
      socket.emit('stop typing', { user: user.userName, channel: activeChannel });
      this.setState({ typing: false});
    }
  }


  render() {
    // const { messages, socket, channels, activeChannel, typers, dispatch, user} = this.props;
    // const { messages, socket, dispatch, user} = this.props;
    const {messages, dispatch,user, activeChannel}= this.props; 
    console.log('this.props in Chat.js', this.props); 
    const filteredMessages = messages.filter(message => message.channelID === activeChannel);
    // const filteredMessages= [{id:1, text: 'test message 1', userName: 'tds@tds.com'}, {id:2, text: 'test message 2', userName: 'tds@tds.com'}]; 

    //need to feed username in from our auth
    // const username = this.props.user.username;

    //this is for the user to signout
    // const dropDownMenu = (
    //   <div style={{'width': '21rem', 'top': '0', alignSelf: 'baseline', padding: '0', margin: '0', order: '1'}}>
    //     <DropdownButton key={1} style={{'width': '21rem'}} id="user-menu"  bsSize="large" bsStyle="primary" title={username}>
    //       <MenuItem style={{'width': '21rem'}} eventKey="4" onSelect={::this.handleSignOut}>Sign out</MenuItem>
    //     </DropdownButton>
    //   </div>
    // );

    //we're not going to do private messages 
    // const PrivateMessageModal = (
    //   <div>
    //     <Modal bsSize="small" key={1} show={this.state.privateChannelModal} onHide={::this.closePrivateChannelModal}>
    //     <Modal.Header>
    //       {this.state.targetedUser.username}
    //     </Modal.Header>
    //     <Modal.Body>
    //       <Button onClick={this.handleSendDirectMessage.bind(this)}>
    //         Direct Message
    //       </Button>
    //     </Modal.Body>
    //     <Modal.Footer>
    //       <Button onClick={this.closePrivateChannelModal.bind(this)}>
    //         Close
    //       </Button>
    //     </Modal.Footer>
    //     </Modal>
    //   </div>
    // );
   
    
    return (
      <div style={{margin: '0', padding: '0', height: '100%', width: '100%', display: '-webkit-box'}}>
    
        <div className="main">
          <header style={{background: '#FFFFFF', color: 'black', flexGrow: '0', order: '0', fontSize: '2.3em', paddingLeft: '0.2em'}}>
            <div>
            {activeChannel}
            </div>
          </header>
          <ul style={{wordWrap: 'break-word', margin: '0', overflowY: 'auto', padding: '0', paddingBottom: '1em', flexGrow: '1', order: '1'}} ref="messageList">
            {filteredMessages.map(message =>

              <MessageListItem message={message} key={message.id} />
            )}
          </ul>
          <div style={{
            zIndex: '52',
            left: '21.1rem',
            right: '1rem',
            width: '100%',
            flexShrink: '0',
            order: '2',
            marginTop: '0.5em'
          }}>
            <input
              style={{
                height: '100%',
                fontSize: '2em',
                marginBottom: '1em'
              }}
              type="textarea"
              name="message"
              ref="messageComposer"
              autoFocus="true"
              placeholder="Type here to chat!"
              value={this.state.text}
              onSave={this.handleSave.bind(this)}
              onChange={this.handleChange.bind(this)}
              onKeyDown={this.handleSubmit.bind(this)}/>
          </div>
        </div>
        
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
      messages: state.messages.data,
      // channels: state.channels.data,
      activeChannel: state.activeChannel.name,
      userName: state.auth.userName,
      token: state.auth.token
      // typers: state.typers
  }
}

export default connect(mapStateToProps)(Chat)