const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');

app.use(express.static('www'));
app.use(multer({dest:'uploads/'}).array('filename'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/upload',require('./router/upload/upload'));

app.listen(80);