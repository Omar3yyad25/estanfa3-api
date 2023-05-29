const contractController = require('../controllers/contract.controller');
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
app.post("/createcontract/:id",  authchecker.basic,contractController.create);
};