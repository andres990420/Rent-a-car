require('dotenv').config()
const Database = require('better-sqlite3');
const { default : DIContainer, object, get, factory } = require('rsdi');

const { CarController, CarRepository, CarService} = require('../module/car/module');


function configureDatabase(){
    return new Database('C:/Users/andre/Documents/GitHub/Rent-a-car/data/database.db', {verbose :console.log})
}
'"C:\Users\andre\Documents\GitHub\Rent-a-car\data\database.db"'

module.exports = function configureDI(){
    const container = new DIContainer();
    container.addDefinitions({
        CarController: object(CarController).construct(get('CarService')),
        CarService: object(CarService).construct(get('CarRepository')),
        CarRepository : object(CarRepository).construct(get('Database')),
        Database : factory(configureDatabase)
    });

    return container
}
