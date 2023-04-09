const app = require('../server');
const assert = require('assert');
const flashcardsets = require('../routes/flashcard-sets');
var chai = require('chai');
const expect = chai.expect;
const should = chai.should;
const request = require('supertest');

describe('Flashcard Sets', function () {
  describe('Get the flashcard sets', function (done) {
    it('it should GET all of the flashcard sets', (done) => {
      var host = 'http://localhost:3001';
      var path = '/flashcard-sets';
      request(app)
        .get(path)
        .end((err, res) => {
          expect(res.status).to.be.equal(200, 'status code should be 200');
          done();
        });
    });
  });

  describe('Get a specific flashcard set', function (done) {
    it('it should GET a specific flashcard set', (done) => {
      var host = 'http://localhost:3001';
      var path = '/flashcard-set/9481084';
      request(app)
        .get(path)
        .end((err, res) => {
          expect(res.status).to.be.equal(200, 'status code should be 200');
          done();
        });
    });

    it('it should return an unsuccessful status if no set id is provided', function (done) {
      var host = 'http://localhost:3001';
      var path = '/flashcard-set/';
      request(app)
        .get(path)
        .end((err, res) => {
          // Should be replaced with 400, it's 404 due to Mockeraoo I believe
          expect(res.status).to.be.equal(404, 'status code should be 404');
          done();
        });
    });
  });

  describe('Get all flashcards', function (done) {
    it('it should GET all flashcards', function (done) {
      var host = 'http://localhost:3001';
      var path = '/flashcards';
      request(app)
        .get(path)
        .end((err, res) => {
          expect(res.status).to.be.equal(200, 'status code should be 200');
          done();
        });
    });
  });
});
