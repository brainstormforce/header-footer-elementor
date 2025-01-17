"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _client = require("react-dom/client");
var _domReady = _interopRequireDefault(require("@wordpress/dom-ready"));
var _App = _interopRequireDefault(require("./App"));
var _NavMenu = _interopRequireDefault(require("./Components/NavMenu"));
require("./styles.css");
// Import from react-dom/client for React 18

(0, _domReady.default)(() => {
  const rootElement = document.getElementById("hfe-settings-app");
  if (rootElement) {
    const root = (0, _client.createRoot)(rootElement); // Use createRoot() for React 18
    root.render(/*#__PURE__*/React.createElement(_App.default, null));
  }
  if ("yes" === hfe_admin_data.show_view_all || window.location.href === hfeSettingsData.header_footer_builder || "yes" === hfeSettingsData.is_hfe_post) {
    const navMenuElement = document.getElementById("hfe-admin-top-bar-root");
    if (navMenuElement) {
      const newDiv = document.createElement("div");
      newDiv.id = "hfe-settings-app";
      navMenuElement.appendChild(newDiv);
      const navMenuRoot = (0, _client.createRoot)(newDiv);
      navMenuRoot.render(/*#__PURE__*/React.createElement(_NavMenu.default, null));
    }
  }
});