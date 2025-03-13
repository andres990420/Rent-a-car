const CarController = require('./controller/carController');
const CarService = require('./service/carService');
const CarRepository = require('./repository/carRepository');


function init(app, contianer){
    const controller = contianer.get('CarController');
    controller.configureRoutes(app)
}

module.exports = {
    init,CarController, CarService, CarRepository 
}