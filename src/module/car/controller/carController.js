const Car = require('../entity/car')
const {formToEntity, modelToEntity} = require('../mapper/carMapper')

module.exports = class CarController {
    constructor(CarService){
        this.ROUTE_BASE = '/cars';
        this.carService = CarService;
    }

    configureRoutes(app){
        const ROUTE = this.ROUTE_BASE;

        app.get(`${ROUTE}`, this.index.bind(this));
        app.get(`${ROUTE}/create`, this.createView.bind(this));
        app.post(`${ROUTE}/create`, this.save.bind(this));
        app.get(`${ROUTE}/:id/edit`, this.editView.bind(this));
        app.post(`${ROUTE}/:id/edit`, this.save.bind(this));
        app.get(`${ROUTE}/:id/view`, this.detail.bind(this))
        app.get(`${ROUTE}/:id/delete`, this.delete.bind(this));
    }

    async index(req, res){
        const cars = await this.carService.getAll();
        res.render('car/views/index.njk', {cars});
    }

    async createView(req, res){
        res.render('car/views/add.njk', {
            titulo: 'Agrega un nuevo automovil',
            button : 'Agregar',
        });      
    }

    async editView(req, res){
        const car = await this.carService.getById(req.params.id);
        res.render('car/views/update.njk', {
            titulo: 'Actualiza los datos',
            button : 'Actualizar',
            car,
        });
    }

    async save(req, res){
        let carData;
        if(req.params.id)
        {
            carData = 
            {
                ...req.body,
                pricePerDay : req.body['price-per-day'],
                id: req.params.id
            }
        }
        else
        {
            carData = 
            {
                ...req.body,
                pricePerDay : req.body['price-per-day']
            }
        }
        const car = formToEntity(carData);
        // await this.carService.save(car);
        res.redirect(this.ROUTE_BASE);
    }

    async detail(req, res){
        const car = await this.carService.getById(req.params.id); 
        res.render('car/views/detail.njk', {car});
    }

    async delete(req, res){
        await this.carService.delete(req.params);
        res.redirect(this.ROUTE_BASE)
    }
}
