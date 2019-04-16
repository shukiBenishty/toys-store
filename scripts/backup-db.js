"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _mongooseModels = _interopRequireWildcard(require("../node_modules/chat-plugin/lib/mongooseModels"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = (0, _mongooseModels["default"])('User');
var Group = (0, _mongooseModels["default"])('Group');
var Message = (0, _mongooseModels["default"])('Message');

_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var users, groups, messages, db;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _mongooseModels.dbInit)('mongodb://localhost/DB_shop');

        case 3:
          _context.next = 5;
          return User.find({});

        case 5:
          users = _context.sent;
          _context.next = 8;
          return Group.find({});

        case 8:
          groups = _context.sent;
          _context.next = 11;
          return Message.find({});

        case 11:
          messages = _context.sent;
          db = {
            users: users,
            messages: messages,
            groups: groups
          };

          _fs["default"].writeFile(_path["default"].resolve(__dirname, './db-old.json'), JSON.stringify(db, null, 2), function (err) {
            if (err) {
              console.error(err);
              process.exit(1);
            }

            process.exit(0);
          });

          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 16]]);
}))();