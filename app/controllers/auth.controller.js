const db = require("../models");
const decode = require('../utils/jwtdecode')
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;


const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  // Save User to Database
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      phone : req.body.phone,
      nationalid: req.body.nationalid,
      gender: req.body.gender,
      age: req.body.age,
      passwordnothashed: req.body.password,
    });

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });

      const result = user.setRoles(roles);
      if (result) res.redirect("http://estanfa3.com/thank-you.html");
        
    } else {
      // user has role = 1
      const result = user.setRoles([1]);
      if (result) res.redirect("http://estanfa3.com/thank-you.html");
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    console.log('dgd')
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    console.log(token)

  
    req.session.token = token;
    console.log(req.session.token,"token from line 79")
    return res.redirect("http://estanfa3.com/index.html");
    // return res.status(200).send({
    //   message: "You've been signed in!",
    // }
    //   );
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};


exports.getusername = async (req, res) => {
  const session = req.cookies['bezkoder-session']  // get sellerId from cookies
  const id = decode.jwtdecode(session);

  try{
    const user = await User.findOne({
      where: {
        id: id,
    }})
    const username = user.dataValues.username
    console.log("USERSESERSRES:    ", user.dataValues)
    return res.json({username: user.dataValues.username})
  }
  catch(err){
    return res.status(500).send({ message: err.message }); 
  }
  
  };



exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
};