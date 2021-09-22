"use strict";

var router = require('express').Router();

var bcrypt = require('bcrypt');

var User = require('../models/User'); //register


router.post("/register", function _callee(req, res) {
  var salt, hashedPassword, newUser, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 3:
          salt = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, salt));

        case 6:
          hashedPassword = _context.sent;
          //create new user
          newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
          }); //save user and respond

          _context.next = 10;
          return regeneratorRuntime.awrap(newUser.save());

        case 10:
          user = _context.sent;
          res.status(200).json(user._id);
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).json(_context.t0);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
}); //login

router.post("/login", function _callee2(req, res) {
  var user, validPassword;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            username: req.body.username
          }));

        case 3:
          user = _context2.sent;
          !user && res.status(400).json("Wrong username or password"); //validate password

          _context2.next = 7;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, user.password));

        case 7:
          validPassword = _context2.sent;
          !validPassword && res.status(400).json("Wrong username or password"); //send response

          res.status(200).json({
            _id: user._id,
            username: user.username
          });
          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json(_context2.t0);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12]]);
});
module.exports = router;