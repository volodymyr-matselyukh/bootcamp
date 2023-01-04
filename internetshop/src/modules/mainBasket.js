const dataVizualizer = require("./dataVizualizer.js");
const { buildNav } = require("./navHelper.js");
const { initCount } = require("./basketLogic");

document.addEventListener("DOMContentLoaded", () => {
    initCount();
    dataVizualizer.listBasketProducts();
    buildNav();
});