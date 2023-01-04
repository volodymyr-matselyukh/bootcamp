/**
 * @jest-environment jsdom
 */

const { Product } = require("../models/Product");
const { getBasketItems } = require("../modules/basketLogic");
const { getData } = require("../modules/postgreService");
const { listBasketProducts } = require("../modules/dataVizualizer.js");

jest.mock("../modules/basketLogic");
jest.mock("../modules/postgreService");

describe("DataVizualizer listBasketProducts", () => {

    beforeEach(() => {
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
    });

    test("should return some values", async () => {
        //Arrange
        getBasketItems.mockImplementation(_ =>
            [1, 2]
        );
    
        getData.mockImplementation(_ => 
            [new Product(
                id = 1,
                name = "Samsung galaxy",
                categoryId = 2,
                description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, atque necessitatibus. Sint voluptates totam sit debitis! Debitis sequi quaerat dolorem excepturi cumque odit ipsam at.",
                image = "images/img1.jpg"
            ),
            new Product(
                id = 2,
                name = "Apple Iphone",
                categoryId = 2,
                description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                image = "images/img1.jpg"
            )]
        );

        //Act
        await listBasketProducts();
        
        //Assert
        let newItems = document.getElementsByClassName("item").length;
        expect(newItems).toEqual(2);
    });

    test("should return nothing", () => {
        //Arrange
        localStorage.removeItem("basketItemsIdsListKey");

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
