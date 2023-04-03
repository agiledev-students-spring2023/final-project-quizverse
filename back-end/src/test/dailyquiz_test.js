// use mocha's built-in assertion library
const assert = require('assert');
const auth = require('../../routes/auth');
var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Daily Quiz', function () {
    // one particular unit test
    describe('Login Route', function () {
      // assert what should be returned
      it('Login', function () {
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
    describe('Register Route', function () {
      // assert what should be returned
      it('Register', function () {
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
            } else {
              console.log('YAHOO');
            }
          });
      });
    });
    describe('Logout Route', function () {
      // assert what should be returned
      it('Logout', function () {
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
            } else {
              console.log('YAHOO');
            }
          });
      });
    });
  });
  