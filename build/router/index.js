"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Link", {
  enumerable: true,
  get: function () {
    return _link.Link;
  }
});
Object.defineProperty(exports, "Route", {
  enumerable: true,
  get: function () {
    return _route2.Route;
  }
});
exports.Router = void 0;
Object.defineProperty(exports, "RouterContext", {
  enumerable: true,
  get: function () {
    return _context.RouterContext;
  }
});
Object.defineProperty(exports, "history", {
  enumerable: true,
  get: function () {
    return _context.history;
  }
});
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _element = require("@wordpress/element");
var _utils = require("./utils");
var _context = require("./context");
var _route2 = require("./route");
var _link = require("./link");
var _pathToRegexp = require("path-to-regexp");
class Router extends _element.Component {
  constructor(props) {
    super(props);

    // Convert our routes into an array for easy 404 checking
    (0, _defineProperty2.default)(this, "handleRouteChange", location => {
      localStorage.setItem('hfeSelectedItemId', '1');
      const route = (0, _utils.locationToRoute)(location?.location);
      this.setState({
        route: route
      });
    });
    this.routes = Object.keys(props.routes).map(key => props.routes[key].path);

    // Listen for path changes from the history API
    this.unlisten = _context.history.listen(this.handleRouteChange);
    const _route = (0, _utils.locationToRoute)(_context.history.location);
    const {
      search
    } = _context.history.location;

    // Define the initial RouterContext value
    this.state = {
      route: _route,
      defaultRoute: props?.defaultRoute ? `${search}#${props?.defaultRoute}` : `${search}#/`
    };
  }
  componentWillUnmount() {
    // Stop listening for changes if the Router component unmounts
    this.unlisten();
  }
  render() {
    // Define our variables
    const {
      children,
      NotFound
    } = this.props;
    const {
      route,
      defaultRoute
    } = this.state;
    if (!route.hash) {
      _context.history.push(defaultRoute);
      return /*#__PURE__*/React.createElement("div", null);
    }
    let matched = false;
    // match route
    (this.routes || []).forEach(name => {
      const checkMatch = (0, _pathToRegexp.match)(route.hash.substr(1));
      const isMatched = checkMatch(`${route.hash.substr(1)}`);
      if (!isMatched) {
        return;
      }
      matched = {
        name,
        data: isMatched
      };
    });
    const routerContextValue = {
      route,
      matched
    };

    // Check if 404 if no route matched
    const is404 = !matched;
    return /*#__PURE__*/React.createElement(_context.RouterContext.Provider, {
      value: routerContextValue
    }, is404 ? /*#__PURE__*/React.createElement("div", null, "Not found") : children);
  }
}
exports.Router = Router;