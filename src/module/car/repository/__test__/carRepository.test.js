const CarRepository = require('../carRepository');
const Car = require('../../entity/car');

describe('CarRepository', () => {
    let carModelMock;
    let carRepository;

    beforeEach(() => {
        carModelMock = {
            create: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
            destroy: jest.fn(),
        };

        carRepository = new CarRepository(carModelMock);

        carDataMock = {
            brand : 'Toyota',
            model : 'Corolla',
            year : 2010,
            mileage : 500000,
            color : 'red',
            ac: false,
            capacity : 5,
            transmission : 'Automatico',
            pricePerDay : 100,
        }
    });

    test('save() Deberia guardar un nuevo auto', async () => {
        const carData = carDataMock;
        const carEntity = new Car({
            id: undefined,
            brand: carData.brand,
            model: carData.model,
            year: carData.year,
            mileage: carData.mileage,
            color: carData.color,
            ac: carData.ac,
            capacity: carData.capacity,
            transmission: carData.transmission,
            pricePerDay: carData.pricePerDay,
        });
    
        carModelMock.create.mockResolvedValue({ id: 1, ...carData });
    
        await carRepository.save(carEntity);
    
        expect(carModelMock.create).toHaveBeenCalledWith({
            brand: carData.brand,
            model: carData.model,
            year: carData.year,
            mileage: carData.mileage,
            color: carData.color,
            ac: carData.ac,
            capacity: carData.capacity,
            transmission: carData.transmission,
            pricePerDay: carData.pricePerDay,
        });
       
    });

    test('getById() Deberia regresar un auto por su ID', async () => {
        const carData = { id: 1, model: 'Toyota', pricePerDay: 100 };

        carModelMock.findOne.mockResolvedValue(carData);

        const result = await carRepository.getById(1);

        expect(carModelMock.findOne).toHaveBeenCalledWith({"where": {"id": 1}});
        expect(result).toEqual(new Car({id:1, model:'Toyota', pricePerDay: 100}));
    });

    test('getAll() Deberia retomar la lista de todos los autos', async () => {
        const carsData = [
            { id: 1, model: 'Toyota', pricePerDay: 100 },
            { id: 2, model: 'Honda', pricePerDay: 120 },
        ];

        carModelMock.findAll.mockResolvedValue(carsData);

        const result = await carRepository.getAll();

        expect(carModelMock.findAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual([
            new Car({id: 1, model: 'Toyota', pricePerDay:  100}),
            new Car({id: 2, model: 'Honda',  pricePerDay: 120}),
        ]);
    });

    test('delete() Deberia eliminar un auto usando su ID', async () => {
        carModelMock.destroy.mockResolvedValue(1);

        const result = await carRepository.delete(1);

        expect(carModelMock.destroy).toHaveBeenCalledWith({"where": {"id": 1}});
    });
});