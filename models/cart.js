const db = require("../util/database");
module.exports = class Cart {
  constructor(cartID, productID, totalCost, quantity, completed) {
    this.cartID = cartID;
    this.productID = productID;
    this.totalCost = totalCost;
    this.quantity = quantity;
    this.completed = completed;
  }

  save() {
    return db.execute(
      "INSERT INTO cartItems(productID, totalCost, quantity, completed) VALUES (?, ?, ?, ?)",
      [this.productID, this.totalCost, this.quantity, this.completed]
    );
  }

  static fetchAll() {
    return db.execute("SELECT * FROM cartItems");
  }

  static findById(id) {
    return db.execute("SELECT * FROM cartItems WHERE cartID = ?", [id]);
  }

  static isProductInCart(id) {
    return db.execute(
      "SELECT * FROM cartItems WHERE productID = ? AND completed = false",
      [id]
    );
  }
};
