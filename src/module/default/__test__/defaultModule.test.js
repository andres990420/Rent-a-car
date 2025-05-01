const { initDefaultModule } = require('../defaultModule')

const app = jest.fn()

const controller = {
    configureRoutes : jest.fn()
}

const container = {
    get: jest.fn(()=>controller)
}

test('DefaultModule se inicia correctamente', () =>{
    initDefaultModule(app, container);

    expect(container.get).toHaveBeenCalledTimes(1);
    expect(container.get).toHaveBeenCalledWith('DefaultController');

    expect(controller.configureRoutes).toHaveBeenCalledTimes(1);
    expect(controller.configureRoutes).toHaveBeenCalledWith(app);
})