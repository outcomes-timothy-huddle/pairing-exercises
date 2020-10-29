import Ember from 'ember';

export default Ember.Component.extend({
    phrase: null,

    result: function () {
        return this.isPalindrome(this.get('phrase'));
    }.property('phrase'),

    isPalindrome: function (phrase) {
        var normalizedPhrase = this.preparePhraseForPalindromeCheck(phrase);
        return this.isPalindromeCheckReverseImpl(normalizedPhrase);
    },

    isPalindromeCheckReverseImpl: function (phrase) {
        var result = false;
        if (!!phrase) {
            var reverse = phrase.split('').reverse().join('');
            if (phrase === reverse) {
                result = true;
            }
        }
        return result;
    },

    isPalindromeCheckLoopImpl: function (phrase) {
        var result = false;
        if (!!phrase) {
            result = true;
            for (var i = 0; i < (Math.ceil(phrase.length / 2)); i++) {
                if (phrase.charAt(i) !== phrase.charAt(phrase.length - i - 1)) {
                    result = false;
                }
            }
        }
        return result;
    },

    isPalindromeCheckRecursiveImpl: function (phrase) {
        var result = false;
        if (!!phrase) {
            if (phrase.length <= 1) {
                result = true;
            } else {
                var firstCharacter = phrase.charAt(0);
                var lastCharacter = phrase.charAt(phrase.length - 1);
                var subPhrase = phrase.substring(1, phrase.length - 1);
                result = (firstCharacter === lastCharacter && this.isPalindromeCheckRecursiveImpl(subPhrase));
            }
        }
        return result;
    },

    preparePhraseForPalindromeCheck: function (phrase) {
        var result = phrase;
        if (!!phrase) {
            result = phrase.toLowerCase();
            result = this.removeNonAlphaNumericCharacters(result);
        }
        return result;
    },

    removeNonAlphaNumericCharacters: function (phrase) {
        var result = phrase;
        if (!!phrase) {
            result = phrase.replace(/[^a-zA-Z0-9]/g, '');
        }
        return result;
    }


});
