const { TestScheduler } = require('@jest/core');
let { repeatMessage } = require('../source/index');

test("Description of test here", () => {
    expect("data to check is passed here").toBeTruthy();
});