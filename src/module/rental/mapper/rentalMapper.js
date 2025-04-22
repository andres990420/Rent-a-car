const Rental = require('../entity/rentalEntity');

function modelToEntity(model)
{
    const {id,
        car,
        client,
        pricePerDay,
        startedAt,
        endedAt,
        totalPrice,
        paymentMethod,
        isPaid,
        ['created_at']: createdAt,
        ['updated_at']:updatedAt
    } = model

    const rental = new Rental(
        id,
        car,
        client,
        Number.parseFloat(pricePerDay),
        new Date(startedAt),
        new Date(endedAt),
        Number.parseFloat(totalPrice),
        paymentMethod,
        Boolean(isPaid),
        new Date(createdAt),
        new Date(updatedAt)
    );

    return rental;
}

function formToEntity(model){
    
    const {id,
        car,
        client,
        pricePerDay,
        startedAt,
        endedAt,
        totalPrice,
        paymentMethod,
        isPaid,
        createdAt,
        updatedAt

    } = model

    const rental = new Rental (
        id,
        car,
        client,
        Number.parseFloat(pricePerDay),
        Date(startedAt),
        Date(endedAt),
        Number.parseFloat(totalPrice),
        paymentMethod,
        Boolean(isPaid),
        new Date(createdAt),
        new Date(updatedAt)
    )
    return rental;
}

module.exports = {
    formToEntity, modelToEntity
}