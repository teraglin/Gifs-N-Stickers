import { apiKey } from '../source/keys'
// import { repeatMessage } from '../source/index'

test("API is true", () => {
    expect(apiKey).toBeTruthy();
});

test("API is API key", () => {
    expect(apiKey).toBe("&api_key=JmE2acrnUQEHtsxRr3mlqvN33cpM5Qm8");
});