// use mocha's built-in assertion library
const app = require('../server');
const assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
const footer = require('../routes/footer');
const request = require('supertest');



chai.use(chaiHttp);

// a set of tests of array functions
describe('Footer', function () {
  // one particular unit test
  describe('Terms of Service Route', function () {
    // assert what should be returned
    it('Terms of Service', function () {
      var host = 'http://localhost:3001';
      var path = '/terms';
      // test that assertion
      chai
        .request(host)
        .get(path)
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
  describe('Privacy Route', function () {
    // assert what should be returned
    it('Privacy Policy', function () {
      var host = 'http://localhost:3001';
      var path = '/privacy';
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
