require('dotenv').config()

const { default : DIContainer, object, get, factory } = require('rsdi');
const {Sequelize} = require('sequelize');
const { CarController, CarRepository, CarService, CarModel} = require('../module/car/carModule');
const { ClientController, ClientService, ClientRepository, ClientModel } = require('../module/client/clientModule');


function configureSequelize(){
    const sequelizeInstance = new Sequelize({
        dialect: 'sqlite',
        storage : '/data/database.sqlite'
    })
    return sequelizeInstance
}

function configureCarModel(container){
    return CarModel.setup(container.get('Sequelize'))
}

function configureClientModel(container){
    return ClientModel.setup(container.get('Sequelize'))
}

function addCommonDefinitions(container){
    container.addDefinitions({
        Sequelize : object(configureSequelize)
    });
};

function addCarModuleCommoDefinitions(container){
    container.addDefinitions({
        CarController: object(CarController).construct(get('CarService')),
        CarService: object(CarService).construct(get('CarRepository')),
        CarRepository : object(CarRepository).construct(get('CarModel')),
        CarModel : factory(configureCarModel)
    });
}

function addCLienteModuleCommoDefinitions(container){
    container.addDefinitions({
        ClientController: object(ClientController).construct(get('ClientService')),
        ClientService : object(ClientService).construct(get('ClientRepository')),
        ClientRepository : object(ClientRepository).construct(get('ClientModel')),
        ClientModel : factory(configureClientModel)
    })
}

module.exports = function configureDI(){
    const container = new DIContainer();
    addCommonDefinitions(container);
    addCarModuleCommoDefinitions(container);
    addCLienteModuleCommoDefinitions(container);

    return container
}
