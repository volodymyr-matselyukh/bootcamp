/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { getData } = __webpack_require__(2); //require("./dataStore.js");
const { addToBasket, getBasketItems } = __webpack_require__(3);
const { getCurrentCategory } = __webpack_require__ (4);

let listProducts = async () => {
    let itemsInBasket = getBasketItems();

    let categoryId = getCurrentCategory();
    
    let data = await getData();
    let items = categoryId === 0 ? data : data.filter(item => item.categoryid === categoryId);
    
    let itemsContainer = document.getElementById("ItemsContainer");
    let children = itemsContainer.querySelectorAll('.item') || [];
    for(let i = 0 ; i < children.length; i ++){
        itemsContainer.removeChild(children[i]);
    }
    
    let itemTemplate = document.querySelector("#ItemTemplate").content;

    items.forEach(item => {
        let itemTemplateCopy = itemTemplate.cloneNode(true);
        itemTemplateCopy.querySelector(".item-name").textContent = item.name;
        itemTemplateCopy.querySelector(".item-description").textContent = item.description;
        itemTemplateCopy.querySelector(".item-image").setAttribute("src", getImagePath(item.image));
        
        let addToBasketButton = itemTemplateCopy.querySelector(".button");
        
        addToBasketButton.addEventListener("click", (event) => {
            addToBasket(item.id);
            event.currentTarget.textContent = "Added";
            event.currentTarget.classList.remove("button--primary");
            event.currentTarget.classList.add("button--added");
        });

        if(itemsInBasket.includes(item.id))
        {
            addToBasketButton.textContent = "Added";
            addToBasketButton.classList.remove("button--primary");
            addToBasketButton.classList.add("button--added");
        }

        itemsContainer.appendChild(itemTemplateCopy);
    });
}

let listBasketProducts = async () => {
    let itemsInBasket = getBasketItems();
    
    let data = await getData()
    let items = data.filter(item => itemsInBasket.includes(item.id));
    
    let itemsContainer = document.getElementById("ItemsContainer");
    let children = itemsContainer.querySelectorAll('.item') || [];
    for(let i = 0 ; i < children.length; i ++){
        itemsContainer.removeChild(children[i]);
    }
    
    let itemTemplate = document.querySelector("#ItemTemplate").content;

    items.forEach(item => {
        let itemTemplateCopy = itemTemplate.cloneNode(true);
        itemTemplateCopy.querySelector(".item-name").textContent = item.name;
        itemTemplateCopy.querySelector(".item-description").textContent = item.description;
        itemTemplateCopy.querySelector(".item-image").setAttribute("src", getImagePath(item.image));

        itemsContainer.appendChild(itemTemplateCopy);
    });
}

const getImagePath = imageName => `images/${imageName}`;

module.exports = {listProducts, listBasketProducts};

/***/ }),
/* 2 */
/***/ ((module) => {

const serverAddress = "http://localhost:3000";

const getData = async () => {
    const response = await fetch(`${serverAddress}/items`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      try{
        let jsonString = await response.json();
        return jsonString;
      }
      catch(e)
      {
        console.error("fetch failed", e);
        throw e;
      }
}

const addNewItem = async (formData) => {
    const response = await fetch(`${serverAddress}/items`, {
        method: 'POST',
        body: formData
      });

      return await response.json();
}

module.exports = { getData, addNewItem }



/***/ }),
/* 3 */
/***/ ((module) => {

const basketItemsIdsListKey = "basketItemsIdsListKey";

let initCount = () => {
    let basketItems = getBasketItems();
    setBasketItemsCounter(basketItems.length);
}

let setBasketItemsCounter = (count) => {
    let basket = document.getElementById("BasketElement");
    basket.setAttribute("data-items-count", count);
}

let addToBasket = (itemId) => {
    let basketItems = getBasketItems();
    if(!basketItems.includes(itemId))
    {
        basketItems.push(itemId);
        saveBasketItems(basketItems);
        setBasketItemsCounter(basketItems.length);
    }
}

let getBasketItems = () => {
    let basketItems = JSON.parse(localStorage.getItem(basketItemsIdsListKey)) || [];
    return basketItems;
}

let saveBasketItems = (items) => {
    localStorage.setItem(basketItemsIdsListKey, JSON.stringify(items));
}

module.exports = { initCount, addToBasket, getBasketItems }

/***/ }),
/* 4 */
/***/ ((module) => {

const SelectedCategoryIdKey = "selectedCategoryIdKey";

let setCurrentCategory = (categoryId) => {
    sessionStorage.setItem(SelectedCategoryIdKey, categoryId);
}

let getCurrentCategory = () => {
    let currentCategory = sessionStorage.getItem(SelectedCategoryIdKey);
    return Number.parseInt(currentCategory);
}

module.exports = { setCurrentCategory, getCurrentCategory }

/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { getCategories } = __webpack_require__(6);
const { setCurrentCategory } = __webpack_require__(4);
const dataVizualizer = __webpack_require__(1);

let buildNav = () => {
    let categories = getCategories();
    categories.unshift({
        id: 0,
        name: "All"
    });

    let pageNav = document.getElementById("PageNavigation");

    categories.forEach((category) => {
        let templateElement = document.createElement('template');
        templateElement.innerHTML = `<a class='nav__link' href='index.html'>${category.name}</a>`;

        let link = templateElement.content.firstChild;

        link.addEventListener("click", (event) => {
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

/***/ }),
/* 6 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { Product } = __webpack_require__(7);

const data = [
    new Product(
        id = 1,
        name = "Samsung galaxy",
        categoryId = 2,
        description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, atque necessitatibus. Sint voluptates totam sit debitis! Debitis sequi quaerat dolorem excepturi cumque odit ipsam at.",
        image = "images/img1.jpg"
    ),
    new Product(
        id = 2,
        name = "Apple Iphone",
        categoryId = 2,
        description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        image = "images/img1.jpg"
    ),
    new Product(
        id = 3,
        name = "Samsung a1",
        categoryId = 2,
        description = "Lorem ipsum dolor sit amet",
        image = "images/img1.jpg"
    ),
    new Product(
        id = 4,
        name = "Xiaomi Redmi Note 7",
        categoryId = 2,
        description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, atque",
        image = "images/img1.jpg"
    ),
    new Product(
        id = 5,
        name = "Xiaomi Redmi Note 8",
        categoryId = 2,
        description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, atque necessitatibus. Sint voluptates",
        image = "images/img1.jpg"
    ),
    new Product(
        id = 6,
        name = "Meizu",
        categoryId = 2,
        description = "Lorem ipsum dolor sit amet, consectetur adipisicing ",
        image = "images/img1.jpg"
    ),
    new Product(
        id = 7,
        name = "Sony",
        categoryId = 2,
        description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, atque necessitatibus. Sint voluptates totam sit debitis",
        image = "images/img1.jpg"
    ),
    new Product(
        id = 8,
        name = "Siemens",
        categoryId = 2,
        description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, atque necessitatibus. Sint voluptates totam sit debitis! Debitis sequi",
        image = "images/img1.jpg"
    ),
    new Product(
        id = 9,
        name = "Nokia 3310",
        categoryId = 2,
        description = "Lorem ipsum dolor sit amet, consectetur ",
        image = "images/img1.jpg"
    )
];

const mydata = [
    {
        id: 1,
        name:"iphone"
    },
    {
        id: 2,
        name:"samsung"
    }
];

const itemsKey = "ItemsKey";

let getData = () => {

    let localStorageData = localStorage.getItem(itemsKey);

    if (!localStorageData) {
        localStorage.setItem(itemsKey, JSON.stringify(data));
    }

    localStorageData = JSON.parse(localStorage.getItem(itemsKey));

    return localStorageData;
}

let addNewItem = (newItem) => {
    let dataArray = getData();

    if(newItem.id === 0)
    {
        newItem.id = getNextProductId()
    }

    dataArray.push(newItem);

    localStorage.setItem(itemsKey, JSON.stringify(dataArray));
}

let getCategories = () => {
    return [{
        id: 1,
        name: "Watches"
    },
    {
        id: 2,
        name: "Mobile phones"
    },
    {
        id: 3,
        name: "Audio"
    },
    {
        id: 4,
        name: "Game gadgets"
    }];
}

let getNextProductId = () => {
    let maxId = Math.max(...getData().map(data => data.id));

    return maxId + 1;
}

module.exports = { getData, addNewItem, getCategories, getNextProductId };

/***/ }),
/* 7 */
/***/ ((module) => {

class Product{
    constructor(_id = 0, _name = "", _categoryId = 0, _description = "", _image = ""){
        this.id = _id;
        this.name = _name;
        this.categoryid = _categoryId;
        this.description = _description;
        this.image = _image;
    }
}

module.exports = { Product } 

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const dataVizualizer = __webpack_require__(1);
const { initCount } = __webpack_require__(3);
const { buildNav } = __webpack_require__( 5);

document.addEventListener("DOMContentLoaded", () => {
    dataVizualizer.listProducts();
    initCount();
    buildNav();
});
})();

/******/ })()
;
//# sourceMappingURL=main.js.map