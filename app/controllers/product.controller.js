// In controllers/productController.js
const db = require('../models');
const decode = require('../utils/jwtdecode')

// Create a new product
exports.create = async (req, res) => {
  const { name, price, description } = req.body;
  const session = req.cookies['bezkoder-session']  // get sellerId from cookies
  const sellerId = decode.jwtdecode(session);
  
  const files = req.files

  try {
    const uploadedfile = files.image[0]

    const fileinsert = await db.uploads.create({
      fieldname: uploadedfile.fieldname,
      originalname: uploadedfile.originalname,
      encoding: uploadedfile.encoding,
      mimetype: uploadedfile.mimetype,
      destination: uploadedfile.destination,
      filename: uploadedfile.filename,
      path: uploadedfile.path,
      size: uploadedfile.size
    })

    const product = await db.Product.create({
      sellerId: sellerId,
      name,
      price,
      description,
      imageid: fileinsert.dataValues.id,
    });
    
    return res.redirect("http://estanfa3.com/product-uploaded.html");
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
    for (let i = 0; i < products.length; i++){
      image = await db.uploads.findOne({
        where: {
          id: products[i].dataValues.imageid
        }
      })
      products[i].dataValues.image_path = image?.path
    }
    res.status(200).json(products);
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

exports.getByUserId = async (req, res) => {
  const session = req.cookies['bezkoder-session']  // get sellerId from cookies
  const id = decode.jwtdecode(session);
  try {
    const products = await db.Product.findAll({
      where: {
        sellerId: id ,
      },
    });

    if (!products) {
      return res.status(404).json({ message: 'Products not found' });
    }
    res.json(products);
  } catch (error) {
    console.log('aa')
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
    //product.name = name;
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
