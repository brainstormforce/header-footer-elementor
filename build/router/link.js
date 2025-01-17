"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Link = Link;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _context = require("./context");
var _classnames = _interopRequireDefault(require("classnames"));
var _pathToRegexp = require("path-to-regexp");
const {
  useContext
} = wp.element;
function Link(props) {
  const {
    to,
    onClick,
    children,
    activeClassName
  } = props;
  const {
    route
  } = useContext(_context.RouterContext);
  let state = {
    ...props
  };
  delete state.activeClassName;
  const isActive = () => {
    const checkMatch = (0, _pathToRegexp.match)(`${to}`);
    return checkMatch(`${route.hash.substr(1)}`);
  };
  const handleClick = e => {
    e.preventDefault();
    if (route.path === to && !e.target.classList.contains('hfe-user-icon')) {
      return;
    }
    // Trigger onClick prop manually.
    if (onClick) {
      onClick(e);
    }
    if (to === "elementor-hf" && hfeSettingsData.header_footer_builder) {
      window.location.href = hfeSettingsData.header_footer_builder;
      return;
    }
    const {
      search
    } = _context.history.location;
    const expectedPage = "admin.php?page=hfe";
    const currentHash = window.location.hash;

    // Verify if the current URL is as expected
    if (!search.includes(expectedPage) || !currentHash.includes(to)) {
      // Redirect to the expected URL
      window.location.href = `${hfeSettingsData.hfe_settings_url}#${to}`;
      return;
    }
    if (!to.includes('settings')) {
      // Remove &tab from the URL.
      const newSearch = search.replace(/&tab=[^&]*/, '');
      // Use history API to navigate page.
      _context.history.push(`${newSearch}#${to}`);
    } else {
      const changeSearch = search + '&tab=1';
      if (e.target.classList.contains('hfe-user-icon') && window.location.hash.includes('settings')) {
        window.location.href = `${changeSearch}#${to}`;
      } else {
        // Use history API to navigate page.
        _context.history.push(`${search}#${to}`);
      }
    }
  };
  return /*#__PURE__*/React.createElement("a", (0, _extends2.default)({}, state, {
    className: (0, _classnames.default)({
      [activeClassName]: isActive()
    }, props.className),
    onClick: handleClick
  }), children);
}