module.exports = class CarRepository {
    constructor(Database){
        this.database = Database;
    }

    getAll(){
        // this.database.prepare("INSERT INTO cars (brand, model, year, kms, color, ac, passanger, transmission) VALUES('toyot', 'corolla', 2006, 10000, 'rojo', 1, 4, 'manual')").run()
        const carros = this.database.prepare("SELECT * FROM cars").all();
        return carros
    }
}
