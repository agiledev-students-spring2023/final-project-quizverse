// use mocha's built-in assertion library
const app = require('../server');
const assert = require('assert');
const settings = require('../routes/settings');
var chai = require('chai');
var chaiHttp = require('chai-http');
const request = require('supertest');
var expect = require('chai').expect;
chai.use(chaiHttp);

// a set of tests of array functions
describe('Settings', function () {
  // one particular unit test
  describe('Email Route', function () {
    // assert what should be returned
    it('Change Email', function (done) {
      let path = '/settings-email';
      request(app)
        .post(path)
        .send({ email: 'bob@gmail.com' })
        .end(function (err, res) {
          if (err) {
            console.log('Failed to send email');
            done(err);
          }
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
  describe('Privacy Route', function () {
    // assert what should be returned
    it('Privacy Policy', function (done) {
      var host = 'http://localhost:3001';
      var path = '/privacy';
      //var help = footer.test;
      // test that assertion
      request(app)
        .get(path)
        .end(function (err, res, body) {
          expect(res.status).to.be.equal(200, 'status code should be 200');
          done(err);
        });
    });
  });
});
