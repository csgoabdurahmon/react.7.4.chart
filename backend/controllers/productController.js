"use strict";

const {
  products,
  getNextProductId,
  findProductById,
} = require("../data/store");

function getProducts(req, res) {
  return res.json(products);
}

function createProduct(req, res) {
  const {
    name,
    size,
    description,
    photos,
    price,
    category,
    createdAt,
  } = req.body || {};

  if (!name || !size || !description) {
    return res.status(400).json({
      message: "`name`, `size` va `description` majburiy",
    });
  }

  const product = {
    id: getNextProductId(),
    name,
    size,
    description,
    photos: Array.isArray(photos) ? photos : [],
    price: typeof price === "number" ? price : Number(price) || undefined,
    category: category || undefined,
    createdAt: createdAt || new Date().toISOString(),
  };

  products.push(product);
  return res.status(201).json(product);
}

function updateProduct(req, res) {
  const id = Number(req.params.id);
  const product = findProductById(id);

  if (!product) {
    return res.status(404).json({ message: "Product topilmadi" });
  }

  const { name, size, description, photos, price, category, createdAt } = req.body || {};

  if (name !== undefined) product.name = name;
  if (size !== undefined) product.size = size;
  if (description !== undefined) product.description = description;
  if (photos !== undefined) product.photos = Array.isArray(photos) ? photos : product.photos;
  if (price !== undefined) product.price = typeof price === "number" ? price : Number(price);
  if (category !== undefined) product.category = category;
  if (createdAt !== undefined) product.createdAt = createdAt;

  return res.json(product);
}

function deleteProduct(req, res) {
  const id = Number(req.params.id);
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Product topilmadi" });
  }

  const deletedProduct = products.splice(index, 1)[0];
  return res.json({ message: "Product o'chirildi", product: deletedProduct });
}

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
