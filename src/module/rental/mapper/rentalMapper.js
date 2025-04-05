const Rental = require('../entity/rentalEntity');

function modelToEntity(
    id,
    car,
    client,
    pricePerDay,
    startedAt,
    endedAt,
    totalPrice,
    paymentMethod,
    isPaid
){
    const rental = new Rental(
        id,
        car,
        client,
        Number(pricePerDay),
        Date(startedAt),
        Date(endedAt),
        Number(totalPrice),
        paymentMethod,
        Boolean(isPaid)
    );

    return rental;
}

function formToEntity(
    id,
    car,
    client,
    pricePerDay,
    startedAt,
    endedAt,
    totalPrice,
    paymentMethod,
    isPaid
){
    const rental = new Rental (
        id,
        car,
        client,
        Number.parseFloat(pricePerDay),
        startedAt,
        endedAt,
        Number.parseFloat(totalPrice),
        paymentMethod,
        isPaid
    )
    return rental;
}

module.exports = {
    formToEntity, modelToEntity
}