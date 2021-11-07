import { listProducts } from "./dataVizualizer.js";
import { initCount } from "./basketLogic.js";
import { buildNav } from "./navHelper.js";

document.addEventListener("DOMContentLoaded", () => {
    listProducts();
    initCount();
    buildNav();
});