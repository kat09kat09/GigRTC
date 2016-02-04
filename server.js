var path = require('path');
var url = require('url');
var express = require('express');
var fs    = require('fs');
var https = require('https');
var http = require('http');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');


var CONFIG = require('./config.js')


var favicon = require('serve-favicon');

var db = require('./db/config');
var Users = require('./db/collections/users');
var User = require('./db/models/user');
var Artists = require('./db/collections/artists');
var Artist = require('./db/models/artist');
var Tags = require('./db/collections/tags');
var Tag = require('./db/models/tag');
var Performances = require('./db/collections/performances');
var Performance = require('./db/models/performance');


var options = {
  key:  fs.readFileSync('keys/server.key'),
  cert: fs.readFileSync('keys/server.crt')
};

var app = express();

var port = 1338;

var server = https.createServer(options, app)

var io= require('socket.io').listen(server);

server.listen(port, function() {
  console.log(`Running on port: ${port}`);
});



app.get('/populateDatabase',
  function(req, res) {

    var testUser = new User({
      username: 'Jane Bond',
      admin: true
    });

    var testPerf = new Performance({
      room: 'Jim Bob Burshea',
      title: 'Jimbo sings the blues',
      short_description: 'My blues are outta control'
    });

    var testTag = new Tag({
      tagname: 'doo wop'
    });

    // change testPerf to whatever database table you want to add a row to each time you go to /populateDatabase
    testPerf.save()
    .then(function(newEntry) {
      // change Performances to the table you want to populate
      Performances.add(newEntry);
      res.status(200).send(newEntry);
    })
    .catch(function(err) {
      console.error(err);
    });
  }
);


///////////////////////////////////////////////\


var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt')
var bodyParser = require('body-parser');
var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy
    ,   GoogleStrategy = require('passport-google').Strategy;

app.use(favicon(__dirname + '/client/public/img/spinner.gif'));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client')));

app.use(expressJWT({secret : CONFIG.JWT_SECRET}).unless({path : ['/',/^\/auth\/.*/,'/authenticateFacebook', /^\/api\/.*/, /^\/api\/messages\/.*/,/^\/activeStream\/.*/ ]}));


app.post('/auth/signIn/', (req, res) => {
    new Artist({user_name: req.body.user_name}).fetch().then(function(found){
        if(found){

            var check = bcrypt.compareSync(req.body.password, found.get('password'))
            if (check){

                var myToken = jwt.sign({user_name:req.body.user_name},CONFIG.JWT_SECRET)
                res.status(200).json({token: myToken, artist_details : found});
            }
            else {
                res.sendStatus(403).json({status : 'Incorrect password'});
            }
        }
        else {
            res.sendStatus(403).json({status : 'User does not exist, please sign up'});
        }
    });

});

app.post('/auth/signUp/', (req, res) => {

    new Artist({user_name: req.body.user_name, password: req.body.password}).fetch().then(function (found) {
        if (found) {
            res.sendStatus(403);

        }
        else {
          console.log(`creating new user${req.body}`);
            var newArtist = new Artist({
                user_name: req.body.user_name,
                password: req.body.password,
                email_id: req.body.email_id,
                brief_description: req.body.brief_description,
                user_image: req.body.user_image,
                display_name: req.body.display_name,
                genre: req.body.genre,
            });

            newArtist.save().then(function (artist) {
                Artists.add(artist);
                var myToken = jwt.sign({user_name: req.body.user_name}, CONFIG.JWT_SECRET)

                res.status(200).json({token: myToken, artist_details: artist});
            })
        }
    });

       new Performance({active: false, room: req.body.user_name})
        .save().then((performance)=>{
            console.log("NEW PERFORMANCE CREATED",performance)
        })

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
        new User({facebook_id : profile.id}).fetch().then(function(response){
            if(response){
                return done(null,profile)
            }
            else{
                var facebookUser = new User({
                    facebook_id : profile.id,
                    email_id : profile.emails[0].value,
                    display_name : profile.displayName,
                    user_image : profile.photos[0].value
                })

                facebookUser.save().then(function(newFacebookUser) {
                    Users.add(newFacebookUser);
                    return done(null,newFacebookUser)
                });
            }
        });
    }
));

app.use(passport.initialize());


app.get('/auth/facebook/',
    passport.authenticate('facebook',{scope : 'email'}));

var current_token;
var current_user;

app.get('/auth/facebook/callback/',

    passport.authenticate('facebook', { failureRedirect: '/login' }),

    function(req, res) {
        console.log("response",req.user);
        current_user = req.user;
        current_token = jwt.sign({user_name: req.user.emails[0].value },CONFIG.JWT_SECRET);
        res.redirect('/authenticateFacebook')
    }

);

app.get('/auth/validateSocialToken',(req, res) => {

    res.json({token: current_token, user_details : current_user});
});

/////////////////ACTIVE STREAM//////////
app.put('/api/activeStreams', function(req, res){

  Performance.forge({room: req.body.room})
      .fetch({require: true})
    .then((performance)=>{
        performance.save({
            active : req.body.active
        })
    })

});

app.get('/api/activeStreams',
    function(req, res) {
        Performances.query({where : {active : true}}).fetch().then(function(performances) {
            res.status(200).send(performances.models);
        });

    });


app.put('/api/updatePerformanceViewCount', function(req, res) {
    console.log("SERVER FOR UPDATE IS BEING HIT");
    Performance.forge({room: req.body.room})
        .fetch({require: true})
        .then((performance)=>{
            performance.save({
                number_of_viewers : performance.get('number_of_viewers') + 1
            })
            res.json({views : (performance.get('number_of_viewers') + 1)})
        })

});





//******* Test  Chat **************
//set env vars
var mongoose= require('mongoose');
process.env.MONGOLAB_URI = process.env.MONGOLAB_URI || 'mongodb://localhost/chat_dev';
process.env.PORT = process.env.PORT || 3000;

// connect our DB
mongoose.connect(process.env.MONGOLAB_URI);



//load routers
var messageRouter = express.Router();
require('./server/routes/message_routes.js')(messageRouter);

app.use('/api', messageRouter);


var socketioJwt= require('socketio-jwt');


io.set('transports', ["websocket", "polling"]);


io.on('connection', function (socket){
    console.log('a user connected');
    socket.join('Lobby');
    socket.on('chat mounted', function(user) {
      console.log('socket heard: chat mounted...user is: ', user);
      // TODO: Does the server need to know the user?
      socket.emit('receive socket', socket.id)
    })
    socket.on('leave channel', function(channel) {
      socket.leave(channel)
    })
    socket.on('join channel', function(channel) {
      socket.join(channel.name)
    })
    socket.on('new message', function(msg) {
      socket.broadcast.to(msg.channelID).emit('new bc message', msg);
    });
    socket.on('new channel', function(channel) {
      socket.broadcast.emit('new channel', channel)
    });
    socket.on('typing', function (data) {
      socket.broadcast.to(data.channel).emit('typing bc', data.user);
    });
    socket.on('stop typing', function (data) {
      socket.broadcast.to(data.channel).emit('stop typing bc', data.user);
    });

  });

//********* End Test Chat **********


app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

module.exports.server = server;


