"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _forceUi = require("@bsf/force-ui");
var _NavMenu = _interopRequireDefault(require("../NavMenu"));
var _ExploreTemplates = _interopRequireDefault(require("./ExploreTemplates"));
const Templates = () => {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_NavMenu.default, null), /*#__PURE__*/_react.default.createElement("div", {
    className: ""
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Container, {
    align: "stretch",
    className: "p-2",
    containerType: "flex",
    direction: "row",
    gap: "sm",
    justify: "center",
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Container.Item, {
    className: "p-2",
    alignSelf: "auto",
    order: "none",
    shrink: 1,
    style: {
      width: "90%"
    }
  }, /*#__PURE__*/_react.default.createElement(_ExploreTemplates.default, null)))));
};
var _default = exports.default = Templates;