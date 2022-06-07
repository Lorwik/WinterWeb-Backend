const { sequelize } = require("../config/mysql")
const { DataTypes } = require("sequelize");

const Cuenta = sequelize.define(
  "cuentas",
  {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    salt: {
        type: DataTypes.STRING,
    },
    id_recuperacion: {
        type: DataTypes.STRING,
    },  
    last_ip: {
        type: DataTypes.STRING,
    },
    gemas: {
        type: DataTypes.NUMBER,
    },
    status: {
        type: DataTypes.NUMBER,
    },
    id_confirmacion: {
        type: DataTypes.STRING,
    },  
    macaddress: {
        type: DataTypes.STRING,
    },  
    serialhd: {
        type: DataTypes.STRING,
    },  
    vip: {
        type: DataTypes.DATE,
    },  
    role: {
      type: DataTypes.ENUM(["user", "mod", "admin"]),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Cuenta;