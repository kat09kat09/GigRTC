import React, { Component, PropTypes } from 'react';
import MessageComposer from './MessageComposer';
import MessageListItem from './MessageListItem';
// import Channels from './Channels';
import * as actions from '../actions/actions';
// import * as authActions from '../actions/authActions';
// import TypingListItem from './TypingListItem';
import { Modal, DropdownButton, MenuItem, Button } from 'react-bootstrap';
const activeChannel='Lobby'; 
const user= 'tds@tds.com'; 

export default class Chat extends Component {

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
    // this.state = {
    //   privateChannelModal: false,
    //   targetedUser: ''
    // }
  }
  componentDidMount() {
    const { socket, user, dispatch } = this.props;
    console.log('user in Chat', user); 
    socket.emit('chat mounted', user);
    socket.on('new bc message', msg =>
      dispatch(actions.receiveRawMessage(msg))
    );
    // socket.on('typing bc', user =>
    //   dispatch(actions.typing(user))
    // );
    // socket.on('stop typing bc', user =>
    //   dispatch(actions.stopTyping(user))
    // );
    // socket.on('new channel', channel =>
    //   dispatch(actions.receiveRawChannel(channel))
    // );
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
  render() {
    // const { messages, socket, channels, activeChannel, typers, dispatch, user} = this.props;
    const { messages, socket, dispatch, user} = this.props;
    //
    const filteredMessages = messages.filter(message => message.channelID === activeChannel);
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
            )}Message list item goes here
          </ul>
          <MessageComposer socket={socket} activeChannel={activeChannel} user={user} onSave={this.handleSave.bind(this)} />
        </div>
        
      </div>
    );
  }
}
