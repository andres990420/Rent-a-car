const {formToEntity} = require('../mapper/rentalMapper'); 

module.exports = class RentalController{
    constructor(rentalService, clientService, carService){
        this.rentalService = rentalService;
        this.clientService = clientService;
        this.carService = carService;
    }

    configureRoutes(app){
        this.BASE_ROUTE = '/rentals'

        app.get(`${this.BASE_ROUTE}`, this.view.bind(this));
        app.get(`${this.BASE_ROUTE}/create`, this.createView.bind(this));
        app.post(`${this.BASE_ROUTE}/create`, this.save.bind(this));
        app.get(`${this.BASE_ROUTE}/:id/edit`, this.editView.bind(this));
        app.post(`${this.BASE_ROUTE}/:id/edit`, this.save.bind(this));
        app.get(`${this.BASE_ROUTE}/:id/delete`, this.delete.bind(this));
        app.get(`${this.BASE_ROUTE}/:id/view`, this.detailView.bind(this));
    }

    async view(req, res){
        const rentals = await this.rentalService.getAll()
        res.render('rental/views/index.njk', 
            {rentals}
        );
    }

    async createView(req,res){
        const clients = await this.clientService.getAll();
        const cars = await this.carService.getAll();
        res.render('rental/views/add.njk',{
            button : 'Agregar',
            cars,
            clients
        });
    }

    async editView(req, res){
        const rental = await this.rentalService.getById(req.params.id);
        const clients = await this.clientService.getAll();
        const cars = await this.carService.getAll();

         res.render('rental/views/update.njk',{
            button: 'Modificar',
            cars,
            clients,
            rental,
        });
        
    }

    async save(req,res){
        let rentalData;
        if(req.params.id){
            rentalData = {
                id: req.params.id,
                ...req.body,
            }
        } else {
            rentalData = {...req.body}
        }
        
        const rental = formToEntity(rentalData);

        // await this.rentalService.save(rental);
        res.redirect('/rentals');
    }

    async delete(req, res){
        await this.rentalService.delete(req.params.id);
        res.redirect('/rentals');
    }

    async detailView(req, res){
        const rental = await this.rentalService.getById(req.params.id);
        const client = await this.clientService.getById(rental.client);
        const car = await this.carService.getById(rental.car);

        console.log(rental)
        res.render('rental/views/detailRental.njk',{
                rental,
                car,
                client
            });
    }
}