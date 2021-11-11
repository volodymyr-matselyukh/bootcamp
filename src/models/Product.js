class Product{
    constructor(_id = 0, _name = "", _categoryId = 0, _description = "", _image = ""){
        this.id = _id;
        this.name = _name;
        this.categoryid = _categoryId;
        this.description = _description;
        this.image = _image;
    }
}

module.exports = { Product } 