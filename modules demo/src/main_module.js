import {testWrite} from "./console_writer.js";

testWrite("first module");

const testFunction = () => {
	console.log("test function");
}

document.addEventListener("DOMContentLoaded", () => {
	console.log("perform actions after DOM is loaded");
});


globalThis.testFunction = testFunction;