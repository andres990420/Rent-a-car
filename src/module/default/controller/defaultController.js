module.exports = class DefaultController {

    constructor(rentalService){
        this.rentalService = rentalService;
    }

    configureRoutes(app){
        this.BASE_ROUTE = "/";

        app.get(`${this.BASE_ROUTE}`, this.index.bind(this));
    }

    async index(req, res){
        const rentals = await this.rentalService.getAllForDefaultIndex();
        res.render('default/views/index.njk',{
            rentals,
        });
    }
}