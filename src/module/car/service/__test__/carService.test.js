const CarService = require('../carService');
const Car = require('../../entity/car');

describe('CarService', () => {
    let carRepositoryMock;
    let carService;

    beforeEach(() => {
        carRepositoryMock = {
            getAll: jest.fn(),
            getById: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
        };

        carService = new CarService(carRepositoryMock);
    });

    test('getAll() Deberia retornar la lista de todos los autos', async () => {
        const carsData = [
            new Car({ id: 1, model: 'Toyota', pricePerDay: 100 }),
            new Car({ id: 2, model: 'Honda', pricePerDay: 120 }),
        ];

        carRepositoryMock.getAll.mockResolvedValue(carsData);

        const result = await carService.getAll();

        expect(carRepositoryMock.getAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual(carsData);
    });

    test('getById() Deberia retornar un auto por su ID', async () => {
        const carData = new Car({ id: 1, model: 'Toyota', pricePerDay: 100 });

        carRepositoryMock.getById.mockResolvedValue(carData);

        const result = await carService.getById(1);

        expect(carRepositoryMock.getById).toHaveBeenCalledWith(1);
        expect(result).toEqual(carData);
    });

    test('save() Deberia guardar un auto', async () => {
        const carData = new Car({ model: 'Toyota', pricePerDay: 100 });

        carRepositoryMock.save.mockResolvedValue(carData);

        const result = await carService.save(carData);

        expect(carRepositoryMock.save).toHaveBeenCalledWith(carData);
        expect(result).toEqual(carData);
    });

    test('delete() Deberia eliminar un auto por su ID', async () => {
        carRepositoryMock.delete.mockResolvedValue(true);

        const result = await carService.delete(1);

        expect(carRepositoryMock.delete).toHaveBeenCalledWith(1);
        expect(result).toBe(true);
    });
});