const { where } = require('sequelize');
const {modelToEntity} = require('../mapper/carMapper')

module.exports = class CarRepository {
    constructor(carModel){
        this.carModel = carModel;
    }

    async getAll(){
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
