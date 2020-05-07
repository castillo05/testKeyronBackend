"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _models = _interopRequireDefault(require("../models"));

var _dotenv = require("dotenv");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();

const api = _express.default.Router();

var _default = api.post('/users', async (req, res) => {
  try {
    const {
      id_tipouser,
      nombre,
      mail,
      pass
    } = req.body;

    _models.default.users.findAll({
      where: {
        mail: mail
      }
    }).then(user => {
      if (user.length >= 1) {
        return res.status(200).send({
          message: 'Este email ya existe'
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

exports.default = _default;