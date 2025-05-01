const DefaultController = require('../defaultController');

describe('DefaultController', ()=>{
    let rentalServiceMock;
    let defaultController;

    beforeEach(()=>{
        rentalServiceMock = {
            getAllForDefaultIndex : jest.fn()
        }

        resMock = {
            render: jest.fn(),
        }
        reqMock ={ 
            params: {},
            body: {},
        }

        defaultController = new DefaultController(rentalServiceMock)
    })


    test('Index() muestra de manera adecuada la lista de rentas', async ()=>{
        const rentals = [
            {car: 'Toyota', client: 'Juan', pricePerDay: 100},
            {car: 'Honda', client: 'Pedro', pricePerDay: 100}
        ];


        rentalServiceMock.getAllForDefaultIndex.mockResolvedValue(rentals);

        await defaultController.index(reqMock, resMock);

        
        expect(rentalServiceMock.getAllForDefaultIndex).toHaveBeenCalledTimes(1);
        expect(resMock.render).toHaveBeenCalledWith('default/views/index.njk',{rentals});
    });
})