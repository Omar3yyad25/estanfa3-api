//products routes
const productController = require('../controllers/product.controller');

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, Content-Type, Accept"
        );
        next();
      });    

// Create a new product
app.post("/createproduct", productController.create);

// Retrieve all products
app.get("/getproduct", productController.getAll);

// Retrieve a single product by ID
app.get("/getproduct/:id", productController.getById);


// Update a product by ID
app.put("/updateproduct/:id", productController.updateById);

// Delete a product by ID
app.delete("/deleteproduct/:id", productController.deleteById);


};
