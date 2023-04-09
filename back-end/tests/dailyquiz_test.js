// use mocha's built-in assertion library
const app = require('../server');
const assert = require('assert');
const daily = require('../routes/daily-quiz');
var chai = require('chai');
var chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should;
const request = require('supertest');

describe('Daily Quiz', function () {
  // one particular unit test
  describe('Get the Daily Quiz flashcards', function () {
    // assert what should be returned
    it('it should GET the vocab and definitions', (done) => {
      var host = 'http://localhost:3001';
      var path = '/daily-quiz';
      // test that assertion
      request(app)
        .get(path)
        .end((err, res) => {
          if(err){
            console.log("Failed to get DQ")
          }
          done()
        });
    });
  });
  describe('Post the daily quiz stats', function (done) {
    // assert what should be returned
    it('it should POST the users results after the quiz', (done) => {
      var host = 'http://localhost:3001';
      var path = '/study-stats';
      // test that assertion
      request(app)
        .post(path)
        .send({ correct: 10, incorrect: 1 })
        .end(function (err, res) {
          if (err){
            console.log("DQ Post failed")
          }
          done(err);
        });
    });
  });
});
  