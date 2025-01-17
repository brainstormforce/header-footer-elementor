"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _WidgetItem = _interopRequireDefault(require("./WidgetItem"));
var _lucideReact = require("lucide-react");
var _forceUi = require("@bsf/force-ui");
var _apiFetch = _interopRequireDefault(require("@wordpress/api-fetch"));
var _i18n = require("@wordpress/i18n");
var _routes = require("../../admin/settings/routes");
var _index = require("../../router/index");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Widgets = () => {
  const [allWidgetsData, setAllWidgetsData] = (0, _react.useState)(null); // Initialize state.
  const [loading, setLoading] = (0, _react.useState)(true);
  (0, _react.useEffect)(() => {
    const fetchSettings = () => {
      setLoading(true);
      (0, _apiFetch.default)({
        path: '/hfe/v1/widgets',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': hfeSettingsData.hfe_nonce_action // Use the correct nonce
        }
      }).then(data => {
        const widgetsData = convertToWidgetsArray(data);
        setAllWidgetsData(widgetsData);
        setLoading(false); // Stop loading
      }).catch(err => {
        setLoading(false); // Stop loading
      });
    };
    fetchSettings();
  }, []);
  function convertToWidgetsArray(data) {
    const widgets = [];
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const widget = data[key];
        widgets.push({
          id: key,
          // Using the key as 'widgetTitle'
          slug: widget.slug,
          title: widget.title,
          keywords: widget.keywords,
          icon: /*#__PURE__*/_react.default.createElement("i", {
            className: widget.icon
          }),
          title_url: widget.title_url,
          default: widget.default,
          doc_url: widget.doc_url,
          is_pro: widget.is_pro,
          description: widget.description,
          is_active: widget.is_activate !== undefined ? widget.is_activate : true,
          // Check if is_activate is set
          demo_url: widget.demo_url !== undefined ? widget.demo_url : widget.doc_url
        });
      }
    }
    return widgets;
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
  }, "Widgets / Features"), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center gap-x-2 mr-7"
  }, /*#__PURE__*/_react.default.createElement(_index.Link, {
    to: _routes.routes.widgets.path,
    className: "text-sm text-text-primary cursor-pointer",
    style: {
      lineHeight: '1rem'
    }
  }, "View All", /*#__PURE__*/_react.default.createElement(_lucideReact.ArrowUpRight, {
    className: "ml-1",
    size: 13
  })))), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex bg-black flex-col rounded-lg p-4"
  }, loading ? /*#__PURE__*/_react.default.createElement(_forceUi.Container, {
    align: "stretch",
    className: "p-2 gap-1.5 grid grid-cols-2 md:grid-cols-4",
    style: {
      backgroundColor: "#F9FAFB"
    },
    containerType: "grid",
    gap: "",
    justify: "start"
  }, [...Array(16)].map((_, index) => /*#__PURE__*/_react.default.createElement(_forceUi.Container.Item, {
    key: index,
    alignSelf: "auto",
    className: "text-wrap rounded-md shadow-container-item bg-background-primary p-6 space-y-2"
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Skeleton, {
    className: "w-12 h-2 rounded-md"
  }), /*#__PURE__*/_react.default.createElement(_forceUi.Skeleton, {
    className: "w-16 h-2 rounded-md"
  }), /*#__PURE__*/_react.default.createElement(_forceUi.Skeleton, {
    className: "w-12 h-2 rounded-md"
  })))) : /*#__PURE__*/_react.default.createElement(_forceUi.Container, {
    align: "stretch",
    className: "p-2 gap-1.5 grid grid-cols-2 md:grid-cols-4",
    style: {
      backgroundColor: "#F9FAFB"
    },
    containerType: "grid",
    gap: "",
    justify: "start"
  }, allWidgetsData?.slice(0, 16).map(widget => /*#__PURE__*/_react.default.createElement(_forceUi.Container.Item, {
    key: widget.id,
    alignSelf: "auto",
    className: "text-wrap rounded-md shadow-container-item bg-background-primary p-4"
  }, /*#__PURE__*/_react.default.createElement(_WidgetItem.default, {
    widget: widget,
    key: widget.id,
    updateCounter: 0
  }))))));
};
var _default = exports.default = Widgets;