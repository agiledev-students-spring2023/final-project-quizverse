// use mocha's built-in assertion library
const app = require('../server');
const assert = require('assert');
const daily = require('../routes/daily-quiz');
var chai = require('chai');
var chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should;
const request = require('supertest');

describe('Home Screen stats', function () {
  // one particular unit test
  describe('Get Home screen statistics for your user', function () {
    // assert what should be returned
    it('it should GET basic user info', (done) => {
      var host = 'http://localhost:3001';
      var path = '/daily-quiz?user=001';
      // test that assertion
      request(app)
        .get(path)
        .end((err, res) => {
          if (err) {
            console.log('Failed to get User stats');
          }
          done();
        });
    });
  });
  


});
