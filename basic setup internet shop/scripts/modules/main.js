import { listProducts } from "./dataVizualizer.js";
import { initCount } from "./basketLogic.js";

document.addEventListener("DOMContentLoaded", () => {
    listProducts();
    initCount();
});

