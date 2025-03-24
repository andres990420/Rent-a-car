const ClientController = require("./controller/clientController");
const ClientService = require("./service/clientService");
const ClientRepository = require('./repository/clientRepository');
const ClientModel = require("./model/clientModel");

function initClientModule(app, container){
    const controller = container.get('ClientController');
    controller.configureRoutes(app);
}

module.exports = {
    initClientModule, ClientController, ClientService, ClientRepository, ClientModel
}