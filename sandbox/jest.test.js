// GAS envirionment for Node
const gasLocal = require("gas-local");

// Load all google app scripts
const gas = gasLocal.require("./gasp");

// Sandbox test
gas.jestSandbox();

test.skip("hello jest", () => console.log("Hello Jest"));

test.skip("jest calls GAS", () => expect(gas.jestSandbox()).toBe("jest"));
