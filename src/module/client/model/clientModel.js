const {Model , DataTypes} = require('sequelize');

module.exports = class ClientModel extends Model{
    static setup(sequelizeInstance){
        ClientModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                name : {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                lastName : {
                    type : DataTypes.STRING,
                    allowNull: false,
                },
                documentType : {
                    type : DataTypes.STRING,
                    allowNull: false
                },
                documentNumber : {
                    type : DataTypes.INTEGER,
                    allowNull: false
                },
                nationality : {
                    type : DataTypes.STRING,
                    allowNull: false
                },
                address : {
                    type : DataTypes.STRING,
                    allowNull: false
                },
                phoneNumber : {
                    type : DataTypes.INTEGER,
                    allowNull: false
                },
                email : {
                    type : DataTypes.STRING,
                    allowNull: false
                },
                birthday: {
                    type: DataTypes.DATE,
                    allowNull: false,
                }
            },
            {
                sequelize: sequelizeInstance,
                modelName : 'Client',
                tableName: 'clients',
                timestamps: true,
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            }
        );
        return ClientModel;
    }
}