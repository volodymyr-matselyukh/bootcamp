//'use strict';

import { getBasketItems } from "../modules/basketLogic";
import { getData } from "../modules/dataStore";
import { listBasketProducts } from "../modules/dataVizualizer.js";

jest.mock("../modules/basketLogic");
jest.mock("../modules/dataStore");

describe("DataVizualizer listBasketProducts", () => {

    getBasketItems().mockImplementation(cb =>
        cb([1, 2])
    );

    getData().mockImplementation(cb =>
        cb([{
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
        }])
    );

    document.body.innerHTML = `
    <div id="ItemsContainer">
        <template>
            <span class="item-name"></span>
            <span class="item-description"></div>
            <img class="item-image">
        </template>
    </div>
    `;

    test("should return some values", () => {
        listBasketProducts();
        
    });
});
