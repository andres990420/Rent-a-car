const {modelToEntity, formToEntity} = require('../mapper/rentalMapper'); 

module.exports = class RentalController{
    constructor(rentalService, clientService, carService){
        this.rentalService = rentalService;
        this.clientService = clientService;
        this.carService = carService;
    }

    configureRoutes(app){
        this.BASE_ROUTE = '/rentals'

        app.get(`${this.BASE_ROUTE}`, this.view.bind(this));
        app.get(`${this.BASE_ROUTE}/form`, this.form.bind(this));
        app.post(`${this.BASE_ROUTE}/form`, this.save.bind(this));
        app.get(`${this.BASE_ROUTE}/form/:id`, this.formEditView.bind(this));
        app.post(`${this.BASE_ROUTE}/form/:id`, this.save.bind(this));
        app.get(`${this.BASE_ROUTE}/delete/:id`, this.delete.bind(this));
        app.get(`${this.BASE_ROUTE}/rental/:id`, this.detail.bind(this));
    }

    async view(req, res){
        const rentals = await this.rentalService.getAll()
        res.render('rental/view/index.njk', 
            {rentals}
        );
    }

    async form(req,res){
        const clients = await this.clientService.getAll();
        const cars = await this.carService.getAll();
        res.render('rental/view/form.njk',{
            titulo : 'Agrega una nueva renta',
            boton : 'Agregar',
            cars,
            clients
        });
    }

    async formEditView(req, res){
        const rental = await this.rentalService.getById(req.params.id);
        const clients = await this.clientService.getAll();
        const cars = await this.carService.getAll();
        
         res.render('rental/view/form.njk',{
            
            titulo: 'Edita la informacion de la renta',
            boton: 'Modificar',
            cars,
            clients,
            rental,
        });
        
    }

    async save(req,res){
        let rentalData;
        if(req.params.id){
            console.log(1)
            rentalData = {
                id: req.params.id,
                ...req.body,
            }
        } else {
            rentalData = {...req.body}
        }
        
        const rental = formToEntity(
            rentalData.id || null,
            rentalData.car,
            rentalData.client,
            rentalData.pricePerDay,
            rentalData.startedAt,
            rentalData.endedAt,
            rentalData.totalPrice,
            rentalData.paymentMethod,
            rentalData.isPaid
        );
        await this.rentalService.save(rental);
        res.redirect('/rentals');
    }

    async delete(req, res){
        await this.rentalService.delete(req.params.id);
        res.redirect('/rentals');
    }

    async detail(req, res){
        const rental = await this.rentalService.getById(req.params.id);
        res.render('rental/view/detailRental.njk', {rental});
    }
}