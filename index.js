require('dotenv').config()
const express = require('express');
var bodyParser  = require('body-parser');
const cors = require('cors');
const app = express();
const Port = process.env.PORT || 3000;
app.use(cors())

const InncesDatabase = require('./classes/inncesDatabase');
const DBObject = new InncesDatabase();
DBObject.mogo_db_info(process.env.MONGO_URI);

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(express.json());
app.use(cors());

// Users router
const MyRouter = require("./Router/UsersRouter.js");
app.use('/', MyRouter);

// Login Router 
const LoginRouter = require('./Router/LoginRouter.js');
app.use('/', LoginRouter);

// modify mysql or sqlite database operations router ,it related to innces express library
const db_operations_router = require("./Router/db_operations.js"); 
app.use('/api/db_operations', db_operations_router);

//default paths to enable access to install html files and modify html files
app.use(express.static(__dirname + '/')); 

// install route when using mysql or sqlite , it related to innces express library
app.get( '/install', async (req, res) => {
    res.sendFile(__dirname + "/install/index.html")
 });

 // modification page when using mysql, sqlite db route , it related to innces express library
app.get( '/db', async (req, res) => {
    res.sendFile(__dirname + "/db/index.html")
 });

// start server
app.listen(Port, () => {
    console.log('run on port 3000');
});
