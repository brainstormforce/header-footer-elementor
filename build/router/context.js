"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.history = exports.RouterContext = void 0;
var _history = require("history");
var _utils = require("./utils");
const history = exports.history = (0, _history.createBrowserHistory)();
const RouterContext = exports.RouterContext = wp.element.createContext({
  route: (0, _utils.locationToRoute)(history.location)
});