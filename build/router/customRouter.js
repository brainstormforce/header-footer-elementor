"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("./index");
var _Dashboard = _interopRequireDefault(require("../Components/Dashboard/Dashboard"));
var _Features = _interopRequireDefault(require("../Components/Widgets/Features"));
var _Templates = _interopRequireDefault(require("../Components/Templates/Templates"));
var _Settings = _interopRequireDefault(require("../Components/Settings/Settings"));
var _routes = require("../admin/settings/routes");
var _Upgrade = _interopRequireDefault(require("../Components/Compare/Upgrade"));
const CustomRouter = () => /*#__PURE__*/React.createElement(_index.Router, {
  routes: _routes.routes,
  defaultRoute: _routes.routes?.dashboard?.path
}, /*#__PURE__*/React.createElement(_index.Route, {
  path: _routes.routes.dashboard.path
}, /*#__PURE__*/React.createElement(_Dashboard.default, null)), /*#__PURE__*/React.createElement(_index.Route, {
  path: _routes.routes.widgets.path
}, /*#__PURE__*/React.createElement(_Features.default, null)), /*#__PURE__*/React.createElement(_index.Route, {
  path: _routes.routes.templates.path
}, /*#__PURE__*/React.createElement(_Templates.default, null)), /*#__PURE__*/React.createElement(_index.Route, {
  path: _routes.routes.settings.path
}, /*#__PURE__*/React.createElement(_Settings.default, null)), /*#__PURE__*/React.createElement(_index.Route, {
  path: _routes.routes.upgrade.path
}, /*#__PURE__*/React.createElement(_Upgrade.default, null)));
var _default = exports.default = CustomRouter;