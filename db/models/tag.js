var db = require('../config');
var User = require('./user');

var Tag = db.Model.extend({
  tableName: 'tags',
  hasTimestamps: true,
  defaults: {
    forbidden: false,
    needs_judgement: false
  },
  user: function() {
    return this.belongsTo(User, 'user_id');
  }
});

module.exports = Tag;

// tags.increments('id').primary();
// tags.timestamps();  // Adds a created_at and updated_at column on the database, setting these each to dateTime types.
// tags.string('tagname', 255);
// tags.string('created_by_user', 255); // FIXME how to make foriegn key?
// tags.boolean('forbidden'); // this tag is douchey and will never be applied, eg "dumb" or "fuck this"
// tags.boolean('needs_judgement');
