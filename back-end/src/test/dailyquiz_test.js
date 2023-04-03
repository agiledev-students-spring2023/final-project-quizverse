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
  