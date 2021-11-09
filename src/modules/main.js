const dataVizualizer = require("./dataVizualizer.js");
const { initCount } = require("./basketLogic.js");
const { buildNav } = require( "./navHelper.js");

document.addEventListener("DOMContentLoaded", () => {
    dataVizualizer.listProducts();
    initCount();
    buildNav();
});