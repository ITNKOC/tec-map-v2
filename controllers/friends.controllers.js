const User = require('../models/User');
//external import :
const authUtils= require('../utils/auth.utils');

exports.addFriends = async (req, res) => {
    const isValidToken = authUtils.protect(req);
    if (!isValidToken) {
        return res.status(401).send('No permitted');
    }
    const friendId = req.params.friendId;
    const userId = req.userId;

    try {
        const user = await User.findById(userId);
        const friendUser = await User.findById(friendId);
        
        if (!friendUser) {
            return res.status(404).send('Cette personne n\'existe pas');
        }

        // Vérifier si l'ami est déjà dans la liste d'amis de l'utilisateur
        const isFriendAlreadyAdded = user.friends.includes(friendId);
        if (isFriendAlreadyAdded) {
            return res.status(409).send('L\'ami est déjà présent dans la liste');
        }

        // Vérifier si l'utilisateur essaie de s'ajouter lui-même
        if (userId.toString() === friendId) {
            return res.status(409).send('Vous essayez de vous ajouter vous-même');
        }

        // Ajouter l'ami à la liste d'amis de l'utilisateur
        user.friends.push(friendId);
        await user.save();
        return res.status(200).send("Vous avez ajouté un ami");

    } catch (error) {
        return res.status(500).send(error.message || 'Erreur interne du serveur');
    }
};



exports.getFriends = async(req,res)=>{

    const isValidToken= authUtils.protect(req);
    if (!isValidToken){
        return res.status(401).send ('no permited');
    }
    const userId = req.userId;
 
    try {
        const user = await User.findById(userId).select('friends -_id').populate('friends','username');
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send(error.message || 'Erreur interne du serveur');
    }

    
};

exports.deleteFriends = async (req, res) => {
    const isValidToken = authUtils.protect(req);
    if (!isValidToken) {
        return res.status(401).send('no permitted');
    }
    const friendId = req.params.friendId;
    const userId = req.userId;

    try {
        const user = await User.findById(userId);

        const friendIndex = user.friends.indexOf(friendId);


        if (userId.toString() === friendId) {
            return res.status(409).send('Vous essayez de vous retirer vous-même');
        }

        
        if (friendIndex !== -1) {
       
            user.friends.splice(friendIndex, 1);
            await user.save();
            return res.send("Vous avez supprimé un ami");
        } else {
            return res.status(409).send("L'ami spécifié n'a pas été trouvé dans la liste");
        }

    } catch (error) {
        return res.status(500).send(error.message || 'Erreur interne du serveur');
    }
};
