import { getData } from "./dataStore.js";
import { addToBasket } from "./basketLogic.js";

let listProducts = () => {
    let items = getData();

    let itemsContainer = document.getElementById("ItemsContainer");
    let itemTemplate = document.querySelector("#ItemTemplate").content;

    items.forEach(item => {
        let itemTemplateCopy = itemTemplate.cloneNode(true);
        itemTemplateCopy.querySelector(".item-name").textContent = item.name;
        itemTemplateCopy.querySelector(".item-description").textContent = item.description;
        itemTemplateCopy.querySelector(".item-image").setAttribute("src", item.image);
        itemTemplateCopy.querySelector(".item__button").addEventListener("click", () => {
            addToBasket(item.id);
        })
        itemsContainer.appendChild(itemTemplateCopy);
    });
}

export {listProducts};