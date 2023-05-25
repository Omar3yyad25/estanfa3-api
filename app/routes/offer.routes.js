const offerController = require('../controllers/offer.controller');
const authchecker = require("../utils/authchecker")

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, Content-Type, Accept"
        );
        next();
      });    

// Create a new product
app.post("/createoffer/",  authchecker.basic,offerController.create);

app.get("/getoffers/", authchecker.basic, offerController.getOffersById);

app.get("/deleteoffer/:id", offerController.deleteofferbyId);

};