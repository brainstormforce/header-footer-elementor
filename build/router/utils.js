"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.locationToRoute = locationToRoute;
var _querystringify = _interopRequireDefault(require("querystringify"));
function locationToRoute(location) {
  // location comes from the history package
  return {
    path: location.pathname,
    hash: location.hash,
    query: _querystringify.default.parse(location.search)
  };
}