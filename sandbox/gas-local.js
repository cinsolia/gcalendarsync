// GAS envirionment for Node
const gasLocal = require("gas-local")
//console.log(gasLocal)

// Load all google app scripts
const gas = gasLocal.require("./gasp")
//console.log(gcalSyn)
console.log(gas.reformatEvent)
// [Function: reformatEvent]

// Sandbox test
gas.helloSandbox("one", "two", "three")
// Hello GASP Sandbox
// [Arguments] { '0': 'one', '1': 'two', '2': 'three' }

console.log("Hello gas-local.  You loaded my google app scripts!")
