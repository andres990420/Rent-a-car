const Car = require('../entity/car')

module.exports = class CarController {
    constructor(CarService){
        this.ROUTE_BASE = '/car';
        this.carService = CarService;
    }

    configureRoutes(app){
        const ROUTE = this.ROUTE_BASE;

        app.get(`${ROUTE}`, this.index.bind(this));
    }

    async index(req, res){
        const cars = await this.carService.getAll();
        let carros = []
        for (let car of cars){
            carros.push(fromDataToEntity(car));
        }

        res.render('car/view/index.njk', {carros});
    }
}

function fromDataToEntity({
    brand,
    model,
    year,
    kms,
    color,
    ac,
    passanger,
    transmission
}){
    return new Car({
        brand,
        model,
        year,
        kms,
        color,
        ac,
        passanger,
        transmission
    });
}