'use strict';

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = require("dotenv");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();
const {
  PRIVATEKEYTOKEN
} = process.env;

module.exports.authenticate = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({
      message: 'La peticion no tiene la cabecera de autenticacion'
    });
  }

  var token = req.headers.authorization.replace(/['"]+/g, '');

  try {
    _jsonwebtoken.default.verify(token, PRIVATEKEYTOKEN, (err, decode) => {
      if (err) return res.status(401).send({
        message: err
      });
      req.user = decode;
      next();
    });
  } catch (error) {
    return res.status(404).send({
      message: 'Token no valido'
    });
  }
};