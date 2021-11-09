const dataVizualizer = require("./dataVizualizer.js");
const { buildNav } = require("./navHelper.js");

document.addEventListener("DOMContentLoaded", () => {
    dataVizualizer.listBasketProducts();
    buildNav();
});