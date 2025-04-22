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
            isPaid,
            createdAt,
            updatedAt
        ){
            this.id = id,
            this.car = car,
            this.client = client,
            this.pricePerDay = Number(pricePerDay),
            this.startedAt = new Date(startedAt),
            this.endedAt = new Date(endedAt),
            this.totalPrice = Number(totalPrice),
            this.paymentMethod = paymentMethod,
            this.isPaid = isPaid,
            this.created = new Date(createdAt),
            this.updatedAt = new Date(updatedAt)
        }
    };