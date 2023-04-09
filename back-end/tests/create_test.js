const app = require('../server');
const assert = require('assert');
const chai = require('chai');
const create = require('../routes/create-set');
const expect = chai.expect;
const request = require('supertest');

// a set of tests of array functions
describe('Create Set Route', function () {
  // one particular unit test

  // assert what should be returned
  it('Create a set', function (done) {
    const host = 'http://localhost:3001';
    const path = '/create-set';
    const sampleItem = { myparam: 'test' };
    // test that assertion
    request(app)
      .post(path)
      .send(sampleItem)
      .end(function (err, res) {
        expect(res.status).to.be.equal(200, 'status code should be 200');
        expect(res.body).to.be.a('object', 'request should return an object');
        expect(res.body.message).to.be.equal(
          'success',
          'a message indicating success should be returned'
        );
        done(err);
      });

    // chai
    //   .request(host)
    //   .post(path)
    //   .set('content-type', 'application/x-www-form-urlencoded')
    //   .send({ myparam: 'test' })
    //   .end(function (error, res) {
    //     expect(res.status).to.be.equal(200, 'status code should be 200');
    //     expect(res.body).to.be.a('object', 'request should return an object');
    //     expect(res.body.message).to.be.equal(
    //       'success',
    //       'a message indicating success should be returned'
    //     );
    //     done();
    //   });
  });
});
