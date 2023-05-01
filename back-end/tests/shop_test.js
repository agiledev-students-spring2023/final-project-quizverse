const sh = require('../routes/shop.js');
const app = require('../server');
const assert = require('assert');
const chai = require('chai');
chai.use(require('chai-json'));
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should;
const request = require('supertest');

describe('Shop', function () {
  describe('Post a purchase', function (done) {
    // assert what should be returned
    it('it should POST what the user sent', (done) => {
      // const host = 'http://localhost:3001';
      // const path = '/shop';
      // // test that assertion
      // request(app)
      //   .post(path)
      //   .send({ correct: 10, incorrect: 1 })
      //   .end(function (err, res) {
      //     expect(res.body).to.be.an('object');
      //     done();
      //   });
      done();
    });
  });
});