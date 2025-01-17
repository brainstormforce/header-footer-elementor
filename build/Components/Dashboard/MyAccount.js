"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _i18n = require("@wordpress/i18n");
var _forceUi = require("@bsf/force-ui");
var _lucideReact = require("lucide-react");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const MyAccount = () => {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_forceUi.Title, {
    description: "",
    icon: null,
    iconPosition: "right",
    size: "sm",
    tag: "h2",
    title: (0, _i18n.__)('My Account', 'header-footer-elementor')
  }), /*#__PURE__*/_react.default.createElement(_forceUi.Container, {
    align: "stretch",
    className: "bg-background-primary p-6 rounded-lg",
    containerType: "flex",
    direction: "column",
    gap: "sm",
    justify: "start",
    style: {
      marginTop: "24px"
    }
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Container.Item, {
    className: "flex flex-col space-y-2"
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "text-base font-semibold m-0"
  }, (0, _i18n.__)('License Key', 'header-footer-elementor')), /*#__PURE__*/_react.default.createElement("p", {
    className: "text-sm font-normal m-0"
  }, (0, _i18n.__)('You are using the free version of Ultimate Addons for Elementor, no license key is needed.. '))), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center justify-between px-4 rounded-xl",
    style: {
      paddingTop: '6px',
      paddingBottom: '6px',
      backgroundColor: "#F3F0FF"
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "flex items-center gap-x-2 text-base font-semibold"
  }, (0, _i18n.__)('Unlock Pro Features', 'header-footer-elementor'), /*#__PURE__*/_react.default.createElement("p", {
    className: "text-base font-normal"
  }, (0, _i18n.__)('Get access to advanced blocks and premium features.', 'header-footer-elementor'))), /*#__PURE__*/_react.default.createElement(_forceUi.Button, {
    icon: /*#__PURE__*/_react.default.createElement(_lucideReact.ArrowUpRight, null),
    iconPosition: "right",
    variant: "link",
    style: {
      color: '#6005FF',
      borderColor: '#6005FF',
      transition: 'color 0.3s ease, border-color 0.3s ease',
      fontSize: '16px'
    },
    className: "hfe-remove-ring text-[#6005FF]",
    onClick: () => {
      window.open("https://ultimateelementor.com/pricing/?utm_source=uae-lite-settings&utm_medium=My-accounts&utm_campaign=uae-lite-upgrade", '_blank');
    }
  }, (0, _i18n.__)('Upgrade Now', 'header-footer-elementor')))));
};
var _default = exports.default = MyAccount;