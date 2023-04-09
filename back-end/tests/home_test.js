const app = require('../server');
const assert = require('assert');
const home = require('../routes/home');
var chai = require('chai');
const expect = chai.expect;
const should = chai.should;
const request = require('supertest');

describe('Home', function () {
  it('it should GET the users data', function (done) {
    var host = 'http://localhost:3001';
    var path = '/home';
    request(app)
      .get(path)
      .end((err, res) => {
        expect(res.status).to.be.equal(200, 'status code should be 200');
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
