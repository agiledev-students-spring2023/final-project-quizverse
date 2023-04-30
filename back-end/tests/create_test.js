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
  // it('Create a set', async function (done) {
  //   const host = 'http://localhost:3001';
  //   const path = '/create-set';
  //   const info = {
  //     title: "Test set",
  //     description: "Created during npm test",
  //     cards: {term: '', definition: ''}
  //   };
  //   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ0NTU2YTUwZTRiN2QxZWMyODYwYjUyIiwidXNlcm5hbWUiOiJtZXJ0bWVydCIsImlhdCI6MTY4MjgxMTU2Nn0.OyW7emGsaYQXoVvmPAKtGxTxZeO84keSwpwQ5bFWmDg"
  //   const username = "mertmert"
  //   // test that assertion
  //   request(app)
  //     .post(path)
  //     .set({"jwt-token": token, username: username})
  //     .send({info: info})
  //     .end(function (err, res) {
  //       console.log("sent")
  //       expect(res.status).to.be.equal(200, 'status code should be 200');
  //       expect(res.body).to.be.a('object', 'request should return an object');
  //       done();
  //     });

   
  // });
});
