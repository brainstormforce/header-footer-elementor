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
const QuickAccess = () => {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "box-border hfe-dashboard-quick-access p-4 bg-white rounded-lg shadow-md",
    style: {
      width: "-webkit-fill-available"
    }
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Title, {
    className: "mb-2",
    icon: null,
    iconPosition: "right",
    size: "xs",
    tag: "h3",
    title: (0, _i18n.__)("Quick Access", "header-footer-elementor")
  }), /*#__PURE__*/_react.default.createElement(_forceUi.Container, {
    align: "stretch",
    className: "p-1 rounded-lg gap-1",
    containerType: "flex",
    direction: "column",
    gap: "",
    justify: "start",
    style: {
      width: "100%",
      backgroundColor: "#F9FAFB"
    }
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Container.Item, {
    alignSelf: "auto",
    className: "p-4 bg-white rounded-lg shadow-container-item",
    order: "none",
    shrink: 1
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Button, {
    className: "text-black hfe-remove-ring",
    icon: /*#__PURE__*/_react.default.createElement(_lucideReact.Headphones, null),
    iconPosition: "left",
    variant: "link",
    onClick: () => {
      window.open("https://ultimateelementor.com/contact/", "_blank");
    }
  }, (0, _i18n.__)("Contact Us", "header-footer-elementor"))), /*#__PURE__*/_react.default.createElement(_forceUi.Container.Item, {
    className: "p-4 bg-white rounded-lg shadow-container-item"
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Button, {
    className: "text-black hfe-remove-ring",
    icon: /*#__PURE__*/_react.default.createElement(_lucideReact.HelpCircle, null),
    iconPosition: "left",
    variant: "link",
    onClick: () => {
      window.open("https://ultimateelementor.com/docs/", "_blank");
    }
  }, (0, _i18n.__)("Help Centre", "header-footer-elementor"))), /*#__PURE__*/_react.default.createElement(_forceUi.Container.Item, {
    className: "p-4 bg-white rounded-lg shadow-container-item"
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Button, {
    className: "text-black hfe-remove-ring",
    icon: /*#__PURE__*/_react.default.createElement(_lucideReact.NotepadText, null),
    iconPosition: "left",
    variant: "link",
    onClick: () => {
      window.open("https://ideas.ultimateelementor.com/boards/feature-requests", "_blank");
    }
  }, (0, _i18n.__)("Request a Feature", "header-footer-elementor")))));
};
var _default = exports.default = QuickAccess;