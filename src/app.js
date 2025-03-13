require('dotenv').config();

const express = require('express');
const nunjucks = require('nunjucks');
const configureDIC = require('./config/di');
const {init} = require('./module/car/module');

const app = express();
const port = process.env.PORT || 3000;

app.use('public', express.static('public'));


nunjucks.configure('module/', {
    autoescape: true,
    express: app
});

const container = configureDIC();

init(app, container);

// app.get('/', (req, res)=>{
//     res.render('car/view/index.njk')
// })

app.listen(port, () => {console.log('Server listening at http://localhost:',port)});