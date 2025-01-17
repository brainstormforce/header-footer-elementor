"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _i18n = require("@wordpress/i18n");
var _SettingsContext = require("@context/SettingsContext.js");
var _forceUi = require("@bsf/force-ui");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Import localization function

function Settings() {
  const {
    settings,
    saveSettings
  } = (0, _react.useContext)(_SettingsContext.SettingsContext);
  const {
    status = 'idle',
    error = null
  } = settings || {};

  // Show toast for API errors
  (0, _react.useEffect)(() => {
    if (status === 'failed' && error) {
      _forceUi.toast.error((0, _i18n.__)('Error loading settings'), {
        description: error
      });
    }
  }, [status, error]);

  // Handle loading state
  if (status === 'loading') {
    return /*#__PURE__*/_react.default.createElement(_forceUi.Skeleton, {
      variant: "rectangular",
      className: "w-full h-full"
    });
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100"
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Toaster, {
    dismissAfter: 3000
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center justify-between w-[696px] h-[40px] mb-4 gap-2 mx-auto"
  }, /*#__PURE__*/_react.default.createElement("h2", {
    className: "text-xl font-bold"
  }, (0, _i18n.__)('General Settings')), /*#__PURE__*/_react.default.createElement(_forceUi.Button, {
    variant: "primary"
  }, (0, _i18n.__)('Save'))));
}
var _default = exports.default = Settings;