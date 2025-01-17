"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _forceUi = require("@bsf/force-ui");
var _lucideReact = require("lucide-react");
var _i18n = require("@wordpress/i18n");
const UltimateCompare = () => {
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
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "",
    style: {
      paddingBottom: '16px'
    }
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Container, {
    className: "bg-background-primary gap-1 p-4 border-[0.5px] border-subtle rounded-xl shadow-sm",
    containerType: "flex",
    direction: "column",
    justify: "between",
    gap: "xs"
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Container.Item, {
    className: "flex flex-col justify-center items-center"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: `${hfeSettingsData.column_url}`,
    alt: (0, _i18n.__)("Column Showcase", "header-footer-elementor"),
    className: "h-auto rounded w-1/2"
  })), /*#__PURE__*/_react.default.createElement(_forceUi.Container.Item, {
    className: "flex flex-col justify-between"
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
    className: "py-1 text-sm"
  }), /*#__PURE__*/_react.default.createElement("p", {
    className: "text-md m-0 text-text-secondary"
  }, (0, _i18n.__)('Get access to advanced widgets and features to create the website that stands out!', 'header-footer-elementor'))), /*#__PURE__*/_react.default.createElement("div", {
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
    title: feature.title,
    className: "text-md m-0 text-text-secondary hfe-compare-section"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: ""
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Button, {
    iconPosition: "right",
    variant: "secondary",
    className: "hfe-remove-ring",
    style: {
      width: "100%"
    },
    onClick: () => {
      window.open("https://ultimateelementor.com/pricing/?utm_source=uae-lite-free-vs-pro&utm_medium=My-accounts&utm_campaign=uae-lite-upgrade", '_blank');
    }
  }, (0, _i18n.__)('Upgrade Now', 'header-footer-elementor'))))));
};
var _default = exports.default = UltimateCompare;