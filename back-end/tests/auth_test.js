// use mocha's built-in assertion library
const assert = require('assert');
const auth = require('../routes/auth');
var chai = require('chai');
var chaiHttp = require('chai-http');



chai.use(chaiHttp);

// a set of tests of array functions
describe('Auth', function () {
  // one particular unit test
  describe('Login Route', function () {
    // assert what should be returned
    it('Login', function (done) {
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
            done(new Error('oh noes'));
          } else {
            console.log('YAHOO');
            done();
          }
        });
    });
  });
  describe('Register Route', function () {
    // assert what should be returned
    it('Register', function (done) {
      var host = 'http://localhost:3001';
      var path = '/register';
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
            done(new Error('oh noes'));
          } else {
            console.log('YAHOO');
            done();
          }
        });
    });
  });
  describe('Logout Route', function () {
    // assert what should be returned
    it('Logout', function (done) {
      var host = 'http://localhost:3001';
      var path = '/logout';
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
            done(new Error('oh noes'));
          } else {
            console.log('YAHOO');
            done();
          }
        });
    });
  });
});
