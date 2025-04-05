module.exports = 
    class Rental{
        constructor(
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
            this.id = id,
            this.car = car,
            this.client = client,
            this.pricePerDay = Number(pricePerDay),
            this.startedAt = Date(startedAt),
            this.endedAt = Date(endedAt),
            this.totalPrice = Number(totalPrice),
            this.paymentMethod = paymentMethod,
            this.isPaid = isPaid
        }
    };