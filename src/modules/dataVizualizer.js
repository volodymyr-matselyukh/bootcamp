const { getData, deleteItem } = require("./postgreService"); //require("./dataStore.js");
const { addToBasket, getBasketItems, removeFromBasket } = require("./basketLogic.js");
const { getCurrentCategory } = require ("./sessionHelper.js");

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
        
        let addToBasketButton = itemTemplateCopy.querySelector(".button__add");
		let addedToBasketLabel = itemTemplateCopy.querySelector(".label");
        
		if(itemsInBasket.includes(item.id))
        {
            addToBasketButton.classList.toggle('hidden');
        }
		else{
			addedToBasketLabel.classList.toggle('hidden');

			addToBasketButton.addEventListener("click", (event) => {
				addToBasket(item.id);
				event.currentTarget.textContent = "Added";
				event.currentTarget.classList.toggle("hidden");
				addedToBasketLabel.classList.toggle('hidden');
			});
		}

		let deleteItemButton = itemTemplateCopy.querySelector('.button__delete');
		deleteItemButton.addEventListener("click", async () => {
			let confirmResult = confirm("Are you sure you want to delete this item?");
			if(confirmResult){
				try{
					await deleteItem(item.id);
					await listProducts();
					removeFromBasket(item.id);
				}
				catch(e){
					console.error('Error deleting product', e);
				}
			}
		});

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
    
	let itemTemplate = document.querySelector("#ItemTemplate");

	if(!itemTemplate)
	{
		return;
	}

    let itemTemplateContent = itemTemplate.content;

    items.forEach(item => {
        let itemTemplateCopy = itemTemplateContent.cloneNode(true);
        itemTemplateCopy.querySelector(".item__id").value = item.id;
		itemTemplateCopy.querySelector(".item-name").textContent = item.name;
        itemTemplateCopy.querySelector(".item-description").textContent = item.description;
        itemTemplateCopy.querySelector(".item-image").setAttribute("src", getImagePath(item.image));
		itemTemplateCopy.querySelector(".item__close-button").addEventListener("click", removeFromBasketOnUI);

        itemsContainer.appendChild(itemTemplateCopy);
    });
}

const getImagePath = imageName => `images/${imageName}`;

const removeFromBasketOnUI = async (event) => {

	const idInput = event.target.parentNode.querySelector('.item__id');

	if(idInput)
	{
		const id = parseInt(idInput.value);
		removeFromBasket(id);

		await listBasketProducts();
	}
}

module.exports = {listProducts, listBasketProducts};