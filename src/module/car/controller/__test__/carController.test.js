const CarController = require('../carController');
const { formToEntity } = require('../../mapper/carMapper');

jest.mock('../../mapper/carMapper', () => ({
    formToEntity: jest.fn(),
}));

describe('CarController', () => {
    let carServiceMock;
    let reqMock;
    let resMock;
    let carController;

    beforeEach(() => {
        carServiceMock = {
            getAll: jest.fn(),
            getById: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
        };

        reqMock = {
            params: {},
            body: {},
        };

        resMock = {
            render: jest.fn(),
            redirect: jest.fn(),
        };

        carController = new CarController(carServiceMock);
    });

    test('index() Deberia mostrar la lista de autos', async () => {
        const cars = [{ id: 1, model: 'Toyota' }];
        carServiceMock.getAll.mockResolvedValue(cars);

        await carController.index(reqMock, resMock);

        expect(carServiceMock.getAll).toHaveBeenCalledTimes(1);
        expect(resMock.render).toHaveBeenCalledWith('car/views/index.njk', { cars });
    });

    test('createView() deberia mostrar la vista para agregar nuevos autos', async () => {
        await carController.createView(reqMock, resMock);

        expect(resMock.render).toHaveBeenCalledWith('car/views/add.njk', {
            titulo: 'Agrega un nuevo automovil',
            button: 'Agregar',
        });
    });

    test('editView() deberias mostrar la vista para actualizar un auto', async () => {
        const car = { id: 1, model: 'Toyota' };
        reqMock.params.id = 1;
        carServiceMock.getById.mockResolvedValue(car);

        await carController.editView(reqMock, resMock);

        expect(carServiceMock.getById).toHaveBeenCalledWith(1);
        expect(resMock.render).toHaveBeenCalledWith('car/views/update.njk', {
            titulo: 'Actualiza los datos',
            button: 'Actualizar',
            car,
        });
    });

    test('save() deberia guardar un nuevo auto y redireccionar', async () => {
        reqMock.body = { model: 'Toyota', 'price-per-day': '100' };
        formToEntity.mockReturnValue({ model: 'Toyota', pricePerDay: 100 });

        await carController.save(reqMock, resMock);

        expect(formToEntity).toHaveBeenCalledWith(
            expect.objectContaining({
                model: 'Toyota',
                'price-per-day': '100'
            })
        );
        expect(carServiceMock.save).toHaveBeenCalledWith({ model: 'Toyota', pricePerDay: 100 });
        expect(resMock.redirect).toHaveBeenCalledWith('/cars');
    });

    test('save() deberia actualizar un auto existente y redireccionar', async () => {
        reqMock.params.id = 1;
        reqMock.body = { model: 'Toyota', 'price-per-day': '100' };
        formToEntity.mockReturnValue({ id: 1, model: 'Toyota', pricePerDay: 100 });

        await carController.save(reqMock, resMock);

        expect(formToEntity).toHaveBeenCalledWith(
            expect.objectContaining({
                id: 1,
                model: 'Toyota',
                'price-per-day': '100'
            })
        );
    
        expect(carServiceMock.save).toHaveBeenCalledWith({ id: 1, model: 'Toyota', pricePerDay: 100 });
        expect(resMock.redirect).toHaveBeenCalledWith('/cars');
    });

    test('detail() deberia mostrar la pagina de informacion detallada de un auto', async () => {
        const car = { id: 1, model: 'Toyota' };
        reqMock.params.id = 1;
        carServiceMock.getById.mockResolvedValue(car);

        await carController.detail(reqMock, resMock);

        expect(carServiceMock.getById).toHaveBeenCalledWith(1);
        expect(resMock.render).toHaveBeenCalledWith('car/views/detail.njk', { car });
    });

    test('delete() deberia eliminar un auto y redireccionar', async () => {
        reqMock.params.id = 1;

        await carController.delete(reqMock, resMock);

        expect(carServiceMock.delete).toHaveBeenCalledWith(reqMock.params);
        expect(resMock.redirect).toHaveBeenCalledWith('/cars');
    });
});