"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _forceUi = require("@bsf/force-ui");
var _lucideReact = require("lucide-react");
var _index = require("../../router/index");
var _routes = require("../../admin/settings/routes");
var _i18n = require("@wordpress/i18n");
const UltimateFeatures = () => {
  const featureData = [{
    id: 1,
    icon: "",
    title: (0, _i18n.__)("Modal Popup", "header-footer-elementor")
  }, {
    id: 2,
    icon: "",
    title: (0, _i18n.__)("Advanced Heading", "header-footer-elementor")
  }, {
    id: 3,
    icon: "",
    title: (0, _i18n.__)("Post Layouts", "header-footer-elementor")
  }, {
    id: 4,
    icon: "",
    title: (0, _i18n.__)("Info Box", "header-footer-elementor")
  }, {
    id: 5,
    icon: "",
    title: (0, _i18n.__)("Pricing Cards", "header-footer-elementor")
  }, {
    id: 6,
    icon: "",
    title: (0, _i18n.__)("Form Stylers and more...", "header-footer-elementor")
  }];
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_forceUi.Container, {
    className: "bg-background-primary p-4 border-[0.5px] border-subtle rounded-xl shadow-sm",
    containerType: "flex",
    direction: "row",
    justify: "between",
    gap: "xs"
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Container.Item, {
    className: "flex flex-col pt-6 pb-3 justify-between",
    style: {
      width: "65%"
    }
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_forceUi.Title, {
    description: "",
    icon: /*#__PURE__*/_react.default.createElement(_lucideReact.Zap, null),
    iconPosition: "left",
    size: "xs",
    tag: "h6",
    title: (0, _i18n.__)("Unlock Ultimate Features", "header-footer-elementor"),
    className: "text-xs font-semibold text-brand-primary-600"
  }), /*#__PURE__*/_react.default.createElement(_forceUi.Title, {
    description: "",
    icon: "",
    iconPosition: "left",
    tag: "h6",
    title: (0, _i18n.__)("Create Stunning Designs with the Pro Version!", "header-footer-elementor"),
    className: "py-1 text-[12px]"
  }), /*#__PURE__*/_react.default.createElement("p", {
    className: "text-sm m-0 text-text-secondary"
  }, (0, _i18n.__)("Get access to advanced widgets and features to create the website that stands out!", "header-footer-elementor"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "grid grid-cols-2 grid-flow-row gap-1 my-4"
  }, featureData.map(feature => /*#__PURE__*/_react.default.createElement(_forceUi.Title, {
    key: feature.id,
    description: "",
    icon: /*#__PURE__*/_react.default.createElement(_lucideReact.Check, {
      className: "text-brand-primary-600 mr-1 h-3 w-3"
    }),
    iconPosition: "left",
    size: "xs",
    tag: "h6",
    title: (0, _i18n.__)(feature.title, "header-footer-elementor"),
    className: "text-[14px]"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center pb-3 gap-4"
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Button, {
    variant: "secondary",
    className: "hfe-remove-ring",
    onClick: () => {
      window.open("https://ultimateelementor.com/pricing/?utm_source=uae-lite-dashboard&utm_medium=unlock-ultimate-feature&utm_campaign=uae-lite-upgrade", "_blank");
    }
  }, (0, _i18n.__)("Upgrade Now", "header-footer-elementor")), /*#__PURE__*/_react.default.createElement(_index.Link, {
    className: "text-black cursor-pointer",
    to: _routes.routes.upgrade.path
  }, (0, _i18n.__)("Compare Free vs Pro", "header-footer-elementor")))), /*#__PURE__*/_react.default.createElement(_forceUi.Container.Item, {
    className: "flex justify-center items-center",
    style: {
      width: "34%"
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: `${hfeSettingsData.column_url}`,
    alt: (0, _i18n.__)("Column Showcase", "header-footer-elementor"),
    className: "w-full h-auto rounded"
  }))));
};
var _default = exports.default = UltimateFeatures;