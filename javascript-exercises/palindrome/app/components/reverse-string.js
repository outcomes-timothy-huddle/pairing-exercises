import Ember from 'ember';

export default Ember.Component.extend({
    phrase: null,

    // this is just some Ember-specific code that can be ignored
    result: function () {
        return this.reverseString(this.get('phrase'));
    }.property('phrase'),


    // let's implement this function
    reverseString: function (input) {
        return input;
    }
});
