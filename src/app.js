require('dotenv').config();

const path = require('path');
const express = require('express');
const nunjucks = require('nunjucks');
const configureDI = require('./config/di');

const { initCarModule } = require('./module/car/carModule');
const { initClientModule } = require('./module/client/clientModule');
const { initRentalModule } = require('./module/rental/rentalModule');
const { initDefaultModule } = require('./module/default/defaultModule');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('../public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json());


nunjucks.configure('module/', {
    autoescape: true,
    express: app
});


const container = configureDI();

initCarModule(app, container);
initClientModule(app, container);
initRentalModule(app, container);
initDefaultModule(app, container);

app.listen(port, () => {console.log('Server listening at http://localhost:',port)});