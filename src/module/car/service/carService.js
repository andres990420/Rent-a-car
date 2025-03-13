
module.exports = class Service{

    constructor(CarRepository){
        this.carRepository = CarRepository;
    }

    async save(car){
        return this.carRepository.save(car)
    }

    async delete(){
        return this.carRepository.delete(car)
    }

    async getById(){
        return this.carRepository.getById(car)
    }

    async getAll(){
        return this.carRepository.getAll()
    }
}