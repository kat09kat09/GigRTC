var expect = require('chai').expect;

describe('True is true test', function(){

  it('responds to circleCI with True', function() {
    var func = true;
    expect(func).to.be.true;
  });

});
