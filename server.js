var path = require('path');
var url = require('url');
var express = require('express');
var minimist = require('minimist');
var ws = require('ws');
var kurento = require('kurento-client');
var fs    = require('fs');
var https = require('https');
var http = require('http');
var CONFIG = require('./config.js')

var favicon = require('serve-favicon');



var argv = minimist(process.argv.slice(2), {
    default: {
        as_uri: 'https://localhost:1338',
        ws_uri: 'ws://192.241.244.126:8888/kurento'
    }
});

var options =
{
  key:  fs.readFileSync('keys/server.key'),
  cert: fs.readFileSync('keys/server.crt')
};

var app = express();

/*
 * Definition of global variables.
 */
var idCounter = 0;
var candidatesQueue = {};
var kurentoClient = null;
var presenter = null;
var viewers = [];
var noPresenterMessage = 'No active presenter. Try again later...';

/*
 * Server startup
 */
var asUrl;
var port;
var server;

if (process.env.ON_HEROKU) {
  // run with http server
  port = process.env.PORT;
  server = http.createServer(app).listen(port, function() {
    console.log('Running on port ' + port + ' on Heroku');
  });
} else {
  asUrl = url.parse(argv.as_uri);
  port = asUrl.port;
  server = https.createServer(options, app).listen(port, function() {
    console.log('Open ' + url.format(asUrl) + ' with a WebRTC capable browser');
  });
}

// uses the web server created above
var wss = new ws.Server({
    server : server,
    path : '/one2many'
});

function nextUniqueId() {
  idCounter++;
  return idCounter.toString();
}

/*
 * Management of WebSocket messages
 */
wss.on('connection', function(ws) {

  var sessionId = nextUniqueId();
  console.log('Connection received with sessionId ' + sessionId);

    ws.on('error', function(error) {
        console.log('Connection ' + sessionId + ' error');
        stop(sessionId);
    });

    ws.on('close', function() {
        console.log('Connection ' + sessionId + ' closed');
        stop(sessionId);
    });

    ws.on('message', function(_message) {
        var message = JSON.parse(_message);
        console.log('Connection ' + sessionId + ' received message ', message);

        switch (message.id) {
        case 'presenter':
      startPresenter(sessionId, ws, message.sdpOffer, function(error, sdpAnswer) {
        if (error) {
          return ws.send(JSON.stringify({
            id : 'presenterResponse',
            response : 'rejected',
            message : error
          }));
        }
        ws.send(JSON.stringify({
          id : 'presenterResponse',
          response : 'accepted',
          sdpAnswer : sdpAnswer
        }));
      });
      break;

        case 'viewer':
      startViewer(sessionId, ws, message.sdpOffer, function(error, sdpAnswer) {
        if (error) {
          return ws.send(JSON.stringify({
            id : 'viewerResponse',
            response : 'rejected',
            message : error
          }));
        }

        ws.send(JSON.stringify({
          id : 'viewerResponse',
          response : 'accepted',
          sdpAnswer : sdpAnswer
        }));
      });
      break;

        case 'stop':
            stop(sessionId);
            break;

        case 'onIceCandidate':
            onIceCandidate(sessionId, message.candidate);
            break;

        default:
            ws.send(JSON.stringify({
                id : 'error',
                message : 'Invalid message ' + message
            }));
            break;
        }
    });
});

/*
 * Definition of functions
 */

// Recover kurentoClient for the first time.
function getKurentoClient(callback) {
    if (kurentoClient !== null) {
        return callback(null, kurentoClient);
    }

    kurento(argv.ws_uri, function(error, _kurentoClient) {
        if (error) {
            console.log("Could not find media server at address " + argv.ws_uri);
            return callback("Could not find media server at address" + argv.ws_uri
                    + ". Exiting with error " + error);
        }

        kurentoClient = _kurentoClient;
        callback(null, kurentoClient);
    });
}

function startPresenter(sessionId, ws, sdpOffer, callback) {
  clearCandidatesQueue(sessionId);

  if (presenter !== null) {
    stop(sessionId);
    return callback("Another user is currently acting as presenter. Try again later ...");
  }

  presenter = {
    id : sessionId,
    pipeline : null,
    webRtcEndpoint : null
  }

  getKurentoClient(function(error, kurentoClient) {
    if (error) {
      stop(sessionId);
      return callback(error);
    }

    if (presenter === null) {
      stop(sessionId);
      return callback(noPresenterMessage);
    }

    kurentoClient.create('MediaPipeline', function(error, pipeline) {
      if (error) {
        stop(sessionId);
        return callback(error);
      }

      if (presenter === null) {
        stop(sessionId);
        return callback(noPresenterMessage);
      }

      presenter.pipeline = pipeline;
      pipeline.create('WebRtcEndpoint', function(error, webRtcEndpoint) {
        if (error) {
          stop(sessionId);
          return callback(error);
        }

        if (presenter === null) {
          stop(sessionId);
          return callback(noPresenterMessage);
        }

        presenter.webRtcEndpoint = webRtcEndpoint;

                if (candidatesQueue[sessionId]) {
                    while(candidatesQueue[sessionId].length) {
                        var candidate = candidatesQueue[sessionId].shift();
                        webRtcEndpoint.addIceCandidate(candidate);
                    }
                }

                webRtcEndpoint.on('OnIceCandidate', function(event) {
                    var candidate = kurento.register.complexTypes.IceCandidate(event.candidate);
                    ws.send(JSON.stringify({
                        id : 'iceCandidate',
                        candidate : candidate
                    }));
                });

        webRtcEndpoint.processOffer(sdpOffer, function(error, sdpAnswer) {
          if (error) {
            stop(sessionId);
            return callback(error);
          }

          if (presenter === null) {
            stop(sessionId);
            return callback(noPresenterMessage);
          }

          callback(null, sdpAnswer);
        });

                webRtcEndpoint.gatherCandidates(function(error) {
                    if (error) {
                        stop(sessionId);
                        return callback(error);
                    }
                });
            });
        });
  });
}

function startViewer(sessionId, ws, sdpOffer, callback) {
  clearCandidatesQueue(sessionId);

  if (presenter === null) {
    stop(sessionId);
    return callback(noPresenterMessage);
  }

  presenter.pipeline.create('WebRtcEndpoint', function(error, webRtcEndpoint) {
    if (error) {
      stop(sessionId);
      return callback(error);
    }
    viewers[sessionId] = {
      "webRtcEndpoint" : webRtcEndpoint,
      "ws" : ws
    }

    if (presenter === null) {
      stop(sessionId);
      return callback(noPresenterMessage);
    }

    if (candidatesQueue[sessionId]) {
      while(candidatesQueue[sessionId].length) {
        var candidate = candidatesQueue[sessionId].shift();
        webRtcEndpoint.addIceCandidate(candidate);
      }
    }

        webRtcEndpoint.on('OnIceCandidate', function(event) {
            var candidate = kurento.register.complexTypes.IceCandidate(event.candidate);
            ws.send(JSON.stringify({
                id : 'iceCandidate',
                candidate : candidate
            }));
        });

    webRtcEndpoint.processOffer(sdpOffer, function(error, sdpAnswer) {
      if (error) {
        stop(sessionId);
        return callback(error);
      }
      if (presenter === null) {
        stop(sessionId);
        return callback(noPresenterMessage);
      }

      presenter.webRtcEndpoint.connect(webRtcEndpoint, function(error) {
        if (error) {
          stop(sessionId);
          return callback(error);
        }
        if (presenter === null) {
          stop(sessionId);
          return callback(noPresenterMessage);
        }

        callback(null, sdpAnswer);
            webRtcEndpoint.gatherCandidates(function(error) {
                if (error) {
                  stop(sessionId);
                  return callback(error);
                }
            });
        });
      });
  });
}

function clearCandidatesQueue(sessionId) {
  if (candidatesQueue[sessionId]) {
    delete candidatesQueue[sessionId];
  }
}

function stop(sessionId) {
  if (presenter !== null && presenter.id == sessionId) {
    for (var i in viewers) {
      var viewer = viewers[i];
      if (viewer.ws) {
        viewer.ws.send(JSON.stringify({
          id : 'stopCommunication'
        }));
      }
    }
    presenter.pipeline.release();
    presenter = null;
    viewers = [];

  } else if (viewers[sessionId]) {
    viewers[sessionId].webRtcEndpoint.release();
    delete viewers[sessionId];
  }

  clearCandidatesQueue(sessionId);
}

function onIceCandidate(sessionId, _candidate) {
    var candidate = kurento.register.complexTypes.IceCandidate(_candidate);

    if (presenter && presenter.id === sessionId && presenter.webRtcEndpoint) {
        console.info('Sending presenter candidate');
        presenter.webRtcEndpoint.addIceCandidate(candidate);
    }
    else if (viewers[sessionId] && viewers[sessionId].webRtcEndpoint) {
        console.info('Sending viewer candidate');
        viewers[sessionId].webRtcEndpoint.addIceCandidate(candidate);
    }
    else {
        console.info('Queueing candidate');
        if (!candidatesQueue[sessionId]) {
            candidatesQueue[sessionId] = [];
        }
        candidatesQueue[sessionId].push(candidate);
    }
}

var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt')
var bodyParser = require('body-parser');

app.use(favicon(__dirname + '/client/public/img/spinner.gif'));


app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client')));
app.use(expressJWT({secret : CONFIG.JWT_SECRET}).unless({path : ['/','/auth/getToken/']}));

app.post('/auth/getToken/', (req, res) => {
    if (req.body.userName == 'tds@tds.com' && req.body.password == 'tds') {
        var myToken = jwt.sign({userName:req.body.userName},CONFIG.JWT_SECRET)
        res.status(200)
            .json({token: myToken});
    } else {
        res.sendStatus(403);
    }
});

app.get('/getData/', (req, res) => {
    res.status(200)
        .json({data: 'Valid JWT found! This protected data was fetched from the server.'});

})
