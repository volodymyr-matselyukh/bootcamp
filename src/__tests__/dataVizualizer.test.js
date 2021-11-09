/**
 * @jest-environment jsdom
 */

const { getBasketItems } = require("../modules/basketLogic");
const { getData } = require("../modules/dataStore");
const { listBasketProducts } = require("../modules/dataVizualizer.js");

jest.mock("../modules/basketLogic");
jest.mock("../modules/dataStore");

document.body.innerHTML = `
    <div id="ItemsContainer">
        <template id="ItemTemplate">
            <div class="item">
                <span class="item-name"></span>
                <span class="item-description"></div>
                <img class="item-image">
            </div>
        </template>
    </div>
`;

describe("DataVizualizer listBasketProducts", () => {
    test("should return some values", () => {
        //Arrange
        getBasketItems.mockImplementation(_ =>
            [1, 2]
        );
    
        getData.mockImplementation(_ =>
            [{
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
            }]
        );    

        //Act
        listBasketProducts();
        
        //Assert
        let newItems = document.getElementsByClassName("item").length;
        expect(newItems).toEqual(2);
    });

    test("should return nothing", () => {
        //Arrange
        getBasketItems.mockImplementation(_ =>
            []
        );
    
        getData.mockImplementation(_ =>
            [{
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
            }]
        );    

        //Act
        listBasketProducts();
        
        //Assert
        let newItems = document.getElementsByClassName("item").length;
        expect(newItems).toEqual(0);
    });
});
