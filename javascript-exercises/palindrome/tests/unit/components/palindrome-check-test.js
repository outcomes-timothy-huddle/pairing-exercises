import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('palindrome-check', 'components/palindrome-check-test.js', {
});

test('ENTER A HUMAN READABLE NAME FOR YOUR TEST', function () {
    var component = this.subject();

    equal(component.isPalindrome('TEST INPUT'), false);
});


