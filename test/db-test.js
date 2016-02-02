var expect = require('chai').expect;

var db = require('../db/config');
var Users = require('../db/collections/users');
var User = require('../db/models/user');
var Tags = require('../db/collections/tags');
var Tag = require('../db/models/tag');
var Performances = require('../db/collections/performances');
var Performance = require('../db/models/performance');

describe('True is true test', function(){

  it('responds to circleCI with True', function() {
    var func = true;
    expect(func).to.be.true;
  });

});
