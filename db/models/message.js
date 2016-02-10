var db = require('../config');

var Message = db.Model.extend({
  tableName: 'messages',
  hasTimestamps: true,
  defaults: {
    user_name: 'Guest',
    channelID: 'Lobby',
    performance_id: 1 ,
    user_image: null
  },
  initialize: function(){
    this.on('creating', function(model, attrs, options){
      //tbd
    });
  }
});

module.exports = Message;