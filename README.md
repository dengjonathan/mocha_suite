This is a simple batteries-included testing setup for unit tests in javascript- no node or outside dependencies required!.

Any libraries you need can be install with bower with the following command (Make sure you have bower installed):
$`bower install [library]`

## What batteries does this include?
This repo comes with the below packages pre-installed:
* chai: TDD/BDD testing
* mocha: TDD/BDD testing
* underscore: utility functions

## How I uses this?
<img src="assets/cat.gif"></img>

To use this framework for testing:

1. put all source files in the test/src directory
2. put all tests in the test/spec directory
3. update test/index.html with:
    * any libraries you installed with bower
    * any source files you added
    * any spec files you added.
4. $`open index.html` and enjoy Red-Green-Refactoring!

I've included a simple hashtable implementation with tests as an example of how this works.