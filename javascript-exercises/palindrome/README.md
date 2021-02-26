# palindrome
### Overview
A palindrome is a word, phrase, number, or other sequence of characters which reads the same backward or forward. Allowances may be made for adjustments to capital letters, punctuation, and word dividers. Famous examples include "A man, a plan, a canal, Panama!", "Amor, Roma", "race car", "taco cat", and "No 'x' in Nixon".

### Instructions
#### Step One
Create a JavaScript function that returns true if the input parameter is considered a palindrome.

Look here: **palindrome/app/components/palindrome-check.js**

#### Step Two
Create unit tests that verify your code works as expected.

Look here: **palindrome/tests/unit/components/palindrome-check-test.js**

#### Step Three
Update your JavaScript function to be more flexible when evaluating whether a phrase is a palindrome. Ignore special characters, case, and whitespaces when evaluating the input phrase. Only consider alphanumeric characters when evaluating the input.

#### Step Four
Come up with an alternative approach finding whether a string is a palindrome. Take performance into consideration when choosing an implementation.

### Getting Started

#### Running the exercise
You will need npm, bower and phantomjs in order to start the exercise. First, install [Node.js](http://nodejs.org/). We can now install bower and phantomjs, install other dependencies and launch the ember application using the following commands:

```
$ npm install -g bower
$ npm install -g phantomjs
$ npm install
$ bower install
$ npm start
```

The Palindrome ember application is now running. Navigate to http://localhost:4200 to view a page showing results of a sample palindrome function. Navigate to http://localhost:4200/tests to view tests.

#### Editing the code
To add an implementation of the palindrome function, take a look at **palindrome/app/components/palindrome-check.js**. Add an implementation of the following function:

```
    isPalindrome: function (phrase) {
        return false;
    }
```
Refresh the application page to see if your implementation works. You can add tests using the **palindrome/tests/unit/components/palindrome-check-test.js** unit test file. There is a sample test you can start with.

#### Solution
Sample solutions are available here: **palindrome/app/components/palindrome-check-solution.js** and tests are available here: **palindrome/tests/unit/components/palindrome-check-solution-test.js**. The solution contains an implementation that uses simple string reversal, a looping algorithm, and a recursive solution. A string normalization function is included that is implemented using a regular expression.
