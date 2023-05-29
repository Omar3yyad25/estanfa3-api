const db = require('../models');
const decode = require('../utils/jwtdecode')
const http = require('http');
const url = require('url');

// Create a new contract
exports.create = async (req, res) => {

  const { productId } = req.params;
  console.log(productId)

  const session = req.cookies['bezkoder-session']  // get sellerId from cookies
  const buyerId = decode.jwtdecode(session);
  const queries = req.params
  console.log(queries, "sdfg")

  if (!productId){
    console.log("no product id", productId)
    //return res.redirect("http://estanfa3.com/404-error-page-2.html")
  }

  try {
    const product = await db.Product.findByPk(productId);
    const sellerId = product.sellerId;
    console.log(sellerId, "sellerId")
    const offer = await db.offer.findOne({
        where: {
            tradedProductId: productId,
        },
    });

    console.log(offer, "offer")


    const contract = await db.contract.create({
      sellerId: sellerId,
      buyerId: buyerId,
      tradedProductId: productId,
      dealtPrice: offer.offeredPrice,
      diffPrice: offer.offeredPrice - product.price, 
    });
    
    return res.redirect("http://estanfa3.com:8443/deleteoffer/"+offer.id);
    //return res.status(201).json(offer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getContractsById = async (req, res) => {
    const session = req.cookies['bezkoder-session']  // get sellerId from cookies
    const id = decode.jwtdecode(session);
    try {
      const contract = await db.contract.findAll({
        where: {
          sellerId: id ,
        },
      });
  
      if (!contract) {
        return res.status(404).json({ message: 'contracts not found' });
      }
      res.json(contract);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.getSentContractsById = async (req, res) => {
    const session = req.cookies['bezkoder-session']  // get sellerId from cookies
    const id = decode.jwtdecode(session);
    try {
      const contract = await db.contract.findAll({
        where: {
          buyerId: id ,
        },
      });
  
      if (!contract) {
        return res.status(404).json({ message: 'contracts not found' });
      }
      res.json(contract);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  exports.deletecontractbyId = async (req, res) => {
    const { id } = req.params;
  
    try {
      const contract = await db.contract.findByPk(id);
      if (!contract) {
        return res.status(404).json({ message: 'contract not found' });
      }
      await contract.destroy();
      return res.redirect("http://estanfa3.com/vendor-dashboard.html");
      //res.json({ message: 'Offer deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
