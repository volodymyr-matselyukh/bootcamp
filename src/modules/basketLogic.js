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