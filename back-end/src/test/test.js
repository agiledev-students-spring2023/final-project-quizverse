// use mocha's built-in assertion library
const assert = require('assert');

// a set of tests of array functions
describe('Array', function () {
  // one particular unit test
  describe('#indexOf()', function () {
    // assert what should be returned
    it('should return -1 when the value is not presentkzfbfvajsdhdfosahdfkhasdoku', function () {
      // test that assertion
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});