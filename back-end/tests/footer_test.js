// use mocha's built-in assertion library
const app = require('../server');
const assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
const footer = require('../routes/footer');
const request = require('supertest');
const expect = chai.expect;
chai.use(chaiHttp);

// a set of tests of array functions
describe('Footer', function () {
  // one particular unit test
  describe('Terms of Service Route', function () {
    // assert what should be returned
    it('Terms of Service', function (done) {
      var host = 'http://localhost:3001';
      var path = '/terms';
      // test that assertion
      request(app)
        .get(path)
        // .field('myparam' , 'test')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ myparam: 'test' })
        .end(function (err, res, body) {
          expect(res.status).to.be.equal(200, 'status code should be 200');
          done(err);
        });
    });
  });
  describe('Privacy Route', function () {
    // assert what should be returned
    it('Privacy Policy', function (done) {
      var host = 'http://localhost:3001';
      var path = '/privacy';
      // var func = footer.privacy();
      // console.log(func);
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
