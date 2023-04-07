const assert = require('assert');
var chai = require('chai');
const expect = chai.expect;

let es = require('../routes/edit-set')

// a set of tests of array functions
describe('Edit Set Route', function () {
  // one particular unit test

  // assert what should be returned
  it('Updating a set', function (done) {
    var host = 'http://localhost:3001';
    var path = '/edit-set/1234';
    // test that assertion
    chai
      .request(host)
      .post(path)
      // .field('myparam' , 'test')
      .set('content-type', 'application/x-www-form-urlencoded')
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
