var db = require('../config');
var Performance = require('../models/performance');

var Performances = new db.Collection();

Performances.model = Performance;

module.exports = Performances;
