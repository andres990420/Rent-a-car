const RentalController = require('../rentalController');
const { formToEntity } = require('../../mapper/rentalMapper');

jest.mock('../../mapper/rentalMapper', () => ({
    formToEntity: jest.fn(),
}));

describe('RentalController', () => {
    let rentalServiceMock;
    let reqMock;
    let resMock;
    let rentalController;

    beforeEach(() => {
        rentalServiceMock = {
            getAll: jest.fn(),
            getById: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
        };

        clientServiceMock = {
            getAll: jest.fn(),
            getById: jest.fn()
        };

        carServiceMock = {
            getAll: jest.fn(),
            getById: jest.fn()
        };

        reqMock = {
            params: {},
            body: {},
        };

        resMock = {
            render: jest.fn(),
            redirect: jest.fn(),
        };

        rentalController = new RentalController(rentalServiceMock, clientServiceMock, carServiceMock);
    });

    test('index() Deberia mostrar la lista de rentas', async () => {
        const rentals = [{ id: 1, car: 'Toyota' , client: 'Juan'}];
        rentalServiceMock.getAll.mockResolvedValue(rentals);

        await rentalController.index(reqMock, resMock);

        expect(rentalServiceMock.getAll).toHaveBeenCalledTimes(1);

        expect(resMock.render).toHaveBeenCalledWith('rental/views/index.njk', { rentals });
    });

    test('createView() deberia mostrar la vista para agregar nuevos autos', async () => {
        const clients = [{id: 1, name: 'Juan'}]
        const cars =  [{id: 1, model: 'Toyota' }]
        
        clientServiceMock.getAll.mockResolvedValue(clients)
        carServiceMock.getAll.mockResolvedValue(cars)

        await rentalController.createView(reqMock, resMock);

        expect(resMock.render).toHaveBeenCalledWith('rental/views/add.njk', {
            button: 'Agregar',
            cars,
            clients
        });
    });

    test('editView() deberias mostrar la vista para actualizar una renta', async () => {
        const rental = { id: 1, car: 'Toyota' , client: 'Juan'};
        const clients = [{id: 1, name: 'Juan'}]
        const cars =  [{id: 1, model: 'Toyota' }]
        
        reqMock.params.id = 1;

        rentalServiceMock.getById.mockResolvedValue(rental);
        clientServiceMock.getAll.mockResolvedValue(clients)
        carServiceMock.getAll.mockResolvedValue(cars)

        await rentalController.editView(reqMock, resMock);

        expect(rentalServiceMock.getById).toHaveBeenCalledWith(1);
        expect(carServiceMock.getAll).toHaveBeenCalledTimes(1);
        expect(clientServiceMock.getAll).toHaveBeenCalledTimes(1);

        expect(resMock.render).toHaveBeenCalledWith('rental/views/update.njk', {
            button: 'Modificar',
            rental,
            cars,
            clients
        });
    });

    test('save() deberia guardar una nueva renta y redireccionar', async () => {
        reqMock.body = { car: 'Toyota' , client: 'Juan' };
        formToEntity.mockReturnValue({ car: 'Toyota' , client: 'Juan' });

        await rentalController.save(reqMock, resMock);

        expect(formToEntity).toHaveBeenCalledWith(
            expect.objectContaining({
                car: 'Toyota' , 
                client: 'Juan'
            })
        );
        expect(rentalServiceMock.save).toHaveBeenCalledWith({ car: 'Toyota' , client: 'Juan' });
        expect(resMock.redirect).toHaveBeenCalledWith('/rentals');
    });

    test('save() deberia actualizar una renta existente y redireccionar', async () => {
        reqMock.params.id = 1;
        reqMock.body = { car: 'Toyota' , client: 'Juan' };
        formToEntity.mockReturnValue({ id: 1, car: 'Toyota' , client: 'Juan' });

        await rentalController.save(reqMock, resMock);

        expect(formToEntity).toHaveBeenCalledWith(
            expect.objectContaining({
                id: 1,
                car: 'Toyota' , 
                client: 'Juan'
            })
        );
    
        expect(rentalServiceMock.save).toHaveBeenCalledWith({ id: 1, car: 'Toyota' , client: 'Juan' });
        expect(resMock.redirect).toHaveBeenCalledWith('/rentals');
    });

    test('detail() deberia mostrar la pagina de informacion detallada de un auto', async () => {
        const rental = { id: 1, car: 1 , client: 1 };
        const client = {id: 1, name: 'Juan'}
        const car =  {id: 1, model: 'Toyota' }
        
        reqMock.params.id = 1;

        rentalServiceMock.getById.mockResolvedValue(rental);
        clientServiceMock.getById.mockResolvedValue(client)
        carServiceMock.getById.mockResolvedValue(car)


        await rentalController.detailView(reqMock, resMock);

        expect(rentalServiceMock.getById).toHaveBeenCalledWith(1);
        expect(carServiceMock.getById).toHaveBeenCalledWith(rental.car);
        expect(clientServiceMock.getById).toHaveBeenCalledWith(rental.client);


        expect(resMock.render).toHaveBeenCalledWith('rental/views/detailRental.njk', { rental , car, client});
    });

    test('delete() deberia eliminar un auto y redireccionar', async () => {
        reqMock.params.id = 1;

        await rentalController.delete(reqMock, resMock);

        expect(rentalServiceMock.delete).toHaveBeenCalledWith(reqMock.params.id);
        expect(resMock.redirect).toHaveBeenCalledWith('/rentals');
    });
});