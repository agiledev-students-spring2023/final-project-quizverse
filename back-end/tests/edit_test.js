const app = require('../server');
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const edit = require('../routes/edit-set');
const request = require('supertest');

const es = require('../routes/edit-set');

// a set of tests of array functions
describe('Edit Set Route', function () {
  // one particular unit test

  // assert what should be returned
  it('Updating a set', function (done) {
    const host = 'http://localhost:3001';
    const path = '/edit-set/1234';
    // test that assertion
    request(app)
      .post(path)
      .send({ myparam: 'test' })
      .end(function (error, res) {
        expect(res.status).to.be.equal(200, 'status code should be 200');
        expect(res.body).to.be.a('object', 'request should return an object');
        expect(res.body.message).to.be.equal(
          'success',
          'a message indicating success should be returned'
        );
        done();
      });
  });
});
