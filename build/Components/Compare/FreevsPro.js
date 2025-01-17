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
const FreevsPro = () => {
  const sections = [{
    title: (0, _i18n.__)("Essentials", "header-footer-elementor"),
    items: [{
      id: 1,
      content: (0, _i18n.__)("White Label Option", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 2,
      content: (0, _i18n.__)("24/7 Premium Support", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 3,
      content: (0, _i18n.__)("Cross-Domain Copy-Paste", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }]
  }, {
    title: (0, _i18n.__)("Dynamic Header & Footer Widgets", "header-footer-elementor"),
    items: [{
      id: 1,
      content: (0, _i18n.__)("Post Info", "header-footer-elementor"),
      iconFree: true,
      iconPro: false
    }, {
      id: 2,
      content: (0, _i18n.__)("Scroll to Top", "header-footer-elementor"),
      iconFree: true,
      iconPro: false
    }, {
      id: 3,
      content: (0, _i18n.__)("Breadcrumbs", "header-footer-elementor"),
      iconFree: true,
      iconPro: false
    }, {
      id: 4,
      content: (0, _i18n.__)("Retina Logo", "header-footer-elementor"),
      iconFree: true,
      iconPro: false
    }, {
      id: 5,
      content: (0, _i18n.__)("Copyright", "header-footer-elementor"),
      iconFree: true,
      iconPro: false
    }, {
      id: 6,
      content: (0, _i18n.__)("Page Title", "header-footer-elementor"),
      iconFree: true,
      iconPro: false
    }, {
      id: 7,
      content: (0, _i18n.__)("Site Tagline", "header-footer-elementor"),
      iconFree: true,
      iconPro: false
    }, {
      id: 8,
      content: (0, _i18n.__)("Site Logo", "header-footer-elementor"),
      iconFree: true,
      iconPro: false
    }, {
      id: 9,
      content: (0, _i18n.__)("Search", "header-footer-elementor"),
      iconFree: true,
      iconPro: false
    }, {
      id: 10,
      content: (0, _i18n.__)("Navigation Menu", "header-footer-elementor"),
      iconFree: true,
      iconPro: false
    }]
  }, {
    title: (0, _i18n.__)("Creative & Advanced Design Widgets", "header-footer-elementor"),
    items: [{
      id: 1,
      content: (0, _i18n.__)("Advanced Heading", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 2,
      content: (0, _i18n.__)("Dual Color Heading", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 3,
      content: (0, _i18n.__)("Fancy Heading", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 4,
      content: (0, _i18n.__)("Multi-Button", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 5,
      content: (0, _i18n.__)("Image Hotspots", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }]
  }, {
    title: (0, _i18n.__)("Content & Media Widgets", "header-footer-elementor"),
    items: [{
      id: 1,
      content: (0, _i18n.__)("Content Toggle Button", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 2,
      content: (0, _i18n.__)("Image Gallery", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 3,
      content: (0, _i18n.__)("Video Gallery", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 4,
      content: (0, _i18n.__)("Table", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 5,
      content: (0, _i18n.__)("Timeline", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 6,
      content: (0, _i18n.__)("Google Map", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 7,
      content: (0, _i18n.__)("Before & After Slider", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 8,
      content: (0, _i18n.__)("Info Box", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 9,
      content: (0, _i18n.__)("Video", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 10,
      content: (0, _i18n.__)("Conditional Display", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 11,
      content: (0, _i18n.__)("Login Form", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 12,
      content: (0, _i18n.__)("User Registeration Form", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }]
  }, {
    title: (0, _i18n.__)("Marketing & Engagement Widgets", "header-footer-elementor"),
    items: [{
      id: 1,
      content: (0, _i18n.__)("Marketing Button", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 2,
      content: (0, _i18n.__)("Pricing Table", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 3,
      content: (0, _i18n.__)("Price List", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 4,
      content: (0, _i18n.__)("Countdown Timer", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 5,
      content: (0, _i18n.__)("Business Hours", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 6,
      content: (0, _i18n.__)("Modal Popup", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }]
  }, {
    title: (0, _i18n.__)("E-Commerce Integration", "header-footer-elementor"),
    items: [{
      id: 1,
      content: (0, _i18n.__)("WooCommerce: Add to Cart", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 2,
      content: (0, _i18n.__)("WooCommerce: Product Category", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 3,
      content: (0, _i18n.__)("WooCommerce: Mini Cart", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 4,
      content: (0, _i18n.__)("WooCommerce: Product", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 5,
      content: (0, _i18n.__)("WooCommerce: Checkout", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }]
  }, {
    title: (0, _i18n.__)("Forms Integration", "header-footer-elementor"),
    items: [{
      id: 1,
      content: (0, _i18n.__)("Contact Form 7", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 2,
      content: (0, _i18n.__)("Gravity Forms", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 3,
      content: (0, _i18n.__)("WPForms", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 4,
      content: (0, _i18n.__)("Fluent Forms", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }]
  }, {
    title: (0, _i18n.__)("SEO Widgets", "header-footer-elementor"),
    items: [{
      id: 1,
      content: (0, _i18n.__)("FAQ with Schema", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 2,
      content: (0, _i18n.__)("How-To", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 3,
      content: (0, _i18n.__)("Table of Contents", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 4,
      content: (0, _i18n.__)("Business Reviews", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }]
  }, {
    title: (0, _i18n.__)("Creative Features", "header-footer-elementor"),
    items: [{
      id: 1,
      content: (0, _i18n.__)("Presets", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 2,
      content: (0, _i18n.__)("Welcome Music", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 3,
      content: (0, _i18n.__)("Particles", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 4,
      content: (0, _i18n.__)("Party Propz", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 5,
      content: (0, _i18n.__)("Shape Divider", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }]
  }, {
    title: (0, _i18n.__)("Social Media Integration", "header-footer-elementor"),
    items: [{
      id: 1,
      content: (0, _i18n.__)("Instagram Feed", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 2,
      content: (0, _i18n.__)("Twitter Feed", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 3,
      content: (0, _i18n.__)("Social Share", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }]
  }, {
    title: (0, _i18n.__)("Advanced Features", "header-footer-elementor"),
    items: [{
      id: 1,
      content: (0, _i18n.__)("Retina Image", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 2,
      content: (0, _i18n.__)("Team Member", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 3,
      content: (0, _i18n.__)("Post Layout", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }, {
      id: 4,
      content: (0, _i18n.__)("Off Canvas", "header-footer-elementor"),
      iconFree: false,
      iconPro: true
    }]
  }];
  const renderIcon = isAvailable => isAvailable ? /*#__PURE__*/_react.default.createElement(_lucideReact.Check, {
    color: "#16A34A"
  }) : /*#__PURE__*/_react.default.createElement(_lucideReact.X, {
    color: "#DC2626"
  });
  const renderItems = items => items.map(item => /*#__PURE__*/_react.default.createElement("div", {
    key: item.id,
    className: "flex fle-row py-4 px-5 items-center h-4 justify-between rounded-lg shadow-container-item"
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "text-sm text-text-secondary font-medium"
  }, item.content), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-row items-center justify-between",
    style: {
      gap: item.id === 10 && item.content === (0, _i18n.__)("Navigation Menu", "header-footer-elementor") ? "10.7rem" : "12rem"
    }
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "text-sm text-text-primary font-medium"
  }, item.id === 10 && item.content === (0, _i18n.__)("Navigation Menu", "header-footer-elementor") ? item.iconPro ? (0, _i18n.__)("Advanced", "header-footer-elementor") : (0, _i18n.__)("Basic", "header-footer-elementor") : renderIcon(item.iconFree)), /*#__PURE__*/_react.default.createElement("p", {
    className: "text-sm text-text-primary font-medium",
    style: {
      marginRight: item.id === 10 && item.content === (0, _i18n.__)("Navigation Menu", "header-footer-elementor") ? "25px" : "50px"
    }
  }, item.id === 10 && item.content === (0, _i18n.__)("Navigation Menu", "header-footer-elementor") ? item.iconPro ? (0, _i18n.__)("Basic", "header-footer-elementor") : (0, _i18n.__)("Advanced", "header-footer-elementor") : renderIcon(item.iconPro)))));
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "rounded-lg bg-white w-full mb-6"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center justify-between p-5",
    style: {
      paddingBottom: "0"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-col"
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "m-0 text-xl font-semibold pt-4 text-text-primary"
  }, (0, _i18n.__)("Free Vs Pro", "header-footer-elementor")), /*#__PURE__*/_react.default.createElement("p", {
    className: "m-0 text-sm font-normal pt-1 text-text-secondary"
  }, (0, _i18n.__)("Ultimate Addons for Elementor Pro offers 50+ widgets and features!", "header-footer-elementor")), /*#__PURE__*/_react.default.createElement("p", {
    className: "m-0 text-sm font-normal pt-1 text-text-secondary"
  }, (0, _i18n.__)("Compare the popular features/widgets to find the best option for your website.", "header-footer-elementor"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center gap-x-2 mr-7"
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Button, {
    iconPosition: "right",
    variant: "primary",
    style: {
      color: "white",
      borderColor: "#6005FF",
      transition: "color 0.3s ease, border-color 0.3s ease",
      backgroundColor: "#6005ff"
    },
    className: "hfe-remove-ring text-[#6005FF]",
    onClick: () => {
      window.open("https://ultimateelementor.com/pricing/?utm_source=uae-lite-FreevsPro&utm_medium=get-uae-pro&utm_campaign=uae-lite-upgrade", "_blank");
    }
  }, (0, _i18n.__)("Upgrade Now", "header-footer-elementor")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "px-4"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-col space-y-2 pt-5"
  }, sections.map(section => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
    key: section.title
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex fle-row py-4 px-5 items-center h-4 justify-between rounded-lg shadow-container-item",
    style: {
      backgroundColor: "#F9FAFB"
    }
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "text-sm text-text-primary font-medium"
  }, section.title), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-row items-center",
    style: {
      gap: "12rem"
    }
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "text-sm text-text-primary font-medium"
  }, (0, _i18n.__)("Free", "header-footer-elementor")), /*#__PURE__*/_react.default.createElement("p", {
    className: "text-sm text-text-primary font-medium",
    style: {
      marginRight: "50px"
    }
  }, (0, _i18n.__)("Pro", "header-footer-elementor")))), renderItems(section.items))))));
};
var _default = exports.default = FreevsPro;