var db = require('../config');
var Message = require('../models/message');

var Messages = new db.Collection();

Messages.model = Message;

module.exports = Messages;