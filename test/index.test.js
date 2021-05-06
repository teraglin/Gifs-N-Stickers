import { apiKey } from '../source/keys'
// import { repeatMessage } from '../source/index'

test("API is true", () => {
    expect(apiKey).toBeTruthy();
});