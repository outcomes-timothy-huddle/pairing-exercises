import Ember from 'ember';

export default Ember.Component.extend({
    n: 0,

    result: function () {
        return this.calculateFibonacciNumber(this.get('n'));
    }.property('n'),

    calculateFibonacciNumber: function (n) {
        return n;
    }

});
