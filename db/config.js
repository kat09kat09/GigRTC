/*
  __MySQL steps required before this runs:__

  1. mysql.server start

  2. mysql -u root

  3. CREATE USER 'vmak_user'@'localhost' IDENTIFIED BY 'vmak_password';

  4. CREATE DATABASE gigg;

  5. GRANT ALL ON gigg.* TO 'vmak_user'@'localhost';

  __If you want to drop the DB and re-create it:__

  DROP DATABASE gigg;

  then continue from step 4
*/

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : 'localhost',
    user: 'vmak_user',
    password: 'vmak_password',
    database: 'gigg',
    charset: 'UTF8'
  }
});

var db = require('bookshelf')(knex);

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (users) {
      users.increments('id').primary();
      users.timestamps();  // Adds a created_at and updated_at column on the database, setting these each to dateTime types.
      users.string('oauth_id', 255).unique(); // what google.plus will hopefully give us
      users.string('username', 255).unique(); // listed here as unique as a backup in case our unique check fails
      users.text('artist_info'); // maximum length is 64 K
      users.specificType('userimage', 'mediumblob'); // mediumblob is for binaries up to 16 M
      users.date('banned_until'); // YYYY-MM-DD
      users.boolean('harassed'); // is this user the target of a troll campaign
      users.boolean('over17');
      users.boolean('admin');
    })
    .then(function (table) {
      console.log('Created Table', table);
    });
  }
});

/*
  Other columns that we may need will be:
  Chatlog (not included since it may end up as a reference to a chats table)
  Kurento pipeline info (not included since we're still not sure how this will arrive or be stored)
*/
db.knex.schema.hasTable('performances').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('performances', function (performances) {
      performances.increments('id').primary();
      performances.timestamps();
      performances.timestamp('went_live'); // timestamp is seconds since 1-1-1970, will not change with time zones
      performances.timestamp('ended');
      performances.string('title', 255);
      performances.string('short_description', 255);
      performances.text('long_description'); // maximum length is 64 K
      performances.specificType('performance_image', 'mediumblob'); // mediumblob is for binaries up to 16 M
      performances.boolean('rated_r');
      performances.integer('user_id').unsigned().references('id').inTable('users'); // artist
    })
    .then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('tags').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('tags', function (tags) {
      tags.increments('id').primary();
      tags.timestamps();
      tags.string('tagname', 255).unique();
      tags.boolean('forbidden'); // this tag is douchey and will never be applied, eg "dumb" or "fuck this"
      tags.boolean('needs_judgement'); // this tag will only be applied after a judgement call from a human, eg "racist"
      // https://github.com/tgriesser/knex/issues/24  <-- possible foreign key troubles
      tags.integer('user_id').unsigned().references('id').inTable('users'); // user who created this tag
    })
    .then(function (table) {
      console.log('Created Table', table);
    });
  }
});

// a join table with default naming: alphabetical, named after tables above, joined by _
db.knex.schema.hasTable('performances_tags').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('performances_tags', function (performances_tags) {
      performances_tags.increments('id').primary();
      performances_tags.integer('performance_id').unsigned().references('id').inTable('performances');
      performances_tags.integer('tag_id').unsigned().references('id').inTable('tags');
    })
    .then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
