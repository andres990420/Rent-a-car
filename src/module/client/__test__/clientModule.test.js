const { initClientModule } = require('../clientModule')

const app = jest.fn();

const controller = {
    configureRoutes :  jest.fn()
};

const container = {
    get: jest.fn(()=>controller)
};

test('ClientModule se inicializa de manera correcta', () => {
    initClientModule(app, container);

    expect(container.get).toHaveBeenCalledTimes(1);
    expect(container.get).toHaveBeenCalledWith('ClientController');

    expect(controller.configureRoutes).toHaveBeenCalledTimes(1);
    expect(controller.configureRoutes).toHaveBeenCalledWith(app);
})