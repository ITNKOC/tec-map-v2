
//extrnal imports
const express = require('express');

//variables
const router = express.Router();  

//internal import
const positionControllers = require('../controllers/position.controllers');

// Route
router.route('/friends')
.get(positionControllers.getFriendsPositions);

router.route('')
.put(positionControllers.updatePosition);

// export
module.exports= router;