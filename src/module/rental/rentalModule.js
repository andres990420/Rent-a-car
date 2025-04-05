const RentalController = require("./controller/rentalController");
const RentalModel = require("./model/RentalModel");
const RentalRepository = require("./repository/rentalRepository");
const RentalService = require("./service/rentalService");

function initRentalModule(app, container){
    const controller = container.get('RentalController');
    controller.configureRoutes(app);
};

module.exports= {
    initRentalModule , RentalController, RentalService, RentalRepository, RentalModel
}

