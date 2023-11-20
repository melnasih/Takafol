const express = require('express');
let router = express.Router();

const login_controller =  require('../controller/Users/login_controller')
const LoginCont = new login_controller();

router.post('/api/Login', async (req, res) => {
    let data = req.body.UserLogin;
    let post = LoginCont.serialized_array_to_object(data);
    console.log(post);
    let result = await LoginCont.UserLogin(post);
    res.send(result);
 });


module.exports = router;