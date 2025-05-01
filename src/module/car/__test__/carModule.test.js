const { initCarModule } = require('../carModule');

const app = jest.fn();

const controller = {
    configureRoutes: jest.fn(),
};

const container = {
    get: jest.fn(()=> controller),
};

test('CarModule se inicializa de manera correcta', () => {
    initCarModule(app, container);

    expect(container.get).toHaveBeenCalledTimes(1);
    expect(container.get).toHaveBeenCalledWith('CarController');

    expect(controller.configureRoutes).toHaveBeenCalledTimes(1);
    expect(controller.configureRoutes).toHaveBeenCalledWith(app);
})