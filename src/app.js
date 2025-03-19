require('dotenv').config();

const path = require('path')

const express = require('express');
const nunjucks = require('nunjucks');
const configureDIC = require('./config/di');

const {init} = require('./module/car/module');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname , '..' , 'public', 'js')));
app.use(express.urlencoded({extended: false}))
app.use(express.json());


nunjucks.configure('module/', {
    autoescape: true,
    express: app
});


const container = configureDIC();

init(app, container);


app.listen(port, () => {console.log('Server listening at http://localhost:',port)});