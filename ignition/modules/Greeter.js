const {buildModule} = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("GreeterModule", (m) => {
    const greeting = m.getParameter("greeting", "Hello, world!");

    const greeter = m.contract("Greeter", [greeting]);

    return {greeter};
});
