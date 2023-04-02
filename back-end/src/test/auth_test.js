// use mocha's built-in assertion library
const assert = require('assert');
const auth = require('../../routes/auth');

// a set of tests of array functions
describe('Auth', function () {
  // one particular unit test
  describe('someMethod()', function () {
    // assert what should be returned
    it('sussy', function () {
      // test that assertion
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});
