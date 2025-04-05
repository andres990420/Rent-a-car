const { where } = require("sequelize");
const { CarModel } = require("../../car/carModule");
const { ClientModel } = require("../../client/clientModule");

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
        const rentals = await this.rentalModel.findAll({
            include: [{
                model: CarModel,
                attributes: ['model', 'id']
            },
            {
                model: ClientModel,
                attributes: ['name', 'id']
            }
        ]})
        return rentals.map(rental => rental.toJSON())
    }

    async getById(id){
        const rental = await this.rentalModel.findOne({
            where: {
                id: id
            },
            include: [{
                model: CarModel,
                attributes: ['model', 'id']
            },
            {
                model: ClientModel,
                attributes: ['name', 'id']
            }]
        })
        
        return rental
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