const ClientService = require('../clientService');
const Client = require('../../entity/client');

describe('ClientService', () => {
    let clientRepositoryMock;
    let clientService;

    beforeEach(() => {
        clientRepositoryMock = {
            getAll: jest.fn(),
            getById: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
        };

        clientService = new ClientService(clientRepositoryMock);
    });

    test('getAll() Deberia retornar la lista de todos los clientes', async () => {
        const clientsData = [
            new Client({ id: 1, name: 'Juan', lastName: 'Perez' }),
            new Client({ id: 2, name: 'Honda', lastName: 'Suarez' }),
        ];

        clientRepositoryMock.getAll.mockResolvedValue(clientsData);

        const result = await clientService.getAll();

        expect(clientRepositoryMock.getAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual(clientsData);
    });

    test('getById() Deberia retornar un cliente por su ID', async () => {
        const clientData = new Client({ id: 1, name: 'Juan', lastName: 'Perez' });

        clientRepositoryMock.getById.mockResolvedValue(clientData);

        const result = await clientService.getById(1);

        expect(clientRepositoryMock.getById).toHaveBeenCalledWith(1);
        expect(result).toEqual(clientData);
    });

    test('save() Deberia guardar un cliente', async () => {
        const clientData = new Client({ name: 'Juan', lastName: 'Perez' });

        clientRepositoryMock.save.mockResolvedValue(clientData);

        const result = await clientService.save(clientData);

        expect(clientRepositoryMock.save).toHaveBeenCalledWith(clientData);
        expect(result).toEqual(clientData);
    });

    test('delete() Deberia eliminar un cliente por su ID', async () => {
        clientRepositoryMock.delete.mockResolvedValue(true);

        const result = await clientService.delete(1);

        expect(clientRepositoryMock.delete).toHaveBeenCalledWith(1);
        expect(result).toBe(true);
    });
});