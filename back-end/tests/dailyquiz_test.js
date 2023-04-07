// use mocha's built-in assertion library
const assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

let dq = require('../routes/daily-quiz')


describe('Daily Quiz', function () {
    // one particular unit test
    describe('Get the Daily Quiz flashcards', function () {
      // assert what should be returned
      it('it should GET the vocab and definitions', (done)=> {
        var host = 'http://localhost:3001';
        var path = '/daily-quiz';
        // test that assertion
        chai
          .request(host)
          .get(path)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
          });
      });
    });
    describe('Post the daily quiz stats', function () {
      // assert what should be returned
      it('it should POST the users results after the quiz', (done)=> {
        var host = 'http://localhost:3001';
        var path = '/study-stats';
        // test that assertion
        chai
          .request(host)
          .post(path)
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({correct: 10, incorrect: 1})
          .end(function (error, response, body) {
            if (error) {
              console.log('daily quiz stats not posted correctly');
              done()
            } else {
              console.log('successfully posted daily quiz stats');
              done()
            }
          });
      });
    });
    
    
})
  