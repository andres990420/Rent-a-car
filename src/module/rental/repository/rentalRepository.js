const { where } = require("sequelize");
const { CarModel } = require("../../car/carModule");
const { ClientModel } = require("../../client/clientModule");
const { modelToEntity } = require("../mapper/rentalMapper")

module.exports = class RentalRepository{
    constructor(rentalModel){
        this.rentalModel = rentalModel
    }

    async getAll(){
        //  await this.rentaltModel.sync({force : true})
        // await this.rentalModel.create(
        //     {
        //         car: 1,
        //         client: 1,
        //         pricePerDay: 20.80,
        //         startedAt : '04-16-2025',
        //         endedAt : '04-20-2025',
        //         totalPrice : 450.90,
        //         paymentMethod : 'Efectivo',
        //         isPaid : true
        //     }
        // )
        const rentals = await this.rentalModel.findAll()
        return rentals.map(rental => modelToEntity(rental))
    }

    async getAllForDefaultIndex(){
        const rentals = await this.rentalModel.findAll({
            attributes: ['startedAt', 'endedAt', 'totalPrice', 'paymentMethod', 'isPaid', 'client', 'car'],
            include: [
                {
                    model : ClientModel,
                    attributes : ['name', 'lastName']
                },
                {
                    model : CarModel,
                    attributes : ['model', 'brand', 'year']
                }
                ]
        })

        return rentals.map(rental => rental)
    }

    async getById(id){
        const rental = await this.rentalModel.findOne({
            where: {
                id: id
            }
        })
        return modelToEntity(rental)
    }

    async save(rental){
        if(rental.id){
            await this.rentalModel.update(
                rental,
                {
                    where: {
                        id: rental.id
                    }
            })
        } else{
            await this.rentalModel.create(rental)
        }
    }

    async delete(id){
        await this.rentalModel.destroy({
            where: {
                id: id
            }
        })
    }
}