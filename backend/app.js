const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product");

const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://abdukazoum:051688@cluster0.ohuft7z.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected successfully ");
  })
  .catch((err) => {
    console.log(err);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//get all products
app.get("/api/products", (req, res) => {
  Product.find()
    .then((product) => {
      res.status(200).json({ products: product });
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

// get one Product
app.get("/api/products/:id", (req, res) => {
  Product.findOne({
    _id: req.params.id,
  })
    .then((product) => {
      res.status(200).json({ product });
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

// create new product
app.post("/api/products", (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    inStock: req.body.inStock,
  });

  product
    .save()
    .then((product) => {
      res.status(200).json({ product: product });
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

// Update Product
app.put("/api/products/:id", (req, res) => {
  const product = new Product({
    _id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    inStock: req.body.inStock,
  });
  Product.updateOne({ _id: req.params.id }, product)
    .then(() => {
      res.status(200).json({ message: "Modified" });
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

//Delete product
app.delete("/api/products/:id", (req, res) => {
  Product.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "deleted" });
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

// app.use((req, res) => {
//   res.json("hello");
// });

module.exports = app;
