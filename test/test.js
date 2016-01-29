var expect = require('chai').expect;
var server = require('../server.js').server;
var supertest = require('supertest');
//var login = require('./login');

var request = supertest(server);

var theAccount = {
  'userName': 'tds@tds.com',
  'password': 'tds'
};


describe("server", function(){
  
  describe('It should have tests', function(){
    it('should run tests to ensure extensibilty', function(){
      
    });
  });

  describe('GET root', function(){
    it("should load the homepage", function(done){
      request
        .get('/')
        .expect(200, /<body/, done);
    });
  });

  describe('Access should be restricted unless logged in', function(){
    it('Should not have access to restricted routes', function(done){
      request
        .get('/getData/')
        .expect(401, done);
    });
  });

  describe('Should be able to log in', function(){
    it('Should be able to log in', function(done){
      request
        .post('/auth/getToken/')
        .send(theAccount)
        .expect(200, done);
    });
  });
  


  // xdescribe('It should have access to restricted routes after login', function(){
  //   var agent;

  //   xbefore(function(done){
  //     login.login(request, function(loginAgent){
  //       agent = loginAgent;
  //       done();
  //     });
  //   });

    
  //   xit('should have restricted access after login', function(done){
  //     var req = request.get('/getData/');
  //     agent.attachCookies(req);
  //     console.log(req);
  //     req.expect(200, done);
  //   });

  // });

});
