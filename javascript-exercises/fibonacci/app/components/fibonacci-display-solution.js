import Ember from 'ember';

export default Ember.Component.extend({
    n: 0,

    result: function () {
        return this.getFibonacciNumberLoopImpl(this.get('n'));
    }.property('n'),

    getFibonacciNumberRecursiveImpl: function (n) {
        var result = 0;
        if (n === 1) {
            result = 1;
        } else if (n > 1) {
            result = this.getFibonacciNumberRecursiveImpl(n - 1) + this.getFibonacciNumberRecursiveImpl(n - 2);
        }
        return result;
    },

    getFibonacciNumberLoopImpl: function (n) {
        var result = 0;
        if (n === 1 || n === 2) {
            result = 1;
        } else if (n >= 3) {
            var f0 = 1;
            var f1 = 1;
            for (var i = 0; i < (n - 2); i++) {
                result = f0 + f1;
                f0 = f1;
                f1 = result;
            }
        }
        return result;
    },

    /**
     * As is obvious from the failing test, there's still a problem with the generating function. It's really more of an approximation, so maybe not worth
     * including. Interesting, nonetheless.
     * @param n
     * @returns {number}
     */
    getFibonacciGeneratingFunctionImpl: function (n) {
        var result = 0;

        var squareRootOfFive = Math.sqrt(5);
        var subEquationOne = Math.pow(((1 + squareRootOfFive) / 2), n);
        var subEquationTwo = Math.pow(((1 - squareRootOfFive) / 2), n);
        result = (1 / squareRootOfFive) * (subEquationOne - subEquationTwo);

        return Math.ceil(result);
    },

    loopResult: function () {
        var result = 0;
        var millisecondsPerSecond = 1000;
        var iterations = 1000;

        var startTimestamp = (new Date()).getTime();
        for (var i = 0; i < iterations; i++) {
            result = this.getFibonacciNumberLoopImpl(this.get('n'));
        }
        var endTimestamp = (new Date()).getTime();

        var averageTimeTaken = (endTimestamp - startTimestamp) / (millisecondsPerSecond * iterations);
        console.log(iterations + 'x f(' + this.get('n') + ') looped calculations took an average of ' + averageTimeTaken + ' seconds.');
        return result;
    }.property('n'),

    recursiveResult: function () {
        var result = 0;
        var millisecondsPerSecond = 1000;

        var startTimestamp = (new Date()).getTime();
        result = this.getFibonacciNumberRecursiveImpl(this.get('n'));
        var endTimestamp = (new Date()).getTime();

        var timeTaken = (endTimestamp - startTimestamp) / (millisecondsPerSecond);
        console.log('f(' + this.get('n') + ') recursive calculation took ' + timeTaken + ' seconds.');
        return result;
    }.property('n')

});
