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
        app.get(`${ROUTE}/form`, this.formView.bind(this));
        app.post(`${ROUTE}/form`, this.saveForm.bind(this));
        app.get(`${ROUTE}/form/:id`, this.formEditView.bind(this));
        app.post(`${ROUTE}/form/:id`, this.update.bind(this));
        app.get(`${ROUTE}/client/:id`, this.detailView.bind(this));
        app.get(`${ROUTE}/delete/:id`, this.delete.bind(this));
        
    }

    async index(req, res){
        const clients = await this.clientService.getAll()
        res.render('client/view/index.njk', {clients});
    }

    async formView(req, res){
        res.render('client/view/form.njk', {
            titulo: 'Agrega un nuevo cliente',
            boton : 'Agregar'
        });
    }

    async saveForm(req, res){
        await this.clientService.save(formToEntity(req.body));
        res.redirect('/clients');
    }

    async formEditView(req, res){
        const client = modelToEntity(await this.clientService.getById(req.params.id))
        res.render('client/view/form.njk', {
            titulo: 'Agrega un nuevo cliente',
            boton : 'Agregar',
            client
        });
    }

    async update(req, res){
        const client = {
            ...req.body,
            id: req.params.id,
        }

        await this.clientService.save(formToEntity(client));
        res.redirect('/clients');
    }

    async detailView(req, res){
        const client = modelToEntity(await this.clientService.getById(req.params.id))
        res.render('client/view/detailClient.njk', {
            titulo: 'Agrega un nuevo cliente',
            boton : 'Agregar',
            client
        });
    }

    async delete(req, res){
        await this.clientService.delete(req.params.id);
        res.redirect('/clients');
    }
}