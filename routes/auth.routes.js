//extrnal imports
const express = require('express');

//variables
const routeur = express.Router();   

//internal import
const authControllers = require('../controllers/auth.controllers')

// Route
routeur.route('/login').post(authControllers.login);
routeur.route('/register').post(authControllers.register);


// export
module.exports= routeur;
