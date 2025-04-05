module.exports = class RentalService{
    constructor(rentalRepository){
        this.rentalRepository = rentalRepository;
    }

    getAll(){
        return this.rentalRepository.getAll()
    };

    getById(id){
        return this.rentalRepository.getById(id)
    };

    save(rental){
        return this.rentalRepository.save(rental);
    };

    delete(id){
        return this.rentalRepository.delete(id);
    }
}