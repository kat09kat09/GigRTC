var ws = new WebSocket('wss://' + location.host + '/one2many');
var video;
var webRtcPeer; //gets assigned in presenter function

window.onload = function() {

  video = document.getElementById('video');

  document.getElementsByClassName('startBroadcast')[0].addEventListener('click', function() { presenter(); } );
  document.getElementsByClassName('joinBroadcast')[0].addEventListener('click', function() { viewer(); } );
  document.getElementsByClassName('endBroadcast')[0].addEventListener('click', function() { stop(); } );
}

window.onbeforeunload = function() {
  ws.close();
}

//This is where the signaling takes place. Look in server.js to see the other half
ws.onmessage = function(message) {
  var parsedMessage = JSON.parse(message.data);
  console.info('Received message: ' + message.data);

  switch (parsedMessage.id) {
  case 'presenterResponse':
    presenterResponse(parsedMessage);
    break;
  case 'viewerResponse':
    viewerResponse(parsedMessage);
    break;
  case 'stopCommunication':
    dispose();
    break;
  case 'iceCandidate':
    webRtcPeer.addIceCandidate(parsedMessage.candidate)
    break;
  default:
    console.error('Unrecognized message', parsedMessage);
  }
}

function presenterResponse(message) {
  if (message.response != 'accepted') {
    var errorMsg = message.message ? message.message : 'Unknown error';
    console.warn('Call not accepted for the following reason: ' + errorMsg);
    dispose();
  } else {
    webRtcPeer.processAnswer(message.sdpAnswer);
  }
}

function viewerResponse(message) {
  if (message.response != 'accepted') {
    var errorMsg = message.message ? message.message : 'Unknown error';
    console.warn('Call not accepted for the following reason: ' + errorMsg);
    dispose();
  } else {
    webRtcPeer.processAnswer(message.sdpAnswer);
  }
}

function presenter() {
  if (!webRtcPeer) {
    showSpinner(video);

    var options = {
      localVideo: video,
      onicecandidate : onIceCandidate
      }

    webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function(error) {
      if(error) return onError(error);

      this.generateOffer(onOfferPresenter);
    });
  }
}

function onOfferPresenter(error, offerSdp) {
    if (error) return onError(error);

  var message = {
    id : 'presenter',
    sdpOffer : offerSdp
  };
  sendMessage(message);
}

function viewer() {
  if (!webRtcPeer) {
    showSpinner(video);

    var options = {
      remoteVideo: video,
      onicecandidate : onIceCandidate
    }

    webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function(error) {
      if(error) return onError(error);

      this.generateOffer(onOfferViewer);
    });
  }
}

function onOfferViewer(error, offerSdp) {
  if (error) return onError(error)

  var message = {
    id : 'viewer',
    sdpOffer : offerSdp
  }
  sendMessage(message);
}

function onIceCandidate(candidate) {
     console.log('Local candidate' + JSON.stringify(candidate));

     var message = {
        id : 'onIceCandidate',
        candidate : candidate
     }
     sendMessage(message);
}

function stop() {
  if (webRtcPeer) {
    var message = {
        id : 'stop'
    }
    sendMessage(message);
    dispose();
  }
}

function dispose() {
  if (webRtcPeer) {
    webRtcPeer.dispose();
    webRtcPeer = null;
  }
  hideSpinner(video);
}

function sendMessage(message) {
  var jsonMessage = JSON.stringify(message);
  console.log('Sending message: ' + jsonMessage);
  ws.send(jsonMessage);
}

function showSpinner() {
  for (var i = 0; i < arguments.length; i++) {
    arguments[i].poster = '';
    arguments[i].style.background = 'center transparent url("./public/img/spinner.gif") no-repeat';
  }
}

function hideSpinner() {
  for (var i = 0; i < arguments.length; i++) {
    arguments[i].src = '';
    arguments[i].poster = './public/img/guitarist.jpg';
    arguments[i].style.background = '';
  }
}