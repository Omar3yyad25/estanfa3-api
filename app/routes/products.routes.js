//products routes
const productController = require('../controllers/product.controller');
const { upload, MulterUploader } = require("../utils/multer.js")

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, Content-Type, Accept"
        );
        next();
      });    

// Create a new product
app.post("/createproduct", MulterUploader, productController.create);

// Retrieve all products
app.get("/getproduct", productController.getAll);

// Retrieve a single product by ID
app.get("/getproduct/:id", productController.getById);

app.get("/getuserproduct/", productController.getByUserId);


// Update a product by ID
app.put("/updateproduct/:id", productController.updateById);

// Delete a product by ID
app.delete("/deleteproduct/:id", productController.deleteById);


};
