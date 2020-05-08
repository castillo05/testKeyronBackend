"use strict";

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("./endPoints/users"));

var _tickets = _interopRequireDefault(require("./endPoints/tickets"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_express.default.json()); //configurar cabeceras http

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY,Origin,X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
app.use('/api', _users.default);
app.use('/api', _tickets.default);
app.use('/api', (req, res) => {
  res.status(200).json({
    message: 'Bienvenido a la Api Keyron'
  });
});
module.exports = app;