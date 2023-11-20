const express = require('express');
let router = express.Router();

const db_operations_controller = require('../controller/db_operations/db_operations_controller');
const db_operations = new db_operations_controller();


router.route('/EditDatabase').post(async (req, res) => {
    let sql = req.body.run_db_operation;
    let access_key = req.body.access_key;
    
    if (access_key === '@#2022#@secretinnces_sys123db') {
        db_operations.tables_operations(sql);
        res.send('success');
    } else {
        res.send('wrong access key');
    }

});



const InstallClass = require('../classes/inncesInstall');
const Install = new InstallClass();

router.route('/InstallTables').post( async (req, res) => {
    Install.execute_installation();
    res.send('success');
 });

module.exports = router;