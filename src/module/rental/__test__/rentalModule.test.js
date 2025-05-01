const {initRentalModule} = require('../rentalModule');

const app = jest.fn()

const controller = {
    configureRoutes : jest.fn()
}

const container = {
    get: jest.fn(()=>controller)
}

test('RentalModule se inicializa de manera correcta', () => {
    initRentalModule(app, container);

    expect(container.get).toHaveBeenCalledTimes(1);
    expect(container.get).toHaveBeenCalledWith('RentalController');

    expect(controller.configureRoutes).toHaveBeenCalledTimes(1);
    expect(controller.configureRoutes).toHaveBeenCalledWith(app);
})