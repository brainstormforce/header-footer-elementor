"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _forceUi = require("@bsf/force-ui");
var _Sidebar = _interopRequireDefault(require("./Sidebar"));
var _Content = _interopRequireDefault(require("./Content"));
var _NavMenu = _interopRequireDefault(require("../NavMenu"));
var _ThemeSupport = _interopRequireDefault(require("./ThemeSupport"));
var _VersionControl = _interopRequireDefault(require("./VersionControl"));
var _MyAccount = _interopRequireDefault(require("../Dashboard/MyAccount"));
var _i18n = require("@wordpress/i18n");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Settings = () => {
  const items = [{
    id: 1,
    icon: /*#__PURE__*/_react.default.createElement("img", {
      src: `${hfeSettingsData.user_url}`,
      alt: (0, _i18n.__)("Custom SVG", "header-footer-elementor"),
      className: "object-contain"
    }),
    selected: /*#__PURE__*/_react.default.createElement("img", {
      src: `${hfeSettingsData.user__selected_url}`,
      alt: (0, _i18n.__)("Custom SVG", "header-footer-elementor"),
      className: "object-contain"
    }),
    title: (0, _i18n.__)("My Account", "header-footer-elementor"),
    content: /*#__PURE__*/_react.default.createElement(_MyAccount.default, null)
  }, {
    id: 2,
    icon: /*#__PURE__*/_react.default.createElement("img", {
      src: `${hfeSettingsData.theme_url}`,
      alt: (0, _i18n.__)("Custom SVG", "header-footer-elementor"),
      className: "object-contain"
    }),
    selected: /*#__PURE__*/_react.default.createElement("img", {
      src: `${hfeSettingsData.theme_url_selected}`,
      alt: (0, _i18n.__)("Custom SVG", "header-footer-elementor"),
      className: "object-contain"
    }),
    main: (0, _i18n.__)("Editor", "header-footer-elementor"),
    title: (0, _i18n.__)("Theme Support", "header-footer-elementor"),
    content: /*#__PURE__*/_react.default.createElement(_ThemeSupport.default, null)
  }, {
    id: 3,
    icon: /*#__PURE__*/_react.default.createElement("img", {
      src: `${hfeSettingsData.version_url}`,
      alt: (0, _i18n.__)("Custom SVG", "header-footer-elementor"),
      className: "object-contain"
    }),
    selected: /*#__PURE__*/_react.default.createElement("img", {
      src: `${hfeSettingsData.version__selected_url}`,
      alt: (0, _i18n.__)("Custom SVG", "header-footer-elementor"),
      className: "object-contain"
    }),
    main: (0, _i18n.__)("Utilities", "header-footer-elementor"),
    title: (0, _i18n.__)("Version Control", "header-footer-elementor"),
    content: /*#__PURE__*/_react.default.createElement(_VersionControl.default, null)
  }].filter(item => {
    if ("no" === hfeSettingsData.show_theme_support && item.id === 2) {
      return false;
    }
    return true;
  });

  // Default state: Set 'My Account' (first item) as the default when the settings tab is clicked
  const [selectedItem, setSelectedItem] = (0, _react.useState)(() => {
    const savedItemId = localStorage.getItem("hfeSelectedItemId");
    const savedItem = items.find(item => item.id === Number(savedItemId));
    return savedItem || items[0]; // Default to the first item if no saved item is found
  });
  (0, _react.useEffect)(() => {
    // Store selectedItemId in localStorage (or other persistent storage) to retain selection
    localStorage.setItem("hfeSelectedItemId", selectedItem.id.toString());
  }, [selectedItem]);
  (0, _react.useEffect)(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab) {
      const itemId = Number(tab);
      const item = items.find(item => item.id === itemId);
      if (item) {
        setSelectedItem(item);
      }
    }
  }, []);
  const handleSelectItem = item => {
    setSelectedItem(item);
  };
  const handleSettingsTabClick = () => {
    setSelectedItem(items[0]); // Set "My Account" as the default item when settings tab is clicked
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_NavMenu.default, {
    onSettingsTabClick: handleSettingsTabClick
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: ""
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Container, {
    align: "stretch",
    className: "p-1 flex-col lg:flex-row hfe-settings-page",
    containerType: "flex",
    direction: "row",
    gap: "sm",
    justify: "start",
    style: {
      height: "100%"
    }
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Container.Item, {
    className: "p-2 hfe-sticky-outer-wrapper",
    alignSelf: "auto",
    order: "none",
    shrink: 1,
    style: {
      backgroundColor: "#ffffff"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "hfe-sticky-sidebar"
  }, /*#__PURE__*/_react.default.createElement(_Sidebar.default, {
    items: items,
    onSelectItem: handleSelectItem,
    selectedItemId: selectedItem.id
  }))), /*#__PURE__*/_react.default.createElement(_forceUi.Container.Item, {
    className: "p-2 flex w-full justify-center items-start hfe-hide-scrollbar",
    alignSelf: "auto",
    order: "none",
    shrink: 1,
    style: {
      height: "calc(100vh - 1px)",
      overflowY: "auto"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "hfe-78-width"
  }, /*#__PURE__*/_react.default.createElement(_Content.default, {
    selectedItem: selectedItem
  }))))));
};
var _default = exports.default = Settings;