"use strict";

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_tipouser: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    mail: DataTypes.STRING,
    pass: DataTypes.STRING
  }, {});

  users.associate = models => {// Asociando Roles con usuarios
  };

  return users;
};