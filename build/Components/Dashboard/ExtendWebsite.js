"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _ExtendWebsiteWidget = _interopRequireDefault(require("./ExtendWebsiteWidget"));
var _forceUi = require("@bsf/force-ui");
var _apiFetch = _interopRequireDefault(require("@wordpress/api-fetch"));
var _i18n = require("@wordpress/i18n");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ExtendWebsite = () => {
  const [plugins, setPlugins] = (0, _react.useState)([]);
  const [loading, setLoading] = (0, _react.useState)(true);
  const [updateCounter, setUpdateCounter] = (0, _react.useState)(0);
  const [allInstalled, setAllInstalled] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const data = await (0, _apiFetch.default)({
          path: '/hfe/v1/plugins',
          headers: {
            'Content-Type': 'application/json',
            'X-WP-Nonce': hfeSettingsData.hfe_nonce_action
          }
        });
        const pluginsData = convertToPluginsArray(data);
        setPlugins(pluginsData);

        // Check if all plugins are installed
        const areAllInstalled = pluginsData.every(plugin => plugin.is_installed);
        setAllInstalled(areAllInstalled);
      } catch (err) {
        console.error("Error fetching plugins:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [updateCounter]);
  function convertToPluginsArray(data) {
    return Object.keys(data).map(key => ({
      path: key,
      ...data[key]
    }));
  }

  // If all plugins are installed, don't render the component
  if (allInstalled) {
    return null;
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "rounded-lg bg-white w-full mb-6"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center justify-between p-4",
    style: {
      paddingBottom: '0'
    }
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "m-0 text-sm font-semibold text-text-primary"
  }, (0, _i18n.__)("Extend Your Website", "header-footer-elementor")), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center gap-x-2 mr-7"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-col rounded-lg p-4",
    style: {
      backgroundColor: "#F9FAFB"
    }
  }, loading ? /*#__PURE__*/_react.default.createElement(_forceUi.Container, {
    align: "stretch",
    className: "gap-1 p-1 grid grid-cols-1 md:grid-cols-2",
    containerType: "grid",
    justify: "start"
  }, [...Array(2)].map((_, index) => /*#__PURE__*/_react.default.createElement(_forceUi.Container.Item, {
    key: index,
    alignSelf: "auto",
    style: {
      height: '150px'
    },
    className: "text-wrap rounded-md shadow-container-item bg-background-primary p-4"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-col gap-6",
    style: {
      marginTop: '40px'
    }
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Skeleton, {
    className: "w-12 h-2 rounded-md"
  }), /*#__PURE__*/_react.default.createElement(_forceUi.Skeleton, {
    className: "w-16 h-2 rounded-md"
  }), /*#__PURE__*/_react.default.createElement(_forceUi.Skeleton, {
    className: "w-12 h-2 rounded-md"
  }))))) : /*#__PURE__*/_react.default.createElement(_forceUi.Container, {
    align: "stretch",
    className: "gap-1 p-1 grid grid-cols-1 md:grid-cols-2",
    containerType: "grid",
    justify: "start"
  }, plugins.slice(0, 4).map(plugin => /*#__PURE__*/_react.default.createElement(_forceUi.Container.Item, {
    key: plugin.slug,
    alignSelf: "auto",
    className: "text-wrap rounded-md shadow-container-item bg-background-primary p-4"
  }, /*#__PURE__*/_react.default.createElement(_ExtendWebsiteWidget.default, {
    plugin: plugin,
    setUpdateCounter: setUpdateCounter
  }))))));
};
var _default = exports.default = ExtendWebsite;