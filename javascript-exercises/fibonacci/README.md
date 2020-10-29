# fibonacci
### Overview
In mathematics, the Fibonacci numbers or Fibonacci sequence are the numbers in the following integer sequence:

1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144...

The n<sup>th</sup> Fibonacci number is the sum of the (n-1)<sup>th</sup> Fibonacci number and the (n-2)<sup>th</sup> Fibonacci number.

### Instructions
#### Step One
Create a JavaScript function that calculates the n<sup>th</sup> Fibonacci number where n is passed in as an argument. 

Look here: **fibonacci/app/components/fibonacci-display.js**

#### Step Two
Create unit tests that verify your code works as expected.

Look here: **fibonacci/tests/unit/components/fibonacci-display-test.js**

#### Step Three
Consider other potential approaches for calculating Fibonacci numbers. Create at least one other implementation of your function. Explain what you think the costs and benefits of each approach are. 

#### Step Four
Come up with an approach for testing the performance of each of your implementations. Explain the performance results.

### Getting Started

#### Running the exercise
You will need npm, bower and phantomjs in order to start the exercise. First, install [Node.js](http://nodejs.org/). We can now install bower and phantomjs, install other dependencies and launch the ember application using the following commands:

```
$ npm install -g bower
$ npm install -g phantomjs
$ npm install
$ bower install
$ ember serve
```

The Fibonacci ember application is now running. Navigate to http://localhost:4200 to view a page showing results of a sample fibonacci function. Navigate to http://localhost:4200/tests to view tests.

#### Editing the code
To add an implementation of the fibonacci function, take a look at **fibonacci/app/components/fibonacci-display.js**. Add an implementation of the following function: 

```
    calculateFibonacciNumber: function (n) {
        return n;
    }
```
Refresh the application page to see if your implementation works. You can add tests using the **fibonacci/tests/unit/components/fibonacci-display-test.js** unit test file. There is a sample test you can start with.

#### Solution
Sample solutions are available here: **fibonacci/app/components/fibonacci-display-solution.js** and tests are available here: **fibonacci/tests/unit/components/fibonacci-display-solution-test.js**. The solution contains an implementation that uses recursion, an implementation using a loop, and an approximation function that calcuates the fibonacci number using a generating function. There are still some issues with the generating function implementation and its tests (commented out) currently show the differences between the looping solution and generating function solution. 

There are also additional computed property implementations that output timing to the console. To use an alternate computed property implementation, change the compnoent template found here: **fibonacci/app/templates/components/fibonacci-display-solution.hbs**.
