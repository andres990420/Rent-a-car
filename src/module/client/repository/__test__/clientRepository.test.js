const ClientRepository = require('../clientRepository');
const Client = require('../../entity/client');

describe('ClientRepository', () => {
    let clientModelMock;
    let clientRepository;

    beforeEach(() => {
        clientModelMock = {
            create: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
            destroy: jest.fn(),
        };

        clientRepository = new ClientRepository(clientModelMock);
    });

    test('save() Deberia guardar un nuevo cliente', async () => {
        const clientData = {name: 'Juan', lastName: 'Perez'};
        const clientEntity = new Client({
            name : clientData.name,
            lastName : clientData.lastName
        });
    
        clientModelMock.create.mockResolvedValue({ id: 1, ...clientData });
    
        await clientRepository.save(clientEntity);
    
        expect(clientModelMock.create).toHaveBeenCalledWith({
            name : clientData.name,
            lastName : clientData.lastName
        });
       
    });

    test('getById() Deberia regresar un cliente por su ID', async () => {
        const carData = { id: 1, name: 'Juan', lastName: 'Perez' };

        clientModelMock.findOne.mockResolvedValue(carData);

        const result = await clientRepository.getById(1);

        expect(clientModelMock.findOne).toHaveBeenCalledWith({"where": {"id": 1}});
        expect(result).toEqual(new Client({id:1, name:'Juan', lastName: 'Perez'}));
    });

    test('getAll() Deberia retomar la lista de todos los clientes', async () => {
        const carsData = [
            { id: 1, name: 'Juan', lastName: 'Perez' },
            { id: 2, name: 'Berto', lastName: 'Suarez' },
        ];

        clientModelMock.findAll.mockResolvedValue(carsData);

        const result = await clientRepository.getAll();

        expect(clientModelMock.findAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual([
            new Client({id: 1, name: 'Juan', lastName:  'Perez'}),
            new Client({id: 2, name: 'Berto',  lastName: 'Suarez'}),
        ]);
    });

    test('delete() Deberia eliminar un cliente usando su ID', async () => {
        clientModelMock.destroy.mockResolvedValue(1);

        await clientRepository.delete(1);

        expect(clientModelMock.destroy).toHaveBeenCalledWith({"where": {"id": 1}});
    });
});