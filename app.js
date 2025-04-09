//external  import
const express = require('express');
const mongoose = require('mongoose');

// internal imports :
const authRoute   = require('./routes/auth.routes');
const friendsRoute = require('./routes/friends.routes');
const meRoute     = require('./routes/me.routes');
const usersRoute   = require('./routes/users.route');
const positionRoute = require('./routes/position.routes');

// variable 
const app = express();
const PORT = 5000;

const connect = async()=>
{
    try {
    const connexion = await mongoose.connect('mongodb+srv://SYSTEM:ITNKOC3456@cluster0.exxplls.mongodb.net/');
    console.log("mongoDB connect to : "+connexion.connection.host);
    } catch(error){
        console.log("Error connection to MongoDB: ", error)
    };
}
connect();

 // listner
app.listen(PORT, () => {
    console.log (`listening on port ${PORT}`);
});

// Body Parser :
app.use(express.json());

//Routeurs :
app.use('/auth', authRoute);
app.use('/friends', friendsRoute);
app.use('/me', meRoute);
app.use('/users', usersRoute);
app.use('/position',positionRoute)


