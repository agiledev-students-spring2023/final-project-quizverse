// use mocha's built-in assertion library
const app = require('../server');
const assert = require('assert');
const {checkHistories, convertMLPQToArray, mapCorrect, mapIncorrect} = require('../routes/daily-quiz');
const chai = require('chai');
chai.use(require('chai-json'));
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should;
const request = require('supertest');

describe('Daily Quiz', function () {
  // one particular unit test
  describe('Get the Daily Quiz flashcards', function () {
    // assert what should be returned
    it('it should GET the vocab and definitions', (done) => {
      const host = 'http://localhost:3001';
      const path = '/daily-quiz';
      // test that assertion
      request(app)
        .get(path)
        .end((err, res) => {
          if (err) {
            console.log('Failed to get DQ');
          }
          expect(res).to.be.an('object');
          done();
        });
    });
  });
  describe('Test histories function', function () {
    // assert what should be returned
    it('it should return the priorities of the histories', (done) => {
      let answers = [
        {
          term: 'word',
          set_id: "644ed7ed37c002ee4dc6f55c",
          definition: 'def',
          correctness: false,
          _id: "644ed7ed37c002ee4dc6f564"
        }
      ]
      let mockUser = [
        {
          _id: "644ed7ed37c002ee4dc6f563",
          username: 'foobar',
          dayOfQuiz: "2023-04-30T21:04:45.958Z",
          percentageCorrect: 0,
          answers: answers
        }
      ]
      let mockAnswer = {
          "worddef": {
            "info": {
              "definition": "def",
             "set_id": "644ed7ed37c002ee4dc6f55c",
              "term": "word"
            },
            "priority": 0
          }
        }
      assert.deepEqual(checkHistories(mockUser), mockAnswer)
      done();
    });
  });
  describe('Test convertMLPQToArray function', function () {
    // assert what should be returned
    it('it should convert MLPQ to an array', (done) => {
      let input = {
        "worddef": {
          "info": {
            "definition": "def",
           "set_id": "644ed7ed37c002ee4dc6f55c",
            "term": "word"
          },
          "priority": 0
        }
      }
      let mockOuput = [
          {
            "definition": "def",
            "set_id": "644ed7ed37c002ee4dc6f55c",
            "term": "word"
          }
        ]
      assert.deepEqual(convertMLPQToArray(input), mockOuput)
      done();
    });
  });
  describe('Map an array of correct words', function () {
    // assert what should be returned
    it('it should map of array of correct words into the answer format', (done) => {
      let input = [{
        term: 'word',
        set_id: 12345,
        definition: 'definition',
        _id: 67890
      }
      ]
      let mockOuput = [
          {
            term: 'word',
            set_id: 12345,
            definition: 'definition',
            correctness: true
          }
        ]
      assert.deepEqual(mapCorrect(input), mockOuput)
      done();
    });
  });
  describe('Map an array of incorrect words', function () {
    // assert what should be returned
    it('it should map of array of incorrect words into the answer format', (done) => {
      let input = [{
        term: 'word',
        set_id: 12345,
        definition: 'definition',
        _id: 67890
      }
      ]
      let mockOuput = [
          {
            term: 'word',
            set_id: 12345,
            definition: 'definition',
            correctness: false
          }
        ]
      assert.deepEqual(mapIncorrect(input), mockOuput)
      done();
    });
  });
  describe('Post the daily quiz stats', function (done) {
    // assert what should be returned
    // it('it should POST the users results after the quiz', (done) => {
    //   const host = 'http://localhost:3001';
    //   const path = '/study-stats';
    //   // test that assertion
    //   request(app)
    //     .post(path)
    //     .send({ correct: 10, incorrect: 1 })
    //     .end(function (err, res) {
    //       expect(res.body).to.be.an('object');
    //       done();
    //     });
    // });
  });
});
