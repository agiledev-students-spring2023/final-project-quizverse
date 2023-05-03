// use mocha's built-in assertion library
const app = require('../server');
const assert = require('assert');
const i = require('../routes/items');
const chai = require('chai');
chai.use(require('chai-json'));
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should;
const request = require('supertest');

describe('Items Tests', function () {
  // one particular unit test
  describe('Get the List of Your Items', function () {
    // assert what should be returned
    it('it should GET your items', (done) => {
      const host = 'http://localhost:3001';
      const path = '/your-items?user=001';
      // test that assertion
      request(app)
        .get(path)
        .end((err, res) => {
          if (err) {
            console.log('Failed to get items');
          }
          expect(res).to.be.an('object');
          done();
        });
    });
  });
});
