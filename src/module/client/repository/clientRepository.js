const {modelToEntity} =  require('../mapper/clientMapper');

module.exports = class ClientRepository{
    constructor(clientModel){
        this.clientModel =  clientModel;
    }

    async getAll(){
        const clients = await this.clientModel.findAll();
        return clients.map(client => modelToEntity(client));
    }

    async getById(id){
        const client = await this.clientModel.findOne({
            where:{
                id: id
            }
        });
        return modelToEntity(client);
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