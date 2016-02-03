var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var User = require('./user');

var Artist = db.Model.extend({
    tableName: 'artists',

    initialize: function() {
        this.on('creating', function() {
            var model = this;
            var promiseHash = Promise.promisify(bcrypt.hash);
            return promiseHash(model.get('password'), null,null)
                .then(function(hash) {
                    model.set('password', hash);
                });
        });
    },
    users: function() {
        return this.belongsToMany(User); // belongsToMany automatically returns a Collection, so not redq to make it
    }

});

module.exports = Artist;
