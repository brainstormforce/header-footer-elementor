"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _forceUi = require("@bsf/force-ui");
var _i18n = require("@wordpress/i18n");
const HeaderLine = () => {
  return /*#__PURE__*/_react.default.createElement(_forceUi.Title, {
    className: "hfe-header-title my-4",
    description: "",
    icon: null,
    iconPosition: "right",
    size: "xs",
    tag: "h6",
    title: (0, _i18n.__)('Formerly Elementor Header & Footer Builder', 'header-footer-elementor')
  });
};
var _default = exports.default = HeaderLine;