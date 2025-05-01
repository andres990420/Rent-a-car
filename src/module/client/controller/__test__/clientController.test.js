const ClientController = require('../clientController');
const { formToEntity } = require('../../mapper/clientMapper');

jest.mock('../../mapper/clientMapper', () => ({
    formToEntity: jest.fn(),
}));

describe('ClientController', () => {
    let clientServiceMock;
    let reqMock;
    let resMock;
    let clientController;

    beforeEach(() => {
        clientServiceMock = {
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

        clientController = new ClientController(clientServiceMock);
    });

    test('index() Deberia mostrar la lista de clientes', async () => {
        const clients = [{ id: 1, name: 'Juan' }];
        clientServiceMock.getAll.mockResolvedValue(clients);

        await clientController.index(reqMock, resMock);

        expect(clientServiceMock.getAll).toHaveBeenCalledTimes(1);
        expect(resMock.render).toHaveBeenCalledWith('client/views/index.njk', { clients });
    });

    test('createView() deberia mostrar la vista para agregar nuevos clients', async () => {
        await clientController.createView(reqMock, resMock);

        expect(resMock.render).toHaveBeenCalledWith('client/views/add.njk', {
            button: 'Agregar',
        });
    });

    test('editView() deberias mostrar la vista para actualizar un cliente', async () => {
        const client = { id: 1, name: 'Juan' };
        reqMock.params.id = 1;
        clientServiceMock.getById.mockResolvedValue(client);

        await clientController.editView(reqMock, resMock);

        expect(clientServiceMock.getById).toHaveBeenCalledWith(1);
        expect(resMock.render).toHaveBeenCalledWith('client/views/update.njk', {
            button: 'Actualizar',
            client
        });
    });

    test('save() deberia guardar un nuevo cliente y redireccionar', async () => {
        reqMock.body = { name: 'Juan', lastName: 'Perez' };
        formToEntity.mockReturnValue({ name: 'Juan', lastName: 'Perez' });

        await clientController.save(reqMock, resMock);

        expect(formToEntity).toHaveBeenCalledWith(
            expect.objectContaining({
                name: 'Juan',
                lastName: 'Perez'
            })
        );
        expect(clientServiceMock.save).toHaveBeenCalledWith({ name: 'Juan', lastName: 'Perez' });
        expect(resMock.redirect).toHaveBeenCalledWith('/clients');
    });

    test('save() deberia actualizar un cliente existente y redireccionar', async () => {
        reqMock.params.id = 1;
        reqMock.body = { name: 'Juan', lastName: 'Perez' };
        formToEntity.mockReturnValue({ id: 1, name: 'Juan', lastName: 'Perez' });

        await clientController.save(reqMock, resMock);

        expect(formToEntity).toHaveBeenCalledWith(
            expect.objectContaining({
                id: 1,
                name: 'Juan', 
                lastName: 'Perez'
            })
        );
    
        expect(clientServiceMock.save).toHaveBeenCalledWith({ id: 1, name: 'Juan', lastName: 'Perez' });
        expect(resMock.redirect).toHaveBeenCalledWith('/clients');
    });

    test('detailView() deberia mostrar la pagina de informacion detallada de un cliente', async () => {
        const client = { id: 1, name: 'Juan' };
        reqMock.params.id = 1;
        clientServiceMock.getById.mockResolvedValue(client);

        await clientController.detailView(reqMock, resMock);

        expect(clientServiceMock.getById).toHaveBeenCalledWith(1);
        expect(resMock.render).toHaveBeenCalledWith('client/views/detailClient.njk', { client });
    });

    test('delete() deberia eliminar un cliente y redireccionar', async () => {
        reqMock.params.id = 1;

        await clientController.delete(reqMock, resMock);

        expect(clientServiceMock.delete).toHaveBeenCalledWith(reqMock.params.id);
        expect(resMock.redirect).toHaveBeenCalledWith('/clients');
    });
});