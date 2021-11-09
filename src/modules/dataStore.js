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

module.exports = { getData, addNewItem, getCategories, getNextProductId };