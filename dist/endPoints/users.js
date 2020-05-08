"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _models = _interopRequireDefault(require("../models"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _dotenv = require("dotenv");

var _authenticate = _interopRequireDefault(require("../middleware/authenticate"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();

const api = _express.default.Router();

const {
  PRIVATEKEYTOKEN
} = process.env;

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

      if (pass) {
        _bcrypt.default.hash(pass, 10).then(hash => {
          _models.default.users.create({
            id_tipouser: id_tipouser,
            nombre: nombre,
            mail: mail,
            pass: hash
          }).then(ress => {
            res.status(201).send({
              message: 'Usuario Registrado con exito'
            });
          }).catch(error => {
            console.log(error);
          });
        });
      } else {
        res.status(200).send({
          message: 'Por favor introduzca la contraseña'
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}).post('/users/login', async (req, res) => {
  const {
    mail,
    pass
  } = req.body;

  if (mail === '') {
    return res.status(200).send({
      message: 'Introduzca el correo'
    });
  }

  _models.default.sequelize.sync().then(() => {
    _models.default.users.findAll({
      where: {
        mail: mail
      }
    }).then(users => {
      console.log(users);

      if (users) {
        if (users.length <= 0) {
          return res.status(200).send({
            message: 'Este correo no existe'
          });
        }

        users.forEach(element => {
          console.log(element.dataValues.mail);

          if (pass) {
            _bcrypt.default.compare(pass, element.dataValues.pass).then(check => {
              if (!check) {
                return res.status(200).send({
                  message: 'Contraseña Incorrecta'
                });
              }

              let token = _jsonwebtoken.default.sign({
                user: element
              }, PRIVATEKEYTOKEN, {
                expiresIn: 60 * 60
              });

              res.status(200).send({
                token: token,
                user: element
              });
            });
          } else {
            res.status(200).send({
              message: 'Introduzca la contraseña'
            });
          }
        });
      }
    }).catch(error => {
      console.log(error);
    });
  }).catch(error => {
    console.log(error);
  });
}).get('/users', async (req, res) => {
  try {
    _models.default.users.findAll({}).then(ress => {
      res.status(200).send({
        users: ress
      });
    });
  } catch (error) {
    console.log(error);
  }
});

exports.default = _default;