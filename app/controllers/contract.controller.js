const db = require('../models');
const decode = require('../utils/jwtdecode')
const http = require('http');
const url = require('url');

// Create a new contract
exports.create = async (req, res) => {

  const session = req.cookies['bezkoder-session']  // get sellerId from cookies
  const buyerId = decode.jwtdecode(session);
  const queries = req.params

  const productId = req.body.productId;

  if (!productId){
    console.log("no product id", productId)
    return res.redirect("http://estanfa3.com")
  }

  try {
    const product = await db.Product.findByPk(productId);
    const sellerId = product.sellerId;
    const offer = await db.offer.findOne({
        where: {
            productId: productId,
        },
    })


    const contract = await db.contract.create({
      sellerId: sellerId,
      buyerId: buyerId,
      tradedProductId: productId,
      dealtPrice: offer.offeredPrice,
      diffPrice: offer.offeredPrice - product.price, 
    });
    
    return res.redirect("http://estanfa3.com/offer-sent.html");
    //return res.status(201).json(offer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};