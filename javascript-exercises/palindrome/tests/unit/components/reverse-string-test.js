import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('reverse-string', 'components/reverse-string-test.js', {
});

test('ENTER A HUMAN READABLE NAME FOR YOUR TEST', function () {
    var component = this.subject();

    equal(component.reverseString('TEST INPUT'), 'EXPECTED TEST OUTPUT');
});




