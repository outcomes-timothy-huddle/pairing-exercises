import Ember from 'ember';

export default Ember.Component.extend({
    phrase: null,

    // this is just some Ember-specific code
    result: function () {
        return this.isPalindrome(this.get('phrase'));
    }.property('phrase'),

    // let's implement this function
    isPalindrome: function (phrase) {
        return false;
    }
});
