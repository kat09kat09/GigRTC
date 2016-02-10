// var Message = require('../models/Message'); //mongoose
var bodyparser = require('body-parser');
var Messages = require('../../db/collections/messages');
var Message = require('../../db/models/message');


module.exports = function(router) {
  router.use(bodyparser.json());

  // query DB for ALL messages
  // router.get('/messages', function(req, res) {
  //   console.log('hit messages route'); 
  //   // Message.find({}, {id: 1, channelID: 1, text: 1, user: 1, time: 1, _id: 0}, function(err, data) {
  //   Message.find({},  function(err, data) {
  //     if(err) {
  //       console.log(err);
  //       return res.status(500).json({msg: 'internal server error'});
  //     }
  //     console.log('found messages', data); 
  //     res.json(data);
  //   });
  // });

  // query DB for messages for a specific channel
  router.get('/messages/:channel', function(req, res) {
    // console.log('gets to /messages/:channel in routes', req.params.channel); 
    Messages.query({where: {channelID: req.params.channel}}).fetch().then(function(messages){
      var result= messages.models.map(function(message){
        return message.attributes; 
      });
      console.log('retrieved messages from db: ', result); 
      res.status(200).send(result); 
    })
    /*mongoose
    Message.find({channelID: req.params.channel}, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      console.log('getting all messages from db sucessful', data); 
      res.json(data);
    });
    */
  })

  //post a new message to db
  router.post('/newmessage', function(req, res) {
    console.log('new message is sent to db', req.body); 
    var newMessage= new Message({
      user_name: req.body.user,
      channelID: req.body.channelID,
      time: req.body.time,
      text: req.body.text,
      user_image: req.body.user_image
    })

    newMessage.save()
      .then(function (newEntry){
        console.log('sucessfully saved message to db'); 
        Messages.add(newEntry);
        res.status(200).send(newEntry); 
      })
      .catch(function(err){
        console.log(err); 
      }); 

    //mongoose
    // var newMessage = new Message(req.body);
    // newMessage.save(function (err, data) {
    //   if(err) {
    //     console.log(err);
    //     return res.status(500).json({msg: 'internal server error'});
    //   }
    //   console.log('message sucessfully saved to db')
    //   res.json(data);
    // });
  });

}

// Message.remove({channelID: 'Lobby'}, function (err){
//   console.log(err); 
// })
