const Users = require('../../model/Users/users_model');
const InncesModel = require('../../classes/InncesModel');
const jwt = require('jsonwebtoken');

class login_controller extends InncesModel {

   async UserLogin(post) {
    const {username, password} = post;
    let UserObject = {
        username,
        password
    }
    let user_row = await Users.find(UserObject);
    if(user_row) {
     const accessToken = jwt.sign(UserObject, process.env.JWT_SECRET);
     return accessToken;
    }else{
        return 'incorrect username or password';
    }
    
   }
}

module.exports = login_controller;
