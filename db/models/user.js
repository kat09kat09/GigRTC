var db = require('../config');
var Tag = require('./tag');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  defaults: {
    visits: 0
  },
  tags: function() {
    return this.hasMany(Tag);
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
