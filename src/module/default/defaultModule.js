const DefaultController = require("./controller/defaultController");

function initDefaultModule(app, container){
    const controller =  container.get('DefaultController');
    controller.configureRoutes(app)
}

module.exports = {
    initDefaultModule, DefaultController
}