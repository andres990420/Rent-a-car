const { where } = require('sequelize');
const {modelToEntity} = require('../mapper/carMapper')

module.exports = class CarRepository {
    constructor(carModel){
        this.carModel = carModel;
    }

    async getAll(){
        // const car = this.carModel.create(
        //     {
        //         brand : 'toyota',
        //         model : 'corolla',
        //         year : 2010,
        //         mileage : 500000,
        //         color : 'red',
        //         ac: false,
        //         capacity : 5,
        //         transmission : 'Automatico',
        //         pricePerDay : 40.2,
        //     }
        // )
        const cars = await this.carModel.findAll();
        return cars.map((car) => modelToEntity(car));
    }

    async save(car){
        if(car.id){
               await this.carModel.update(
                car,
                {
                    where: {
                        id: car.id
                    }
                }) 
        }else{
            await this.carModel.create(car)
        }
    }

    async delete(id){
        await this.carModel.destroy({
            where: {
                id: id,
            },
        });
    }

    async getById(id){
        const car = await this.carModel.findOne({
            where: {
                id: id,
            },
        });
        return modelToEntity(car);
    }
}
