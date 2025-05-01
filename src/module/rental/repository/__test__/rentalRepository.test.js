const RentalRepository = require('../rentalRepository');
const Rental = require('../../entity/rentalEntity');
const { modelToEntity } = require('../../mapper/rentalMapper');

jest.mock('../../mapper/rentalMapper', () => ({
    modelToEntity: jest.fn(),
}));

describe('RentalRepository', () => {
    let rentalModelMock;
    let rentalRepository;

    beforeEach(() => {
        rentalModelMock = {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            destroy: jest.fn(),
        };

        rentalRepository = new RentalRepository(rentalModelMock);
    });

    test('getAll() Deberia retomar la lista de todas las rentas', async () => {
        const rentalsData = [
            { id: 1, client: 'John Doe', car: 'Toyota', totalPrice: 100 },
            { id: 2, client: 'Jane Doe', car: 'Honda', totalPrice: 200 },
        ];

        modelToEntity.mockImplementation((rental) => rental);
        
        rentalModelMock.findAll.mockResolvedValue(rentalsData);

        const result = await rentalRepository.getAll();

        expect(rentalModelMock.findAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual(rentalsData);
    });

    test('getById() Deberia retornar una renta por su ID', async () => {
        const rentalData = { id: 1, client: 'John Doe', car: 'Toyota', totalPrice: 100 };

        rentalModelMock.findOne.mockResolvedValue(rentalData);
        modelToEntity.mockResolvedValue({ id: 1, client: 'John Doe', car: 'Toyota', totalPrice: 100 })


        const result = await rentalRepository.getById(1);

        expect(rentalModelMock.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
        expect(result).toEqual(rentalData);
    });

    test('save() Deberia guardar la renta', async () => {
        const rentalData = { client: 'John Doe', car: 'Toyota', totalPrice: 100 };

        rentalModelMock.create.mockResolvedValue({ id: 1, ...rentalData });

       await rentalRepository.save(rentalData);

        expect(rentalModelMock.create).toHaveBeenCalledWith(rentalData);
    });

    test('delete() Deberia eliminar la renta por su ID', async () => {
        rentalModelMock.destroy.mockResolvedValue(1);

        await rentalRepository.delete(1);

        expect(rentalModelMock.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    });

});