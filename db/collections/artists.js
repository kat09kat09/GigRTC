var db = require('../config');
var Artist = require('../models/artist');

var Artists = new db.Collection();

Artists.model = Artist;

module.exports = Artists;
