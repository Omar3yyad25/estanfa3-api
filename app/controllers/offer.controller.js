// In controllers/productController.js
const db = require('../models');
const decode = require('../utils/jwtdecode')
const http = require('http');
const url = require('url');

// Create a new product
exports.create = async (req, res) => {
  const { offeredPrice, description } = req.body;
  const session = req.cookies['bezkoder-session']  // get sellerId from cookies
  const buyerId = decode.jwtdecode(session);
  const queries = req.query

  const productId = queries?.id

  if (!productId){
    return res.redirect("http://estanfa3.com")
  }

  // console.log(req.url)

  // const parsedUrl = url.parse(req.url, true);

  // // Extract the id parameter
  // const id = parsedUrl.query.id;
  // console.log(parsedUrl.query);


 
  try {
    const product = await db.Product.findByPk(productId);
    const sellerId = product.sellerId;

    const offer = await db.offer.create({
      sellerId: sellerId,
      offeredPrice,
      description,
      buyerId: buyerId,
      tradedProductId: productId,
    });
    
    //return res.redirect("http://estanfa3.com/product-uploaded.html");
    res.status(201).json(offer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};