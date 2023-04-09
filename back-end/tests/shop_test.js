const sh = require('../routes/shop.js');
const app = require('../server');
const assert = require('assert');
var chai = require('chai');
chai.use(require('chai-json'));
var chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should;
const request = require('supertest');

describe('Shop', function () {
    describe('Post a purchase', function (done) {
      // assert what should be returned
      it('it should POST what the user sent', (done) => {
        var host = 'http://localhost:3001';
        var path = '/shop';
        // test that assertion
        request(app)
          .post(path)
          .send({ correct: 10, incorrect: 1 })
          .end(function (err, res) {
            expect(res.body).to.be.an('object');
            done();
          });
      });
    });
  });