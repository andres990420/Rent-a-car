const configureDI = require('../config/di');

(async ()=>{
    const container = configureDI();

    const sequelize = container.get('Sequelize');
    container.get('CarModel');
    container.get('ClientModel');
    container.get('RentalModel');

    await sequelize.sync();
})()