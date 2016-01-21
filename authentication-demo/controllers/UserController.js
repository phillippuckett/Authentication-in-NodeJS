var exports = module.exports = {},
    User = require('../models/UserModel');

exports.getUser = function (req, res) {
  console.log(req.user);
};
