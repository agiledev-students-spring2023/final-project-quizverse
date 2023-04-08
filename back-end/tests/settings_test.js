// use mocha's built-in assertion library
const assert = require('assert');
const settings = require('../routes/settings');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
chai.use(chaiHttp);

// a set of tests of array functions
describe('Settings', function () {
  // one particular unit test
  describe('Email Route', function () {
    // assert what should be returned
    it('Change Email', function (done) {
      var host = 'http://localhost:3001';
      var path = '/settings-email';
      // test that assertion
      chai
        .request(host)
        .post(path)
        // .field('myparam' , 'test')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ email: 'bob@gmail.com' })
        .end(function (error, res, body) {
          if (error) {
            console.log('BIG ERROR');
            done(new Error('oh noes'));
          } else {
            console.log('YAHOO');
            expect(res.statusCode).to.equal(200);
            console.log(res.text);
            console.log(res.body);
            //console.log(req._data);
            done();
          }
        });
    });
  });
  describe('Privacy Route', function () {
    // assert what should be returned
    it('Privacy Policy', function (done) {
      var host = 'http://localhost:3001';
      var path = '/privacy';
      //var help = footer.test;
      // test that assertion
      chai
        .request(host)
        .get(path)
        //.field('myparam', 'test')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ myparam: 'test' })
        .end(function (error, res, body) {
          if (error) {
            console.log('BIG ERROR');
            done(new Error('oh noes'));
          } else {
            console.log('YAHOO');
            expect(res.statusCode).to.equal(200);
            // expect(res).to.have.property('text');
            // expect(res.text).to.equal('Privacy Policy!');
            //console.log(res);
            done();
          }
        });
    });
  });
});
