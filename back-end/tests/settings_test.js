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
  describe('Password Route', function () {
    // assert what should be returned
    it('Change Password', function (done) {
      let path = '/settings-password';
      request(app)
        .post(path)
        .send({ password: 'Testp@ssword!1!1' })
        .end(function (err, res) {
          if (err) {
            console.log('Failed to send password');
            done(err);
          }
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
  describe('Items Route', function () {
    // assert what should be returned
    it('Check Items', function (done) {
      let path = '/items';
      request(app)
        .get(path)
        .end(function (err, res) {
          if (err) {
            console.log('Failed to get items');
            done(err);
          }
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
  describe('Study Stats Route', function () {
    // assert what should be returned
    it('Study Statistics', function (done) {
      let path = '/study-stats';
      request(app)
        .get(path)
        .end(function (err, res) {
          if (err) {
            console.log('Failed to get study stats');
            done(err);
          }
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
  describe('Delete Route', function () {
    // assert what should be returned
    it('Delete Account', function (done) {
      let path = '/delete';
      request(app)
        .post(path)
        .send({ filler: 'filler text! :)' })
        .end(function (err, res) {
          if (err) {
            console.log('Failed to delete account');
            done(err);
          }
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
});
