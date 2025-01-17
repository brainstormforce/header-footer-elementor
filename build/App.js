"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
require("@fontsource/figtree");
require("@fontsource/figtree/400.css");
require("@fontsource/figtree/400-italic.css");
var _customRouter = _interopRequireDefault(require("./router/customRouter"));
var _forceUi = require("@bsf/force-ui");
var _UpgradeNotice = _interopRequireDefault(require("./Components/UpgradeNotice"));
// Defaults to weight 400
// Specify weight
// Specify weight and style

const App = () => {
  const [loaded, setLoaded] = (0, _react.useState)(false);
  const [showTopBar, setShowTopBar] = (0, _react.useState)(true); // State to manage the visibility of the top bar

  // scroll top on route change
  window.onhashchange = () => {
    window.scrollTo(0, 0);
  };

  // Simulate loading (replace with actual loading logic if needed)
  (0, _react.useEffect)(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000); // Simulating a load delay of 1 second
  }, []);
  if (!loaded) {
    return /*#__PURE__*/React.createElement("div", {
      className: "loading-spinner flex items-center justify-center h-screen",
      style: {
        background: "#F9FAFB"
      }
    }, /*#__PURE__*/React.createElement(_forceUi.Loader, {
      icon: null,
      size: "lg",
      variant: "primary"
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "app-container font-figtree"
  }, /*#__PURE__*/React.createElement(_customRouter.default, null));
};
var _default = exports.default = App;