import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('fibonacci-display', 'components/fibonacci-display-test.js', {
});

test('it renders', function () {
    expect(2);

    // creates the component instance
    var component = this.subject();
    equal(component._state, 'preRender');

    // appends the component to the page
    this.append();
    equal(component._state, 'inDOM');
});

test('sample test', function () {
    expect(0);

    var component = this.subject();
    this.append();

    // TODO: implement something here to test. here is an example showing how to call a function in a component:
    // component.calculateFibonacciNumber(0);
});


