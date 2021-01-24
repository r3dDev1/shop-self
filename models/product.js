const db = require("../util/database");
module.exports = class Product {
  constructor(productID, title, imageUrl, description, price) {
    this.productID = productID;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      "INSERT INTO products (title, price, description, imageUrl) VALUES(?,?,?,?)",
      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  static fectchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE productID = ?", [id]);
  }
};
