const { Router } = require("express");
const { formToEntity, modelToEntity } = require("../mapper/clientMapper");


module.exports = class ClientController{
    constructor(clientService){
        this.clientService = clientService;
        this.BASE_ROUTE = '/clients';
    }

    configureRoutes(app){
        const ROUTE = this.BASE_ROUTE;

        app.get(`${ROUTE}`, this.index.bind(this));
        app.get(`${ROUTE}/create`, this.createView.bind(this));
        app.post(`${ROUTE}/create`, this.save.bind(this));
        app.get(`${ROUTE}/:id/edit`, this.editView.bind(this));
        app.post(`${ROUTE}/:id/edit`, this.save.bind(this));
        app.get(`${ROUTE}/:id/view`, this.detailView.bind(this));
        app.get(`${ROUTE}/:id/delete`, this.delete.bind(this));
        
    }

    async index(req, res){
        const clients = await this.clientService.getAll()
        res.render('client/views/index.njk', {clients});
    }

    async createView(req, res){
        res.render('client/views/add.njk', {
            button : 'Agregar'
        });
    }

    async save(req, res){
        let clientData
        if(req.params.id)
        {
            clientData = 
            {
                ...req.body,
                id: req.params.id,
            }
        }
        else
        {
            clientData = req.body
        }
        const client = formToEntity(clientData);
        await this.clientService.save(client);
        res.redirect('/clients');
    }

    async editView(req, res){
        const client = await this.clientService.getById(req.params.id)
        res.render('client/views/update.njk', {
            button : 'Actualizar',
            client
        });
    }

    async detailView(req, res){
        const client = await this.clientService.getById(req.params.id)
        res.render('client/views/detailClient.njk', {
            client
        });
    }

    async delete(req, res){
        await this.clientService.delete(req.params.id);
        res.redirect('/clients');
    }
}