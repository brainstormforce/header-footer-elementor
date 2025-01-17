"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _forceUi = require("@bsf/force-ui");
var _lucideReact = require("lucide-react");
var _HeaderLine = _interopRequireDefault(require("../HeaderLine"));
var _i18n = require("@wordpress/i18n");
const WelcomeContainer = () => {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_forceUi.Container, {
    align: "center",
    className: "bg-background-primary border-[0.5px] border-subtle rounded-xl shadow-sm mb-6 p-8 flex flex-col lg:flex-row",
    containerType: "flex",
    direction: "row",
    gap: "sm"
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Container.Item, {
    shrink: 1
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Title, {
    description: "",
    icon: null,
    iconPosition: "right",
    className: "max-w-lg",
    size: "lg",
    tag: "h3",
    title: (0, _i18n.__)("Welcome to Ultimate Addons for Elementor!", "header-footer-elementor")
  }), /*#__PURE__*/_react.default.createElement(_HeaderLine.default, null), /*#__PURE__*/_react.default.createElement("p", {
    className: "text-sm font-medium text-text-tertiary m-0 mt-2"
  }, (0, _i18n.__)("We're excited to help you supercharge your website-building experience. Effortlessly design stunning websites with our comprehensive range of free and premium widgets and features.", "header-footer-elementor")), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center pt-6 gap-2"
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Button, {
    iconPosition: "right",
    variant: "primary",
    className: "bg-[#6005FF] hfe-remove-ring",
    style: {
      backgroundColor: "#6005FF",
      transition: "background-color 0.3s ease"
    },
    onMouseEnter: e => e.currentTarget.style.backgroundColor = "#4B00CC",
    onMouseLeave: e => e.currentTarget.style.backgroundColor = "#6005FF",
    onClick: () => {
      window.open(hfeSettingsData.hfe_post_url, "_blank");
    }
  }, (0, _i18n.__)("Create Header/Footer", "header-footer-elementor")), /*#__PURE__*/_react.default.createElement(_forceUi.Button, {
    icon: /*#__PURE__*/_react.default.createElement(_lucideReact.Plus, null),
    iconPosition: "right",
    variant: "outline",
    className: "hfe-remove-ring",
    style: {
      color: "#7D4CDB",
      borderColor: "#E9DFFC"
    },
    onMouseEnter: e => e.currentTarget.style.color = "#000000",
    onMouseLeave: e => (e.currentTarget.style.color = "#7D4CDB") && (e.currentTarget.style.borderColor = "#E9DFFC"),
    onClick: () => {
      window.open(hfeSettingsData.elementor_page_url, "_blank");
    }
  }, (0, _i18n.__)("Create New Page", "header-footer-elementor")), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      color: "black",
      background: "none",
      border: "none",
      padding: 0,
      cursor: "pointer"
    },
    onMouseEnter: e => e.currentTarget.style.color = "#6005ff",
    onMouseLeave: e => e.currentTarget.style.color = "black",
    onClick: () => {
      window.open("https://ultimateelementor.com/docs/getting-started-with-ultimate-addons-for-elementor-lite/", "_blank");
    }
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Button, {
    icon: /*#__PURE__*/_react.default.createElement(_lucideReact.ExternalLink, null),
    iconPosition: "right",
    variant: "link",
    className: "hfe-remove-ring text-black"
  }, (0, _i18n.__)("Read full guide", "header-footer-elementor")))))));
};
var _default = exports.default = WelcomeContainer;