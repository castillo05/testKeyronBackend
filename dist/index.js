"use strict";

var _models = _interopRequireDefault(require("./models"));

var _app = _interopRequireDefault(require("./app"));

var _dotenv = require("dotenv");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();
const {
  PORT
} = process.env;

(async () => {
  try {
    _app.default.listen(PORT, async () => {
      await _models.default.sequelize.authenticate().then(() => {
        console.log("Connect to Database in http://localhost:".concat(PORT, "/api"));
      }).catch(error => {
        console.log(error);
      });
    });
  } catch (error) {
    console.log(error);
  }
})();