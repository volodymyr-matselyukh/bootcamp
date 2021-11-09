/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "listProducts": () => (/* binding */ listProducts),
/* harmony export */   "listBasketProducts": () => (/* binding */ listBasketProducts)
/* harmony export */ });
/* harmony import */ var _dataStore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _basketLogic_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _sessionHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);




let listProducts = () => {
    let itemsInBasket = (0,_basketLogic_js__WEBPACK_IMPORTED_MODULE_1__.getBasketItems)();

    let categoryId = (0,_sessionHelper_js__WEBPACK_IMPORTED_MODULE_2__.getCurrentCategory)();
    
    let items = (0,_dataStore_js__WEBPACK_IMPORTED_MODULE_0__.getData)().filter(item => item.categoryId === categoryId);
    
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
        itemTemplateCopy.querySelector(".item-image").setAttribute("src", item.image);
        
        let addToBasketButton = itemTemplateCopy.querySelector(".item__button");
        
        addToBasketButton.addEventListener("click", (event) => {
            (0,_basketLogic_js__WEBPACK_IMPORTED_MODULE_1__.addToBasket)(item.id);
            event.currentTarget.textContent = "Added";
            event.currentTarget.classList.remove("item__button--primary");
            event.currentTarget.classList.add("item__button--added");
        });

        if(itemsInBasket.includes(item.id))
        {
            addToBasketButton.textContent = "Added";
            addToBasketButton.classList.remove("item__button--primary");
            addToBasketButton.classList.add("item__button--added");
        }

        itemsContainer.appendChild(itemTemplateCopy);
    });
}

let listBasketProducts = () => {
    let itemsInBasket = (0,_basketLogic_js__WEBPACK_IMPORTED_MODULE_1__.getBasketItems)();
    
    let items = (0,_dataStore_js__WEBPACK_IMPORTED_MODULE_0__.getData)().filter(item => itemsInBasket.includes(item.id));
    
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
        itemTemplateCopy.querySelector(".item-image").setAttribute("src", item.image);

        itemsContainer.appendChild(itemTemplateCopy);
    });
}



/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "addNewItem": () => (/* binding */ addNewItem),
/* harmony export */   "getCategories": () => (/* binding */ getCategories),
/* harmony export */   "getNextProductId": () => (/* binding */ getNextProductId)
/* harmony export */ });
const data = [
    {
        id: 1,
        name: "Samsung galaxy",
        categoryId: 2,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, atque necessitatibus. Sint voluptates totam sit debitis! Debitis sequi quaerat dolorem excepturi cumque odit ipsam at.",
        image: "images/img1.jpg"
    },
    {
        id: 2,
        name: "Apple Iphone",
        categoryId: 2,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        image: "images/img1.jpg"
    },
    {
        id: 3,
        name: "Samsung a1",
        categoryId: 2,
        description: "Lorem ipsum dolor sit amet",
        image: "images/img1.jpg"
    },
    {
        id: 4,
        name: "Xiaomi Redmi Note 7",
        categoryId: 2,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, atque",
        image: "images/img1.jpg"
    },
    {
        id: 5,
        name: "Xiaomi Redmi Note 8",
        categoryId: 2,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, atque necessitatibus. Sint voluptates",
        image: "images/img1.jpg"
    },
    {
        id: 6,
        name: "Meizu",
        categoryId: 2,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing ",
        image: "images/img1.jpg"
    },
    {
        id: 7,
        name: "Sony",
        categoryId: 2,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, atque necessitatibus. Sint voluptates totam sit debitis",
        image: "images/img1.jpg"
    },
    {
        id: 8,
        name: "Siemens",
        categoryId: 2,
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, atque necessitatibus. Sint voluptates totam sit debitis! Debitis sequi",
        image: "images/img1.jpg"
    },
    {
        id: 9,
        name: "Nokia 3310",
        categoryId: 2,
        description: "Lorem ipsum dolor sit amet, consectetur ",
        image: "images/img1.jpg"
    }
];

const itemsKey = "ItemsKey";

let getData = () => {

    let localStorageData = localStorage.getItem(itemsKey);

    if(!localStorageData)
    {
        localStorage.setItem(itemsKey, JSON.stringify(data));
    }

    localStorageData = JSON.parse(localStorage.getItem(itemsKey));

    return localStorageData;
}

let addNewItem = (newItem) => {
    let dataArray = getData();

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



/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initCount": () => (/* binding */ initCount),
/* harmony export */   "addToBasket": () => (/* binding */ addToBasket),
/* harmony export */   "getBasketItems": () => (/* binding */ getBasketItems)
/* harmony export */ });
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


// module.exports = { initCount, addToBasket, getBasketItems }

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setCurrentCategory": () => (/* binding */ setCurrentCategory),
/* harmony export */   "getCurrentCategory": () => (/* binding */ getCurrentCategory)
/* harmony export */ });
const SelectedCategoryIdKey = "selectedCategoryIdKey";

let setCurrentCategory = (categoryId) => {
    sessionStorage.setItem(SelectedCategoryIdKey, categoryId);
}

let getCurrentCategory = () => {
    let currentCategory = sessionStorage.getItem(SelectedCategoryIdKey);
    return Number.parseInt(currentCategory);
}



/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildNav": () => (/* binding */ buildNav)
/* harmony export */ });
/* harmony import */ var _dataStore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _sessionHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _dataVizualizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);




let buildNav = () => {
    let categories = (0,_dataStore_js__WEBPACK_IMPORTED_MODULE_0__.getCategories)();

    let pageNav = document.getElementById("PageNavigation");

    categories.forEach((category) => {
        let templateElement = document.createElement('template');
        templateElement.innerHTML = `<a class='nav__link' href='index.html'>${category.name}</a>`;

        let link = templateElement.content.firstChild;

        link.addEventListener("click", (event) => {
            //event.preventDefault();

            (0,_sessionHelper_js__WEBPACK_IMPORTED_MODULE_1__.setCurrentCategory)(category.id);
            (0,_dataVizualizer_js__WEBPACK_IMPORTED_MODULE_2__.listProducts)();
        });

        pageNav.appendChild(link);
    });

    let templateElement = document.createElement('template');
    templateElement.innerHTML = '<a class="nav__link nav__link--add-new" href="addNewItem.html">Add new</a>';

    let link = templateElement.content;
    pageNav.appendChild(link);
}



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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dataVizualizer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _basketLogic_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _navHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);




document.addEventListener("DOMContentLoaded", () => {
    (0,_dataVizualizer_js__WEBPACK_IMPORTED_MODULE_0__.listProducts)();
    (0,_basketLogic_js__WEBPACK_IMPORTED_MODULE_1__.initCount)();
    (0,_navHelper_js__WEBPACK_IMPORTED_MODULE_2__.buildNav)();
});
})();

/******/ })()
;