const { sequelize } = require("../config/mysql")
const { DataTypes } = require("sequelize");

const Cuenta = sequelize.define(
  "cuentas",
  {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
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
      type: DataTypes.ENUM(["user", "consejero", "semidios", "dios", "admin"]),
    },
  },
  {
    timestamps: true,
  }
);

Cuenta.find = Cuenta.findAll;
Cuenta.findById = Cuenta.findByPk;
module.exports = Cuenta;