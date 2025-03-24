const { where } = require("sequelize");


module.exports = class ClientRepository{
    constructor(clientModel){
        this.clientModel =  clientModel;
    }

    async getAll(){
        // await this.clientModel.sync({force : true})
        // await this.clientModel.create(
        //     {
        //         name : 'Juan',
        //         lastName : 'Perez',
        //         documentType : 'Pasaporte',
        //         documentNumber : 1567890,
        //         nationality : 'Venezolano',
        //         address : 'Calle siemprealegre 23',
        //         phoneNumber : '42492301231',
        //         email : 'veneco@mail.com',
        //         birthday: '20/03/1998'
        //     }
        // )
        const clients = await this.clientModel.findAll();
        return clients.map(client => client.toJSON());
    }

    async getById(id){
        const client = await this.clientModel.findOne({
            where:{
                id: id
            }
        });
        return client
    }

    async save(client){
        if(client.id){
            await this.clientModel.update(
                client,{
                    where:{
                        id: client.id
                    }
                });
        } else {
            await this.clientModel.create(client);
        }
    }

    async delete(id){
        await this.clientModel.destroy({
            where : {
                id : id
            }
        });
    }
};