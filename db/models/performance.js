var db = require('../config');
var User = require('./user');
var Tag = require('./tag');

var Performance = db.Model.extend({
  tableName: 'performances',
  hasTimestamps: true,
  defaults: {
    rated_r: false,
    active : false

  },
  user: function() {
    return this.belongsTo(User);
  },
  tags: function() {
    return this.belongsToMany(Tag);
  },
  initialize: function(){
    this.on('creating', function(model, attrs, options){
      // var shasum = crypto.createHash('sha1');
      // shasum.update(model.get('url'));
      // model.set('code', shasum.digest('hex').slice(0, 5));
    });
  }
});

module.exports = Performance;

// performances.increments('id').primary();
// performances.timestamps();
// performances.timestamp('went_live'); // timestamp is seconds since 1-1-1970, will not change with time zones
// performances.timestamp('ended');
// performances.string('title', 255);
// performances.string('short_description', 255);
// performances.text('long_description'); // maximum length is 64 K
// performances.specificType('performance_image', 'mediumblob'); // mediumblob is for binaries up to 16 M
// performances.boolean('rated_r');
// performances.integer('user_id').unsigned().references('id').inTable('users'); // artist
