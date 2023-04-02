// use mocha's built-in assertion library
const assert = require('assert');
const auth = require('../../routes/auth');
var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

// a set of tests of array functions
describe('Auth', function () {
  // one particular unit test
  describe('someMethod()', function () {
    // assert what should be returned
    it('sussy', function () {
      var host = 'http://localhost:3001';
      var path = '/login';
      // test that assertion
      chai
        .request(host)
        .post(path)
        // .field('myparam' , 'test')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ myparam: 'test' })
        .end(function (error, response, body) {
          if (error) {
            console.log('BIG ERROR');
          } else {
            console.log('YAHOO');
          }
        });
    });
  });
});
