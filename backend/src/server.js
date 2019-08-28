const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');
 
const server = express();

mongoose.connect('mongodb+srv://caligiuri:cali123@cluster0-vcmdw.mongodb.net/bdTinderDev?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

server.use(express.json());
server.use(routes);// serve para colocar algum tipo de configur. que ta em outro arquivo, como um plugin um modulo, 


server.listen(3333);