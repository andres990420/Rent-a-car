const Car = require('../entity/car')
const {formToEntity, modelToEntity} = require('../mapper/carMapper')

module.exports = class CarController {
    constructor(CarService){
        this.ROUTE_BASE = '/car';
        this.carService = CarService;
    }

    configureRoutes(app){
        const ROUTE = this.ROUTE_BASE;

        app.get(`${ROUTE}`, this.index.bind(this));
        app.get(`${ROUTE}/form/create`, this.form.bind(this));
        app.post(`${ROUTE}/form/create`, this.save.bind(this));
        app.get(`${ROUTE}/form/edit/:id`, this.updateView.bind(this));
        app.post(`${ROUTE}/form/edit/:id`, this.update.bind(this));
        app.get(`${ROUTE}/view/:id`, this.detailCar.bind(this))
        app.get(`${ROUTE}/delete/:id`, this.delete.bind(this));
    }

    async index(req, res){
        const cars = await this.carService.getAll();
        res.render('car/view/index.njk', {cars});
    }

    async form(req, res){
        res.render('car/view/form.njk', {
            titulo: 'Agrega un nuevo automovil',
            boton : 'Agregar',
        });      
    }

    async updateView(req, res){
        const car = await this.carService.getById(req.params.id);
        res.render('car/view/form.njk', {
            titulo: 'Actualiza los datos',
            boton : 'Actualizar',
            car : car,
        });
    }

    async update(req, res){
        const carData = {...req.body,
            pricePerDay : req.body['price-per-day'],
            id: req.params.id
        }
        const car = formToEntity(carData);
        await this.carService.save(car)
        res.redirect(this.ROUTE_BASE);
    }

    async save(req, res){
        const carData = {...req.body,
            pricePerDay : req.body['price-per-day']
        }
        const car = formToEntity(carData);
        await this.carService.save(car);
        res.redirect(this.ROUTE_BASE);
    }

    async detailCar(req, res){
        const car = await this.carService.getById(req.params.id); 
        res.render('car/view/detail.njk', {car});
    }

    async delete(req, res){
        await this.carService.delete(req.params);
        res.redirect(this.ROUTE_BASE)
    }
}
