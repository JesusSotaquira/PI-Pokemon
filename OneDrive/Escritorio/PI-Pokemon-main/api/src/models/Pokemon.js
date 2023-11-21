const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Pokemon = sequelize.define('Pokemon', {
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
    Imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Vida: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Ataque: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Defensa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Velocidad: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Altura: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    Peso: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
  });

  return Pokemon;
};
