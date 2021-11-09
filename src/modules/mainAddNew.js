const { initCount } = require("./basketLogic.js");
const { buildNav } = require("./navHelper.js");
const { getNextProductId, addNewItem } = require("./dataStore.js");

document.addEventListener("DOMContentLoaded", () => {
    initCount();
    buildNav();
    initFormSubmitHandler();
});

let initFormSubmitHandler = () => {
    document.forms["AddNewProductForm"].addEventListener("submit", (event) => {
        let form = event.currentTarget;

        let newProduct = {
            id: getNextProductId(),
            name: form["Name"].value.trim(),
            description: form["Description"].value.trim(),
            image: "images/" + form["Image"].value.replace(/^.*[\\\/]/, ''),
            categoryId: Number.parseInt(form["Category"].value)
        };

        addNewItem(newProduct);

        form.reset();
    });
}