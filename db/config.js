/*
  __MySQL steps required before this runs:__

  mysql.server start

  mysql -u root

  CREATE USER 'vmak_user'@'localhost' IDENTIFIED BY 'vmak_password';

  CREATE DATABASE gigg;

  GRANT ALL ON gigg.* TO 'vmak_user'@'localhost';
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
    });
  }
});

db.knex.schema.hasTable('tags').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('tags', function (tags) {
      tags.increments('id').primary();
      tags.timestamps();
      tags.string('tagname', 255);
      // https://github.com/tgriesser/knex/issues/24  <-- possible foreign key troubles
      tags.integer('user_id').unsigned().references('users.id'); // user who created this tag
      tags.boolean('forbidden'); // this tag is douchey and will never be applied, eg "dumb" or "fuck this"
      tags.boolean('needs_judgement'); // this tag will only be applied after a judgement call from a human, eg "racist"
    })
    .then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
