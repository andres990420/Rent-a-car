module.exports = class Client{
    constructor({
        id,
        name,
        lastName,
        dni,
        birthday,
        email,
        phone,
        address
    }){
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.dni = dni;
        this.birthday = birthday;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }
}