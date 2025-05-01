
const configureDi = require('../di');

describe('DI esta caragando las dependencias correctamente', () =>{
    const container = configureDi();
    const { definitions } = container;

    test('Di esta cargando correctamente las definiciones de alto nivel', ()=>{
        expect(definitions).toHaveProperty('Sequelize');
        expect(definitions).toHaveProperty('CarController');
        expect(definitions).toHaveProperty('CarService');
        expect(definitions).toHaveProperty('CarRepository');
        expect(definitions).toHaveProperty('CarModel');
        expect(definitions).toHaveProperty('ClientController');
        expect(definitions).toHaveProperty('ClientService');
        expect(definitions).toHaveProperty('ClientRepository');
        expect(definitions).toHaveProperty('ClientModel');
        expect(definitions).toHaveProperty('RentalController');
        expect(definitions).toHaveProperty('RentalService');
        expect(definitions).toHaveProperty('RentalRepository');
        expect(definitions).toHaveProperty('RentalModel');
        expect(definitions).toHaveProperty('DefaultController');
    });

    test('CarController se contruye con las dependencias correctas', () =>{
        const { CarController } = definitions;
        const expected = [
            expect.objectContaining({ existingDefinitionName: 'CarService' })
        ];
        expect(CarController.deps).toEqual(expect.arrayContaining(expected));
    });

    test('CarService se contruye con las dependencias correctas', () =>{
        const { CarService } = definitions;
        const expected = [
            expect.objectContaining({ existingDefinitionName: 'CarRepository' })
        ];
        expect(CarService.deps).toEqual(expect.arrayContaining(expected));
    });

    test('CarRepository se contruye con las dependencias correctas', () =>{
        const { CarRepository } = definitions;
        const expected = [
            expect.objectContaining({ existingDefinitionName: 'CarModel' })
        ];
        expect(CarRepository.deps).toEqual(expect.arrayContaining(expected));
    });

    test('ClientController se contruye con las dependencias correctas', () =>{
        const { ClientController } = definitions;
        const expected = [
            expect.objectContaining({ existingDefinitionName: 'ClientService' })
        ];
        expect(ClientController.deps).toEqual(expect.arrayContaining(expected));
    });

    test('ClientService se contruye con las dependencias correctas', () =>{
        const { ClientService } = definitions;
        const expected = [
            expect.objectContaining({ existingDefinitionName: 'ClientRepository' })
        ];
        expect(ClientService.deps).toEqual(expect.arrayContaining(expected));
    });

    test('ClientRepository se contruye con las dependencias correctas', () =>{
        const { ClientRepository } = definitions;
        const expected = [
            expect.objectContaining({ existingDefinitionName: 'ClientModel' })
        ];
        expect(ClientRepository.deps).toEqual(expect.arrayContaining(expected));
    });

    test('RentalController se contruye con las dependencias correctas', () =>{
        const { RentalController } = definitions;
        const expected = [
            expect.objectContaining({ existingDefinitionName: 'RentalService' }),
            expect.objectContaining({ existingDefinitionName: 'CarService' }),
            expect.objectContaining({ existingDefinitionName: 'ClientService' })
        ];
        expect(RentalController.deps).toEqual(expect.arrayContaining(expected));
    });

    test('RentalService se contruye con las dependencias correctas', () =>{
        const { RentalService } = definitions;
        const expected = [
            expect.objectContaining({ existingDefinitionName: 'RentalRepository' })
        ];
        expect(RentalService.deps).toEqual(expect.arrayContaining(expected));
    });

    test('RentalRepository se contruye con las dependencias correctas', () =>{
        const { RentalRepository } = definitions;
        const expected = [
            expect.objectContaining({ existingDefinitionName: 'RentalModel' })
        ];
        expect(RentalRepository.deps).toEqual(expect.arrayContaining(expected));
    });
    
    test('DefaultController se contruye con las dependencias correctas', () =>{
        const { DefaultController } = definitions;
        const expected = [
            expect.objectContaining({ existingDefinitionName: 'RentalService' })
        ];
        expect(DefaultController.deps).toEqual(expect.arrayContaining(expected));
    });

});