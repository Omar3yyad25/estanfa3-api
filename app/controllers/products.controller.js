// In controllers/productController.js
const db = require('../models');

// Create a new product
exports.create = async (req, res) => {
  const { name, price, description } = req.body;
  const sellerId = req.cookies.sellerId; // get sellerId from cookies
  
  try {
    const product = await db.Product.create({
      name,
      price,
      description,
      image: req.file.filename, // Assumes that the uploaded image file is stored in the "public/images" directory
      sellerId
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Retrieve all products
exports.getAll = async (req, res) => {
  try {
    const products = await db.Product.findAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Retrieve a single product by ID
exports.getById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await db.Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a product by ID
exports.updateById = async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  try {
    const product = await db.Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.name = name;
    product.price = price;
    product.description = description;
    if (req.file) {
      product.image = req.file.filename;
    }
    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a product by ID
exports.deleteById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await db.Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
