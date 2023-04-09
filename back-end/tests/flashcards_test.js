// use mocha's built-in assertion library
const app = require('../server');
const assert = require('assert');
const flashcards = require('../routes/flashcards');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should;
const request = require('supertest');

describe('Flashcards', function () {
  it('it should POST images to the server', function (done) {
    const host = 'http://localhost:3001';
    const path = '/image-upload';
    const my_files = ['file_1', 'file_2', 'file_3'];

    request(app)
      .post(path)
      .send({ files: my_files })
      .end(function (err, res) {
        expect(res.body.status).to.equal('all good');
        expect(res.body.message).to.equal('yup, the files were uploaded!!!');
        for (let i = 0; i < my_files.length; i++) {
          expect(res.body.files[i]).to.equal(my_files[i]);
        }

        if (err) {
          console.log('Image Post failed');
        }
        done(err);
      });
  });
});
