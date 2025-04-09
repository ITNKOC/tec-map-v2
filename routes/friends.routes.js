
//extrnal imports
const express = require('express');

//variables
const router = express.Router();  

//internal import
const friendsControllers = require('../controllers/friends.controllers');

// Route
router.route('/:friendId')
.post(friendsControllers.addFriends)
.delete(friendsControllers.deleteFriends);

router.route('')
.get(friendsControllers.getFriends)


// export
module.exports= router;