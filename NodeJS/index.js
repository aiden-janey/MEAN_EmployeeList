const express = require('express');
const bodyParser = require('body-parser');
const port = 8080;
const cors = require('cors');

const { mongoose } = require('./db.js');
var employeeController = require('./controllers/employeeController.js');

var app = express();
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));

app.listen(port, () => console.log('Server started on Port: ' + port));

app.use('/employees', employeeController);