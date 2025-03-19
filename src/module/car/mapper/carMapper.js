const Car = require('../entity/car');

function modelToEntity(
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
){
    const car = new Car(
        id,
        brand,
        model,
        Number(year),
        Number(mileage),
        color,
        ac,
        capacity,
        transmission,
        Number(pricePerDay),
        createdAt,
        updatedAt
    );
    return car;
}

function formToEntity(
    id,
    brand,
    model,
    year,
    mileage,
    color,
    ac,
    capacity,
    transmission,
    pricePerDay ,
    createdAt,
    updatedAt

    ){
        const car = new Car(
            id,
            brand,
            model,
            Number(year),
            Number(mileage),
            color,
            ac,
            capacity,
            transmission,
            Number(pricePerDay),
            createdAt,
            updatedAt
        );
        return car;
}

module.exports = {
    modelToEntity, formToEntity
}