const { getCategories } = require("./dataStore.js");
const { setCurrentCategory } = require("./sessionHelper.js");
const dataVizualizer = require("./dataVizualizer.js");

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
            dataVizualizer.listProducts();
        });

        pageNav.appendChild(link);
    });

    let templateElement = document.createElement('template');
    templateElement.innerHTML = '<a class="nav__link nav__link--add-new" href="addNewItem.html">Add new</a>';

    let link = templateElement.content;
    pageNav.appendChild(link);
}

module.exports = { buildNav }