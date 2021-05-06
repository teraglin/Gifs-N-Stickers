const { TestScheduler } = require('@jest/core');
const { apiKey } = require('../source/keys')
let { repeatMessage } = require('../source/index');

test("API is true", () => {
    expect(apiKey).toBeTruthy();
});