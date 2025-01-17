"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Route = Route;
var _context = require("./context");
var _pathToRegexp = require("path-to-regexp");
const {
  useContext
} = wp.element;
let prev = "";
function Route(_ref) {
  let {
    path,
    onRoute,
    children
  } = _ref;
  // Extract route from RouterContext
  const {
    route
  } = useContext(_context.RouterContext);
  const checkMatch = (0, _pathToRegexp.match)(`${path}`);
  const matched = checkMatch(`${route.hash.substr(1)}`);
  if (!matched) {
    return null;
  }
  if (onRoute) {
    if (prev !== matched.path) {
      onRoute();
    }
    prev = matched.path;
  }
  return /*#__PURE__*/React.createElement("div", null, wp.element.cloneElement(children, {
    route: matched
  }));
}