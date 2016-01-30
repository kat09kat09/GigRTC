var Bookshelf = require('bookshelf');

var db = Bookshelf.initialize({
  client: 'mysql',
  connection: {
    host: '127.0.0.1', // FIXME make sure this works
    user: 'vmak_database_user',
    password: 'Dr34mstream',
    database: 'gigg',
    charset: 'utf8',
  }
});

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (users) {
      users.increments('id').primary();
      users.timestamps();  // Adds a created_at and updated_at column on the database, setting these each to dateTime types.
      users.string('oauth_id', 255); // what google.plus will hopefully give us
      users.string('username', 255);
      users.text('artist_info'); // maximum length is 64 K
      users.specificType('userimage', 'mediumblob'); // mediumblob is for binaries up to 16 M
      users.date('banned_until'); // YYYY-MM-DD
      users.boolean('harassed'); // is this user the target of a troll campaign
      users.boolean('over17');
      users.boolean('admin');
    })
    .then(function (table) {
      console.log('Created Table', table);
    })
    .catch(function(error) { // I added these catch blocks, not sure if they're a benefit
    console.error('Error in users table creation: ', error);
    });
  }
});

db.knex.schema.hasTable('tags').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('tags', function (tags) {
      tags.increments('id').primary();
      tags.timestamps();  // Adds a created_at and updated_at column on the database, setting these each to dateTime types.
      tags.string('tagname', 255);
      tags.string('created_by_user', 255); // FIXME how to make foriegn key?
      tags.boolean('forbidden'); // this tag is douchey and will never be applied, eg "dumb" or "fuck this"
      tags.boolean('needs_judgement'); // this tag will only be applied after a judgement call from a human, eg "racist"
    })
    .then(function (table) {
      console.log('Created Table', table);
    })
    .catch(function(error) {
    console.error('Error in tags table creation: ', error);
    });
  }
});

module.exports = db;
