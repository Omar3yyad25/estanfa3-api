// In controllers/productController.js
const db = require('../models');
const decode = require('../utils/jwtdecode')
const http = require('http');
const url = require('url');

// Create a new product
exports.create = async (req, res) => {
  console.log('kk')
  const { offeredPrice, description } = req.body;
  const session = req.cookies['bezkoder-session']  // get sellerId from cookies
  const buyerId = decode.jwtdecode(session);
  
  // console.log(req.url)

  // const parsedUrl = url.parse(req.url, true);

  // // Extract the id parameter
  // const id = parsedUrl.query.id;
  // console.log(parsedUrl.query);

  const currentUrl = 'http://estanfa3.com/make-offer.html?id=1';
  console.log(currentUrl)

 
  try {
    const product = await db.Product.findByPk(id);
    const sellerId = product.sellerId;

    const offer = await db.offer.create({
      sellerId: sellerId,
      offeredPrice,
      description,
      buyerId: buyerId,
      tradedProductId: id,
    });
    
    //return res.redirect("http://estanfa3.com/product-uploaded.html");
    res.status(201).json(offer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};