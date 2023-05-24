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
    
    //return res.redirect("http://estanfa3.com/offer-sent.html");
    res.status(201).json(offer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getOffersById = async (req, res) => {
  const session = req.cookies['bezkoder-session']  // get sellerId from cookies
  const id = decode.jwtdecode(session);
  try {
    const offers = await db.offer.findAll({
      where: {
        sellerId: id ,
      },
    });

    if (!offers) {
      return res.status(404).json({ message: 'Offers not found' });
    }
    res.json(offers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteofferbyId = async (req, res) => {
  const { id } = req.params;

  try {
    const offer = await db.offer.findByPk(id);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    await offer.destroy();
    res.json({ message: 'Offer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};