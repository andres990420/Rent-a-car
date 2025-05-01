const RentalService = require('../rentalService')
const Rental = require('../../entity/rentalEntity')

describe('RentalService', ()=>{
    let rentalService;
    let rentalRepositoryMock;

    beforeEach(()=>{
        rentalRepositoryMock = {
            getAll: jest.fn(),
            save : jest.fn(),
            getById: jest.fn(),
            delete: jest.fn()
        };

        rentalService =  new RentalService(rentalRepositoryMock);
    })

    test('getAll() deberia retornar la lista de todas las rentas', async ()=>{
        const rentalsData = [
            { id: 1, client: 'John Doe', car: 'Toyota', totalPrice: 100 },
            { id: 2, client: 'Jane Doe', car: 'Honda', totalPrice: 200 },
        ];

        rentalRepositoryMock.getAll.mockResolvedValue(rentalsData);

        const result = await rentalService.getAll()

        expect(rentalRepositoryMock.getAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual(rentalsData)
    });

    test('getById() deberia retornar una renta filtrada por su ID', async ()=>{
        const rentalData = { id: 1, client: 'John Doe', car: 'Toyota', totalPrice: 100 }

        rentalRepositoryMock.getById.mockResolvedValue(rentalData);

        const result = await rentalService.getById()

        expect(rentalRepositoryMock.getById).toHaveBeenCalledTimes(1);
        expect(result).toEqual(rentalData)
    });

    test('save() deberia guardar la renta', async ()=>{
        const rentalData = { id: 1, client: 'John Doe', car: 'Toyota', totalPrice: 100 }
        
        rentalRepositoryMock.save.mockResolvedValue(rentalData);

        const result = await rentalService.save(rentalData);

        expect(rentalRepositoryMock.save).toHaveBeenCalledTimes(1);
        expect(result).toEqual(rentalData);
    });

    test('delete() deberia eliminar la renta por su ID', async ()=>{
        rentalRepositoryMock.delete.mockResolvedValue(true);

        const result = await rentalService.delete(1);

        expect(rentalRepositoryMock.delete).toHaveBeenCalledTimes(1);
        expect(result).toBe(true);
    })
});