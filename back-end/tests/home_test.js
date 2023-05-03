const app = require('../server');
const assert = require('assert');
const home = require('../routes/home');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should;
const request = require('supertest');

describe('Home', function () {
  it('it should GET the users data', function (done) {
    const host = 'http://localhost:3001';
    const path = '/home';
    request(app)
      .get(path)
      .end((err, res) => {
        expect(res).to.be.an('object');
        done();
      });
  });
});
