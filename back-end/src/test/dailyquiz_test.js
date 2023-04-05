// use mocha's built-in assertion library
const assert = require('assert');
const auth = require('../../routes/auth');
var chai = require('chai');
var chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

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
    
})
  