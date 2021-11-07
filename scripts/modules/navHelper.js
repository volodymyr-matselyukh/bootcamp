import { getCategories } from "./dataStore.js";
import { setCurrentCategory } from "./sessionHelper.js";
import { listProducts } from "./dataVizualizer.js";

let buildNav = () => {
    let categories = getCategories();

    let pageNav = document.getElementById("PageNavigation");

    categories.forEach((category) => {
        let templateElement = document.createElement('template');
        templateElement.innerHTML = `<a class='nav__link' href='index.html'>${category.name}</a>`;

        let link = templateElement.content.firstChild;

        link.addEventListener("click", (event) => {
            //event.preventDefault();

            setCurrentCategory(category.id);
            listProducts();
        });

        pageNav.appendChild(link);
    });

    let templateElement = document.createElement('template');
    templateElement.innerHTML = '<a class="nav__link nav__link--add-new" href="addNewItem.html">Add new</a>';

    let link = templateElement.content;
    pageNav.appendChild(link);
}

export { buildNav }