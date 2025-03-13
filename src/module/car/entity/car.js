module.exports = class Car{
    constructor({
        brand,
        model,
        year,
        mileage,
        color,
        ac,
        maxPassengers,
        transmission,
        status,
        pricePerDay,
        lastMaintenance
    }){
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.mileage = mileage;
        this.color = color;
        this.ac = ac;
        this.maxPassengers = maxPassengers;
        this.transmission = transmission;
        this.status = status;
        this.pricePerDay = pricePerDay;
        this.lastMaintenance = lastMaintenance;
    };
}