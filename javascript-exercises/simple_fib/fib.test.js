var assert = require('assert');
var fib = require('./fib').fib;

describe('Fibonacci', function () {
    it('should return 0 for 0 iterations', function () {
        assert.equal(fib(0), 0);
    });
});
