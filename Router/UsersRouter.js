const express = require('express');
let router = express.Router();

const users_controller =  require('../controller/Users/users_controller')
const UsersCont = new users_controller();

router.post('/api/AddUser', UsersCont.CheckValidToken ,async (req, res) => {
   let data = req.body.NewUser;
   let post = UsersCont.serialized_array_to_object(data);
   let Result = await UsersCont.AddUser(post);
   res.send(Result);
});

router.get('/api/GetUsers', UsersCont.CheckValidToken, async (req, res) => {
   let UsersList = await UsersCont.GetUsers();
   res.send(UsersList);
});

router.get('/api/EditUser', UsersCont.CheckValidToken, async(req, res) => {
   let id = req.query.EditUser;
   let UserRow = await UsersCont.GetUserRow(id);
   res.send(UserRow);
})

router.put('/api/UpdateUser', UsersCont.CheckValidToken, async(req, res) => {
   let post = req.body.UpdateUser;
   post = UsersCont.serialized_array_to_object(post);
   let UserRow = await UsersCont.UpdateUser(post);
   res.send(UserRow);
})

router.delete('/api/DelUser', UsersCont.CheckValidToken, async(req, res) => {
   let id = req.body.DelUser;
   await UsersCont.DelUser(id);
   res.send('success');
})

module.exports = router;