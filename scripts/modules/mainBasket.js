import { listBasketProducts } from "./dataVizualizer.js";
import { buildNav } from "./navHelper.js";

document.addEventListener("DOMContentLoaded", () => {
    listBasketProducts();
    buildNav();
});