import * as types from '../constants/ActionTypes';
import { browserHistory } from 'react-router';
import moment from 'moment';
import { checkHttpStatus, parseJSON } from '../utils';
import axios from 'axios'; 

// NOTE:Chat actions

function addMessage(message) {
  return {
    type: types.ADD_MESSAGE,
    message
  };
}

export function receiveRawMessage(message) {
  return {
    type: types.RECEIVE_MESSAGE,
    message
  };
}

export function receiveRawChannel(channel) {
  return {
    type: types.RECEIVE_CHANNEL,
    channel
  };
}

// function addChannel(channel) {
//   return {
//     type: types.ADD_CHANNEL,
//     channel
//   };
// }

// export function typing(username) {
//   return {
//     type: types.TYPING,
//     username
//   };
// }

// export function stopTyping(username) {
//   return {
//     type: types.STOP_TYPING,
//     username
//   };
// }

// export function changeChannel(channel) {
//   return {
//     type: types.CHANGE_CHANNEL,
//     channel
//   };
// }



function requestMessages() {
  console.log('request messages action called'); 
  return {
    type: types.LOAD_MESSAGES
  }
}

export function fetchMessages(channel) {
  console.log('fetch messages action called for :', channel); 
  return (dispatch) => {
    dispatch(requestMessages())
    console.log('will call fetch here at endpoint:', '/api/messages/'+channel)
    return axios.get('/api/messages/'+ channel)
      .then(function (response){
        console.log('it gets here', response); 
        dispatch(receiveMessages(response, channel))
      })
  }
}

function receiveMessages(json, channel) {
  console.log('receiveMessages action called', json); 
  const date = moment().format('lll');
  return {
    type: types.LOAD_MESSAGES_SUCCESS,
    json,
    channel,
    date
  }
}

function shouldFetchMessages(state) {
  const messages = state.messages.data;
  if (!messages) {
    return true
  }
}

export function fetchMessagesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchMessages(getState())) {
      return dispatch(fetchMessages())
    }
  }
}


export function createMessage(message) {
  return dispatch => {
    dispatch(addMessage(message))
    return fetch('/api/newmessage', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)})
      .catch(error => {throw error});
  }
}

// export function createChannel(channel) {
//   return dispatch => {
//     dispatch(addChannel(channel))
//     return fetch ('/api/channels/new_channel', {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(channel)})
//       .catch(error => {throw error});
//   }
// }
export function receiveSocket(socketID) {
  return {
    type: types.RECEIVE_SOCKET,
    socketID
  }
}


//the environment code is borrowed from Andrew Ngu, https://github.com/andrewngu/sound-redux

function changeIsMobile(isMobile) {
  return {
    type: types.CHANGE_IS_MOBILE,
    isMobile
  };
}

function changeWidthAndHeight(screenHeight, screenWidth) {
  return {
    type: types.CHANGE_WIDTH_AND_HEIGHT,
    screenHeight,
    screenWidth
  };
}

export function initEnvironment() {
  return dispatch => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      document.body.style.overflow = 'hidden';
    }

    dispatch(changeIsMobile(isMobile));
    dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth));

    window.onresize = () => {
      dispatch(changeWidthAndHeight(window.innerHeight, window.innerWidth));
    }
  };
}
