const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const Tipo  = sequelize.define('Tipo', {

        ID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },        
        Nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    })

    return Tipo;
}