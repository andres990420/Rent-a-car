
module.exports = class Service{

    constructor(CarRepository){
        this.carRepository = CarRepository;
    }

    async save(car){
        return this.carRepository.save(car)
    }

    async delete(car){
        return this.carRepository.delete(car)
    }

    async getById(id){
        return this.carRepository.getById(id)
    }

    async getAll(){
        return this.carRepository.getAll()
    }
}