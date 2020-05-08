"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = _interopRequireDefault(require("../models"));

var _express = _interopRequireDefault(require("express"));

var _dotenv = require("dotenv");

var _authenticate = _interopRequireDefault(require("../middleware/authenticate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();

const api = _express.default.Router();

var _default = api.post('/tickets', async (req, res) => {
  try {
    const {
      id_user,
      ticket_pedido
    } = req.body;

    if (id_user == '' || ticket_pedido == '') {
      return res.status(406).send({
        message: 'Por favor llenar todos los campos'
      });
    }

    _models.default.tickets.create({
      id_user: id_user,
      ticket_pedido: ticket_pedido
    }).then(ticket => {
      res.status(201).send({
        message: 'Ticket Creado con Exito'
      });
    }).catch(error => {
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }
}).get('/tickets', async (req, res) => {
  try {
    await _models.default.tickets.findAll({}).then(ress => {
      res.status(200).send({
        tickets: ress
      });
    }).catch(error => {
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }
}).get('/tickets/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await _models.default.tickets.findAll({
      where: {
        id: id
      }
    }).then(ress => {
      res.status(200).send({
        tickets: ress
      });
    }).catch(error => {
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }
}).put('/tickets/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const {
      id_user,
      ticket_pedido
    } = req.body;
    await _models.default.tickets.update({
      id_user: id_user,
      ticket_pedido: ticket_pedido
    }, {
      where: {
        id: id
      }
    }).then(ress => {
      res.status(200).send({
        message: 'Ticket actualizado con exito'
      });
    }).catch(error => {
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }
}).delete('/tickets/:id', async (req, res) => {
  try {
    const id = req.params.id;

    _models.default.tickets.destroy({
      where: {
        id: id
      }
    }).then(ress => {
      res.status(200).send({
        message: 'Ticket Eliminado Satisfactoriamente'
      });
    }).catch(error => {
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }
}).get('/tickets/usuario/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await _models.default.tickets.findAll({
      where: {
        id_user: id
      }
    }).then(ress => {
      res.status(200).send({
        tickets: ress
      });
    }).catch(error => {
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }
});

exports.default = _default;