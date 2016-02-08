var db = require('../config');

var Artist_User = db.Model.extend({
    tableName: 'artists_users'
});

module.exports = Artist_User;