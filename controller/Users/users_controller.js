const Users = require('../../model/Users/users_model');
const InncesModel = require('../../classes/InncesModel');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

class users_controller extends InncesModel {

    async AddUser(post) {
      let {username, password, firstName, lastName, email, marketingConsent} = post;
      let saltString = "450d0b0db2bcf4adde5032eca1a7c416e560cf44";
      const hashedEmail = this.saltedSha1Hash(email, saltString);
      let id = hashedEmail;
      if(marketingConsent === 'on') {
        marketingConsent = true;
      }else {
        marketingConsent = false;
      }
      let num_rows = await Users.findOne({id})
      if(num_rows < 1) {
         Users.create({
          id, username, password, firstName, lastName, email, marketingConsent
         });
         return 'user added successfully';
      }else{
        return 'user already exists ';
      }
    }

    async DelUser(id) {
      await Users.findOneAndDelete({id: id});
      return 'success'
    }

    async GetUsers() {
        const UsersList = await Users.find();
        return UsersList;
    }

    async GetUserRow(id){
      const UserRow = await Users.findOne({id});
      return UserRow;
    }

    async UpdateUser(post) {
      await Users.findByIdAndUpdate(post._id, post, {new: true});
      return 'success';
    }

    saltedSha1Hash(email, salt) {
      const hash = crypto.createHash('sha1');
      hash.update(email);
      hash.update(salt);
      return hash.digest('hex');
    }

    CheckValidToken(req, res, next) {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if(token == null) {
        res.send('You dont have token to access');
        return 
      }
      jwt.verify(token, process.env.JWT_SECRET, (err, userObject) => {
         if(err) {
          res.send('You dont have correct token');
          return 
         }
         req.userObject = userObject;
         next();
      });

    }
}

module.exports = users_controller;
