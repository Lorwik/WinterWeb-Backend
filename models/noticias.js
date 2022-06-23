const { sequelize } = require("../config/mysql")
const { DataTypes } = require("sequelize");
const Cuenta = require("./cuentas");

const Noticia = sequelize.define(
  "noticias",
  {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cuerpo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cuentaid: {
      type: DataTypes.INTEGER,
    }
  },
  {
    timestamps: true,
  }
);

// TODO: Por ahora no se usa.

Noticia.findAllData = function () {
  Noticia.belongsTo(Cuenta, {
    foreignKey: "cuentaid",
    as: "cuenta",
  });
  return Noticia.findAll({ include: "cuenta" });
};

Noticia.findOneData = function (id) {
  Noticia.belongsTo(Cuenta, {
    foreignKey: "cuentaid",
    as: "cuenta",
  });
  return Noticia.findOne({ where: { id }, include: "cuenta" });
};

Noticia.createNoticia = function (body) {
  Noticia.belongsTo(Cuenta, {
    foreignKey: "cuentaid",
    as: "cuenta",
  });
  return Noticia.create({ body, include: "cuenta" });
};

module.exports = Noticia;