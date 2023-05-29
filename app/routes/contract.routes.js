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
app.get("/createcontract/:productId",  authchecker.basic,contractController.create);

app.get("/getcontracts/", authchecker.basic, contractController.getContractsById);

app.get("/getsentcontracts/", authchecker.basic, contractController.getSentContractsById);

app.get("/deletecontract/:id", authchecker.basic, contractController.deletecontractbyId);

};