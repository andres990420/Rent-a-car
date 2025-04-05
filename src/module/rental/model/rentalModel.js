const {DataTypes, Model} =  require('sequelize');
const { CarModel } = require('../../car/carModule');
const { ClientModel } = require('../../client/clientModule');

module.exports =  class RentalModel extends Model{
    static setup(sequelizeInstance){
        RentalModel.init(
            {
                id : {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                car : {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: CarModel,
                        key: 'id'
                    }
                },
                client : {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references:{
                        model: ClientModel,
                        key: 'id'
                    }
                },
                pricePerDay : {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
                startedAt : {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                endedAt : {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                totalPrice : {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
                paymentMethod : {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                isPaid : {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                }
            },
            {
                sequelize: sequelizeInstance,
                modelName : 'Rental',
                tableName: 'rentals',
                timestamps: true,
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            }
        )
        return RentalModel;
    }

    static setAssociations(){
        CarModel.hasMany(RentalModel,{
            foreignKey: 'car',
            onDelete: 'CASCADE',
        });

        RentalModel.belongsTo(CarModel, {
            foreignKey: 'car',
        });

        ClientModel.hasMany(RentalModel,{
            foreignKey: 'client',
            onDelete: 'CASCADE',
        });

        RentalModel.belongsTo(ClientModel, {
            foreignKey: 'client',
        });

        return RentalModel;
    }
}