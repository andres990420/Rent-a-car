

module.exports = class ClientService{
    constructor(clientRepository){
        this.clientRepository = clientRepository;
    }

    getAll(){
        return this.clientRepository.getAll();
    }

    getById(id){
        return this.clientRepository.getById(id);
    }

    save(client){
        return this.clientRepository.save(client)
    }

    delete(id){
        return this.clientRepository.delete(id)
    }
}