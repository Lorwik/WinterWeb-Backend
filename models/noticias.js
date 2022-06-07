const { sequelize } = require("../config/mysql")
const { DataTypes } = require("sequelize");

const Noticia = sequelize.define(
    "cuentas",
    {
      titulo: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      cuerpo: {
          type: DataTypes.STRING,
      }
    },
    {
      timestamps: true,
    }
  );
  
  module.exports = Noticia;