"use strict";

module.exports = (sequelize, DataTypes) => {
  const tickets = sequelize.define('tickets', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_user: DataTypes.INTEGER,
    ticket_pedido: DataTypes.STRING
  }, {
    timestamps: false
  });

  tickets.associate = models => {// Asociando Roles con usuarios
  };

  return tickets;
};