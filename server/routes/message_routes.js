var Message = require('../models/Message');
var bodyparser = require('body-parser');



module.exports = function(router) {
  router.use(bodyparser.json());

  // query DB for ALL messages
  router.get('/messages', function(req, res) {
    console.log('hit messages route'); 
    // Message.find({}, {id: 1, channelID: 1, text: 1, user: 1, time: 1, _id: 0}, function(err, data) {
    Message.find({},  function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      console.log('found messages', data); 
      res.json(data);
    });
  });

  // query DB for messages for a specific channel
  router.get('/messages/:channel', function(req, res) {
    console.log('gets to /messages/:channel in routes', req.params.channel); 
    // Message.find({channelID: req.params.channel}, {id: 1, channelID: 1, text: 1, user: 1, time: 1, _id: 0}, function(err, data) {
    Message.find({channelID: req.params.channel}, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      console.log('getting all messages from db sucessful', data); 
      res.json(data);
    });
  })

  //post a new message to db
  router.post('/newmessage', function(req, res) {
    console.log('request in /newmessage', req); 
    console.log('new message is sent to db', req.body); 
    var newMessage = new Message(req.body);
    newMessage.save(function (err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      console.log('message sucessfully saved to db')
      res.json(data);
    });
  });

}

// Message.remove({channelID: 'Lobby'}, function (err){
//   console.log(err); 
// })
