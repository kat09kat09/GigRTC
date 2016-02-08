var db = require('../config');
var Tag = require('./tag');
var Performance = require('./performance');
var Artist = require('./artist')

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  defaults: {
    banned_until: '1000-01-01', // earliest allowable MySQL date
    harassed: false,
    over17: true,
    admin: false
  },
  tags: function() {
    return this.hasMany(Tag);
  },
  performances: function() {
    return this.hasMany(Performance);
  },
  artists: function() {
    return this.belongsToMany(Artist);
  },
  initialize: function(){
    this.on('creating', function(model, attrs, options){
      // var shasum = crypto.createHash('sha1');
      // shasum.update(model.get('url'));
      // model.set('code', shasum.digest('hex').slice(0, 5));
    });
  }
});

module.exports = User;

