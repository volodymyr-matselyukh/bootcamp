const { initCount } = require("./basketLogic.js");
const { buildNav } = require("./navHelper.js");
const { addNewItem } = require("./postgreService"); //require("./dataStore.js");

document.addEventListener("DOMContentLoaded", async () => {
    initCount();
    buildNav();
    await initFormSubmitHandler();
});

const initFormSubmitHandler = () => {
    document.forms["AddNewProductForm"].addEventListener("submit", async function(event) {
        let form = event.currentTarget;
        const formData  = new FormData(form);

        for(var pair of formData.entries()) {
            if(pair[0] !== "Image") {
                formData.set(pair[0], pair[1].trim());
            }
        }

        await addNewItem(formData);

        form.reset();
    });
}