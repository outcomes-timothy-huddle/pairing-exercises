import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('fibonacci-display-solution', 'components/fibonacci-display-solution-test.js', {
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

test('test f(0) for recursive case', function () {
    var component = this.subject();
    this.append();

    equal(component.getFibonacciNumberRecursiveImpl(0), 0, 'f(0) = 0');
});

test('test f(25) for recursive case', function () {
    var component = this.subject();
    this.append();

    var result = component.getFibonacciNumberRecursiveImpl(25);
    equal(result, 75025, 'f(25) provides expected output');
});

test('test f(35) for recursive case', function () {
    var component = this.subject();
    this.append();

    var result = component.getFibonacciNumberRecursiveImpl(35);
    equal(result, 9227465, 'f(35) provides expected output');
});

test('test f(0) for loop case', function () {
    var component = this.subject();
    this.append();

    equal(component.getFibonacciNumberLoopImpl(0), 0, 'f(0) = 0');
});

test('test f(25) for loop case', function () {
    var component = this.subject();
    this.append();

    var result = component.getFibonacciNumberLoopImpl(25);
    equal(result, 75025, 'f(25) provides expected output');
});

test('test f(35) for loop case', function () {
    var component = this.subject();
    this.append();

    var result = component.getFibonacciNumberLoopImpl(35);
    equal(result, 9227465, 'f(35) provides expected output');
});

test('test f(1000) for loop case', function () {
    var component = this.subject();
    this.append();

    var result = component.getFibonacciNumberLoopImpl(1000);
    equal(result, 4.346655768693743e+208, 'f(1000) provides expected output');
});

test('test f(0) for generating function case', function () {
    var component = this.subject();
    this.append();

    equal(component.getFibonacciGeneratingFunctionImpl(0), 0, 'f(0) = 0');
});

test('test f(25) for generating function case', function () {
    var component = this.subject();
    this.append();

    var result = component.getFibonacciGeneratingFunctionImpl(25);
    equal(result, 75025, 'f(25) provides expected output');
});

test('test f(35) for generating function case', function () {
    var component = this.subject();
    this.append();

    var result = component.getFibonacciGeneratingFunctionImpl(35);
    equal(result, 9227465, 'f(35) provides expected output');
});

// TODO: this test fails and will continue to until the generating function IMPL is fixed.
//test('test f(1000) for generating function case', function () {
//    var component = this.subject();
//    this.append();
//
//    for (var i = 0; i < 100; i++) {
//        equal(component.getFibonacciGeneratingFunctionImpl(i), component.getFibonacciNumberLoopImpl(i), 'f(' + i + ') provides expected output');
//    }
//});