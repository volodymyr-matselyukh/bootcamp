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
	if (!basketItems.includes(itemId)) {
		basketItems.push(itemId);
		saveBasketItems(basketItems);
	}
}

let removeFromBasket = (itemId) => {
	let basketItems = getBasketItems();

	basketItems = basketItems.filter(item => item.itemId !== itemId);
	saveBasketItems(basketItems);
}

let getBasketItems = () => {
	let basketItems = JSON.parse(localStorage.getItem(basketItemsIdsListKey)) || [];
	return basketItems;
}

let saveBasketItems = (items) => {
	localStorage.setItem(basketItemsIdsListKey, JSON.stringify(items));
	setBasketItemsCounter(items.length);
}

module.exports = {
	initCount, 
	addToBasket, 
	getBasketItems,
	removeFromBasket
}