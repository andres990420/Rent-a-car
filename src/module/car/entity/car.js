module.exports = class Car{
    constructor({
        id,
        brand,
        model,
        year,
        mileage,
        color,
        ac,
        capacity,
        transmission,
        pricePerDay,
        createdAt,
        updatedAt
    }){
        this.id = id,
        this.brand = brand,
        this.model = model,
        this.year = year,
        this.mileage = mileage,
        this.color = color,
        this.ac = ac,
        this.capacity = capacity,
        this.transmission = transmission,
        this.pricePerDay = pricePerDay,
        this.createdAt = createdAt,
        this.updatedAt = updatedAt
    };
}