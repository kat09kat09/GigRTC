import React, { Component, PropTypes } from 'react';

import MessageListItem from './MessageListItem';
import * as actions from '../actions/actions';
import { Modal, DropdownButton, MenuItem, Button } from 'react-bootstrap';
const activeChannel='Lobby';
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import uuid from 'node-uuid';
import moment from 'moment';
import List from 'material-ui/lib/lists/list';
import Table from 'material-ui/lib/table/table';

// var socket = io.connect('https://gigg.tv');


var socket = io.connect('https://localhost:1338');



class Chat extends Component {

  constructor(props, context) {
    super(props, context);
    console.log('props in Chat', props);
    this.state = {
      text: '',
      typing: false
    };


    // connect_socket(props.token);

  }
  componentWillMount() {
    const {userDetails, dispatch, activeChannel } = this.props;
    dispatch(actions.fetchMessages(activeChannel));

  }
  componentDidMount() {
    const {userDetails, dispatch, activeChannel}= this.props;
    if(!userDetails) {
      var userName= 'Guest';
    } else {
      var userName= userDetails.user_name;

    }

    socket.on('receive socket', socketID =>{
      console.log('received socket id', socketID)
      dispatch(actions.receiveSocket(socketID))
    });
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
      dispatch(actions.receiveSocket(socketID))
    });
  }
  componentDidUpdate() {
    console.log('this.refs', this.refs)
    const messageList = this.refs.messageList;
    messageList.scrollTop = messageList.scrollHeight;
  }
  handleSave(newMessage) {
    const { dispatch } = this.props;
    if (newMessage.text.length !== 0) {
      dispatch(actions.createMessage(newMessage));
    }
  }

  handleSubmit(event) {

    const { userDetails, activeChannel} = this.props;
    if(!userDetails) {
      var userName= 'Guest';
    } else {
      var userName= userDetails.user_name;
    }

    const text = event.target.value.trim();
    if (event.which === 13) { //carriage return
      event.preventDefault();
      var newMessage = {
        id: `${Date.now()}${uuid.v4()}`,
        channelID: activeChannel,
        text: text,
        user: userName,
        time: moment().calendar()
      };
      socket.emit('new message', newMessage);
      socket.emit('stop typing', { user: userName, channel: activeChannel });
      // this.props.onSave(newMessage);
      this.handleSave(newMessage);
      this.setState({ text: '', typing: false });
    }
  }
  handleChange(event) {
    const { userDetails, activeChannel } = this.props;
    if(!userDetails) {
      var userName= 'Guest';
    } else {
      userName= userDetails.user_name;
    }

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
   // <ul style={{wordWrap: 'break-word', margin: '0', overflowY: 'auto', padding: '0', paddingBottom: '1em', flexGrow: '1', order: '1'}} ref="messageList">
   //          {filteredMessages.map(message =>

   //              <MessageListItem message={message} key={message.id} />
   //          )}
   //        </ul>


  render() {


    const {messages, dispatch,userDetails, activeChannel}= this.props;
    console.log('this.props in Chat.js', this.props);

    const filteredMessages = messages.filter(message => message.channelID === activeChannel);
    const styles = {
      propContainerStyle: {
        width: 200,
        overflow: 'hidden',
        margin: '20px auto 0',
      },
      propToggleHeader: {
        margin: '20px auto 10px',
      },
    };
    return (
      <div style={{margin: '0', padding: '0', height: '100%', width: '100%', display: '-webkit-box'}}>

        <div className="main" >

          <div style= {{height: '30em', overflow:'scroll'}}>
            {filteredMessages.map(message =>

                  <MessageListItem message={message} key={message.id} />

            )}
          </div>
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
  console.log(state);
  return {
      messages: state.messages.data,
      activeChannel: state.activeChannel.name,
      userDetails: state.auth.userDetails,
      token: state.auth.token
  }
}

export default connect(mapStateToProps)(Chat)