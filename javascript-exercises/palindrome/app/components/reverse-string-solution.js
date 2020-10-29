import Ember from 'ember';

export default Ember.Component.extend({
    phrase: null,

    // this is just some Ember-specific code that can be ignored
    result: function () {
        return this.reverseString(this.get('phrase'));
    }.property('phrase'),


    // let's implement this function
    reverseString: function (input) {
        return this.reverseStringBuiltInSolution(input);
    },

    // built-in JavaScript solution
    reverseStringBuiltInSolution: function (input) {
        var splitStringInput = input.split('');
        var reverseArray = splitStringInput.reverse();
        var result = reverseArray.join('');
        return result;
    },

    // for loop solution
    reverseStringForLoopSolution: function (input) {
        var result = '';
        for (var i = input.length - 1; i >= 0; i--) {
            result += input.charAt(i);
        }
        return result;
    },

    // recursive solution
    reverseStringRecursiveSolution: function (input) {
        var result = '';
        if (input != '') {
            var leadingCharacter = input.charAt(0);
            var remainingString = this.reverseStringRecursiveSolution(input.substring(1));
            result = remainingString + leadingCharacter;
        }
        return result;
    }
});
