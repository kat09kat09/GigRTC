var expect = require('chai').expect;
var server = require('../server.js');
var supertest = require('supertest');

var request = supertest.agent(server);

describe("server", function(){
  
  describe('It should have tests', function(){
    it('should run tests to ensure extensibilty', function(){
      
    });
  });

  xdescribe('GET root', function(){
    it("should load the homepage", function(done){
      request
        .get('/')
        .expect(200, function(err){
          console.log(err);
        }, done);
    });
  });







});
