const {Model , DataTypes} = require('sequelize');

module.exports = class CarModel extends Model{
    static setup(sequelizeInstance){
        CarModel.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                brand: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                model : {
                    type : DataTypes.STRING,
                    allowNull: false,
                },
                year : {
                    type : DataTypes.INTEGER,
                    allowNull: false
                },
                mileage : {
                    type : DataTypes.INTEGER,
                    allowNull: false
                },
                color : {
                    type : DataTypes.STRING,
                    allowNull: false
                },
                ac : {
                    type : DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: true,
                },
                capacity: {
                    type : DataTypes.INTEGER,
                    allowNull: false
                },
                transmission: {
                    type : DataTypes.STRING,
                    allowNull: false
                },
                pricePerDay: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                }
            },
            {
                sequelize: sequelizeInstance,
                modelName : 'Car',
                tableName: 'cars',
                timestamps: true,
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            }
        );
        return CarModel;
    }

}