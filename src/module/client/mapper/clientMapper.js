const Client = require('../entity/client')

function formToEntity(
    id,
    name,
    lastName,
    documentType,
    documentNumber,
    nationality,
    address,
    phoneNumber,
    email,
    birthday,
    createdAt,
    updatedAt
){
    const client = new Client(
        id,
        name,
        lastName,
        documentType,
        Number(documentNumber),
        nationality,
        address,
        Number(phoneNumber),
        email,
        birthday,
        createdAt,
        updatedAt
    )

    return client
}

function modelToEntity(
    id,
    name,
    lastName,
    documentType,
    documentNumber,
    nationality,
    address,
    phoneNumber,
    email,
    birthday,
    createdAt,
    updatedAt
){
    const client = new Client(
        id,
        name,
        lastName,
        documentType,
        Number(documentNumber),
        nationality,
        address,
        Number(phoneNumber),
        email,
        birthday,
        createdAt,
        updatedAt
    )

    return client
}

module.exports = {
    formToEntity, modelToEntity
}