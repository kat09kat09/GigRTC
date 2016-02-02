var path = require('path');
var url = require('url');
var express = require('express');
var minimist = require('minimist');
var ws = require('ws');
var kurento = require('kurento-client');
var fs    = require('fs');
var https = require('https');
var http = require('http');
var path = require('path')

var CONFIG = require('./config.js');

var favicon = require('serve-favicon');

var db = require('./db/config');
var Users = require('./db/collections/users');
var User = require('./db/models/user');
var Tags = require('./db/collections/tags');
var Tag = require('./db/models/tag');
var Performances = require('./db/collections/performances');
var Performance = require('./db/models/performance');

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
//
var app = express();

// build a function that checks if a username/tagname/thing already exists

app.get('/performances',
function(req, res) {
  Performances.fetch().then(function(performances) {
    res.status(200).send(performances.models);
  });
  // https://github.com/tgriesser/bookshelf/issues/629 possible issue with getting tags
  // res send in new then?  .attach(what in here)
  // Performance.fetchAll()
  // .then(function(performances) {
  //   return performances.each(function(performance) {
  //     return performance.load(['tags']); // look this up
  //   });
  // })
  // .then(function(performances) {
  //   performances.at(0).related('tags').attach(FTW); // waht in attach ()?
  // })
  // .then(function(performances) {
  //   res.send(200, performances.models); // ok to call models on fetchall result?
  // });
});

app.get('/test',
  function(req, res) {

    var testUser = new User({
      username: 'Jane Bond',
      admin: true
    });

    var testPerf = new Performance({
      title: 'Jimbo sings the blues',
      short_description: 'My blues are outta control',
      long_description: 'Love life\'s sweetest reward Let it flow it floats back to you. Boy the way Glen Miller played. Songs that made the hit parade. Guys like us we had it made. Those were the days. All of them had hair of gold like their mother the youngest one in curls.; In 1972 a crack commando unit was sent to prison by a military court for a crime they didn\'t commit. These men promptly escaped from a maximum security stockade to the Los Angeles underground. We\'re gonna do it. On your mark get set and go now. Got a dream and we just know now we\'re gonna make our dream come true. These days are all Happy and Free. These days are all share them with me oh baby. You wanna be where you can see our troubles are all the same. You wanna be where everybody knows Your name. Space. The final frontier. These are the voyages of the Starship Enterprise. Here\'s the story of a man named Brady who was busy with three boys of his own. Fleeing from the Cylon tyranny the last Battlestar – Galactica - leads a rag-tag fugitive fleet on a lonely quest - a shining planet known as Earth. Knight Rider: A shadowy flight into the dangerous world of a man who does not exist. It\'s time to put on makeup. It\'s time to dress up right. It\'s time to raise the curtain on the Muppet Show tonight. Its mission - to explore strange new worlds to seek out new life and new civilizations to boldly go where no man has gone before.'
    });

    var testTag = new Tag({
      tagname: 'doo wop'
    });

    testTag.save()
    .then(function(newTag) {
      Tags.add(newTag);
      res.status(200).send(newTag);
    })
    .catch(function(err) {
      console.error(err);
    });
  }
);



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

if (false) {  //set to process.env.ON_HEROKU for production set to false to test locally
  // run with http server
  port = process.env.PORT ;
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


///////////////////////////////////////////////\


var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt')
var bodyParser = require('body-parser');
var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

app.use(favicon(__dirname + '/client/public/img/spinner.gif'));


app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client')));

app.use(expressJWT({secret : CONFIG.JWT_SECRET}).unless({path : ['/',/^\/auth\/.*/,'/authenticateFacebook']}));

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
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new FacebookStrategy({
        clientID: CONFIG.FB_CLIENT_ID,
        clientSecret: CONFIG.FB_APP_SECRET,
        callbackURL: CONFIG.FB_CALL_BACK,
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function(accessToken, refreshToken, profile, done) {
        //User.findOrCreate(..., function(err, user) {
        //    if (err) { return done(err); }
        //    done(null, user);
        //});
        return done(null,{username : 'tds@tds.com'})
    }
));

app.use(passport.initialize());


app.get('/auth/facebook/',
    passport.authenticate('facebook',{scope : 'email'}));

var token;

app.get('/auth/facebook/callback/',

    passport.authenticate('facebook', { failureRedirect: '/login' }),

    function(req, res) {
        token = jwt.sign({userName:'tds@tds.com'},CONFIG.JWT_SECRET)
        res.redirect('/authenticateFacebook')
    }

);

app.get('/auth/validateSocialToken',(req, res) => {

    res.json({token: token});
})



app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

module.exports.server = server;


