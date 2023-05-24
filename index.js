const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const multer  = require('multer');
const path = require('path');
const { exec } = require('child_process');
const cookieParser = require("cookie-parser");


const app = express();

//app.use(cors());
app.use(cookieParser());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'My API documentation',
    },
  },
  // Paths to files containing API routes
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

// Serve the Swagger UI page
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// const upload = multer({ dest: 'uploads/' });
// app.use(express.static(path.join(__dirname, 'public')));

// app.post('/upload', upload.single('image'), (req, res) => {
//   const file = req.file;
//   if (!file) {
//     const error = new Error('Please upload a file');
//     console.log('upload');
//     error.httpStatusCode = 400;
//     return next(error);
//   }
  
//   res.send(`
//     <h1>File uploaded successfully!</h1>
//     <img src="${file.filename}">
//   `);
// });

//app.use(cors());

// allow cross origin
app.use(function(req, res, next) {
  const origin = req.headers.origin
 if(["http://estanfa3.com:8443/", "https://estanfa3.com", "https://estanfa3.com/", "http://estanfa3.com","http://estanfa3.com/"].indexOf(origin) > -1){
   res.header('Access-Control-Allow-Origin', "*");
 }
 res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 next();
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    sameSite: 'strict',
    domain: 'estanfa3.com'
  })
);

// database
const db = require("./app/models");

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.post('/git_push', (req, res) => {
  exec('git pull origin master', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing 'git pull': ${error}`);
      return res.send(500);
    }})	
    // Execute the restart command for PM2
    res.send(200);
    exec('pm2 restart index', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing PM2 restart: ${error}`);
        return res.send(501)    
      } else {
        console.log(`PM2 restart executed successfully: ${stdout}`);   
        return res.send(200);
      }
  });
});

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));



// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/products.routes")(app);
require("./app/routes/offer.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8443;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}

