"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _forceUi = require("@bsf/force-ui");
var _i18n = require("@wordpress/i18n");
var _index = require("../../router/index");
var _routes = require("../../admin/settings/routes");
var _apiFetch = _interopRequireDefault(require("@wordpress/api-fetch"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Import the custom Link component
// Import the routes object

const TemplateSection = () => {
  const [loading, setLoading] = (0, _react.useState)(true);
  const [templatesStatus, setTemplatesStatus] = (0, _react.useState)(null);
  const [redirectUrl, setRedirectUrl] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    const fetchSettings = () => {
      setLoading(true);
      (0, _apiFetch.default)({
        path: '/hfe/v1/templates',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': hfeSettingsData.uael_nonce_action // Use the correct nonce
        }
      }).then(data => {
        setTemplatesStatus(data.templates_status);
        if (data.redirect_url) {
          setRedirectUrl(data.redirect_url); // Save URL in state variable
        }
        setLoading(false); // Stop loading
      }).catch(err => {
        setLoading(false); // Stop loading
      });
    };
    fetchSettings();
  }, []);
  const handleButtonClick = e => {
    if ('Activated' === templatesStatus && redirectUrl) {
      window.open(redirectUrl, '_blank');
    }
  };
  if (loading) {
    return;
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "box-border hfe-dashboard-templates p-4 bg-white rounded-lg shadow-md mb-6 hfe-subheading"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: `${hfeSettingsData.templates_url}`,
    alt: "Template Showcase",
    className: "w-full h-auto rounded"
  })), /*#__PURE__*/_react.default.createElement(_forceUi.Title, {
    className: "mt-2",
    icon: null,
    iconPosition: "right",
    size: "xs",
    tag: "h2",
    title: (0, _i18n.__)("Build Websites 10x Faster with Templates", "header-footer-elementor")
  }), /*#__PURE__*/_react.default.createElement("p", {
    className: "text-text-secondary text-text-tertiary mt-2 mb-2 text-sm"
  }, (0, _i18n.__)("Choose from our professionally designed websites to build your site faster, with easy customization options.", "header-footer-elementor")), 'Activated' !== templatesStatus ? /*#__PURE__*/_react.default.createElement(_index.Link, {
    to: _routes.routes.templates.path,
    className: "w-full"
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Button, {
    className: "w-full mt-4",
    icon: null,
    iconPosition: "left",
    size: "md",
    variant: "secondary"
  }, (0, _i18n.__)('View Templates', 'header-footer-elementor'))) : /*#__PURE__*/_react.default.createElement(_forceUi.Button, {
    className: "w-full mt-4",
    icon: null,
    iconPosition: "left",
    size: "md",
    variant: "secondary",
    onClick: handleButtonClick
  }, (0, _i18n.__)('View Templates', 'header-footer-elementor')));
};
var _default = exports.default = TemplateSection;