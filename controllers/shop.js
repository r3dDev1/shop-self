const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getIndex = (req, res, next) => {
  Product.fectchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/index", {
        products: rows,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fectchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/products-list", {
        products: rows,
        pageTitle: "Shop",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([product]) => {
      console.log(product);
      res.render("shop/product-details", {
        product: product[0],
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.addProductToCart = (req, res, next) => {
  const prodId = req.body.productId;

  Cart.isProductInCart(prodId)
    .then(([cart]) => {
      if (cart.length === 0) {
        return true;
      } else {
        return false;
      }
    })
    .then((empty) => {
      if (empty) {
        console.log("the cart is empty");
        Product.findById(prodId).then(([product]) => {
          const cartItem = new Cart(
            null,
            product[0].productID,
            product[0].price,
            1,
            false
          );
          cartItem
            .save()
            .then(() => {
              res.redirect("/");
            })
            .catch((err) => console.log(err));
        });
      } else {
        Cart.findById(prodId).then(([product]) => {});
      }
    })
    .catch((err) => console.log(err));
};
