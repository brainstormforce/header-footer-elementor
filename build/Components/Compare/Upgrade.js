"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _forceUi = require("@bsf/force-ui");
var _ExtendWebsite = _interopRequireDefault(require("../Dashboard/ExtendWebsite"));
var _QuickAccess = _interopRequireDefault(require("../Dashboard/QuickAccess"));
var _NavMenu = _interopRequireDefault(require("../NavMenu"));
var _UpgradeNotice = _interopRequireDefault(require("../UpgradeNotice"));
var _react = _interopRequireDefault(require("react"));
var _FreevsPro = _interopRequireDefault(require("./FreevsPro"));
var _UltimateCompare = _interopRequireDefault(require("./UltimateCompare"));
const Upgrade = () => {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_NavMenu.default, null), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_forceUi.Container, {
    align: "stretch",
    className: "p-6 flex-col lg:flex-row box-border",
    containerType: "flex",
    direction: "row",
    gap: "sm",
    justify: "start",
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Container.Item, {
    className: "p-2 hfe-65-width",
    alignSelf: "auto",
    order: "none",
    shrink: 0
  }, /*#__PURE__*/_react.default.createElement(_FreevsPro.default, null)), /*#__PURE__*/_react.default.createElement(_forceUi.Container.Item, {
    className: "p-2 w-full hfe-35-width",
    shrink: 1
  }, /*#__PURE__*/_react.default.createElement(_UltimateCompare.default, null), /*#__PURE__*/_react.default.createElement(_ExtendWebsite.default, null), /*#__PURE__*/_react.default.createElement(_QuickAccess.default, null)))));
};
var _default = exports.default = Upgrade;