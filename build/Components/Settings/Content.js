"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
const Content = _ref => {
  let {
    selectedItem
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "p-6",
    style: {
      marginLeft: '4px'
    }
  }, /*#__PURE__*/_react.default.createElement("div", null, selectedItem?.content));
};
var _default = exports.default = Content;