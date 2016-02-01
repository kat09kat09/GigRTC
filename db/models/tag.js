var db = require('../config');
var User = require('./user');
var Performance = require('./performance');

var Tag = db.Model.extend({
  tableName: 'tags',
  hasTimestamps: true,
  defaults: {
    forbidden: false,
    needs_judgement: false
  },
  user: function() {
    return this.belongsTo(User);  // Bookshelf uses table name to automatically set foreignkey to user_id
  },
  performances: function() {
    return this.belongsToMany(Performance); // belongsToMany automatically returns a Collection, so not redq to make it
  },
  initialize: function(){ // for filling in individual cells with recieved data
    this.on('creating', function(model, attrs, options){
      // var shasum = crypto.createHash('sha1');
      // shasum.update(model.get('url'));
      // model.set('code', shasum.digest('hex').slice(0, 5));
    });
  }
});

module.exports = Tag;

// tags.increments('id').primary();
// tags.timestamps();
// tags.string('tagname', 255);
// tags.boolean('forbidden'); // this tag is douchey and will never be applied, eg "dumb" or "fuck this"
// tags.boolean('needs_judgement'); // this tag will only be applied after a judgement call from a human, eg "racist"
// tags.integer('user_id').unsigned().references('id').inTable('users'); // user who created this tag
