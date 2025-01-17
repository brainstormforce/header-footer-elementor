"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _forceUi = require("@bsf/force-ui");
var _lucideReact = require("lucide-react");
var _apiFetch = _interopRequireDefault(require("@wordpress/api-fetch"));
var _i18n = require("@wordpress/i18n");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Create a queue to manage AJAX requests
const requestQueue = [];
const processQueue = () => {
  if (requestQueue.length === 0) return;

  // Take the first item from the queue and run it
  const currentRequest = requestQueue.shift();
  currentRequest();
};
const WidgetItem = _ref => {
  let {
    widget,
    updateCounter
  } = _ref;
  const {
    id,
    icon,
    title,
    infoText,
    is_pro,
    is_active,
    slug,
    demo_url,
    doc_url,
    description,
    is_new
  } = widget;

  // Track the active state of the widget using React state
  const [isActive, setIsActive] = (0, _react.useState)(widget.is_active);
  const [isLoading, setIsLoading] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    // Update local state when the widget prop changes
    setIsActive(widget.is_active);
  }, [widget.is_active, updateCounter]);
  const apiCall = activateWidget => {
    const action = activateWidget ? 'hfe_deactivate_widget' : 'hfe_activate_widget';
    const formData = new window.FormData();
    formData.append('action', action);
    formData.append('nonce', hfe_admin_data.nonce);
    formData.append('module_id', id);
    formData.append('is_pro', is_pro);
    try {
      const data = (0, _apiFetch.default)({
        url: hfe_admin_data.ajax_url,
        method: 'POST',
        body: formData
      });
      if (data.success) {
        setIsActive(isActive); // Update the active state after the request
      } else if (data.error) {}
    } catch (err) {} finally {
      setIsLoading(false); // Always stop the loading spinner
      processQueue();
    }
  };
  const handleSwitchChange = () => {
    if (isLoading) return;
    setIsLoading(true);
    if (isActive) {
      // Add the request to the queue
      setIsActive(false);
      requestQueue.push(() => apiCall(isActive));
    } else {
      // Add the request to the queue
      setIsActive(true);
      requestQueue.push(() => apiCall(isActive));
    }
    if (requestQueue.length === 1) {
      // Start processing the queue if no other request is being processed
      processQueue();
    }
  };
  return /*#__PURE__*/_react.default.createElement(_forceUi.Container, {
    align: "center",
    containerType: "flex",
    direction: "column",
    justify: "between",
    gap: ""
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center justify-between w-full"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: `h-10 w-10 mb-5 ${icon?.props}`,
    style: {
      fontSize: '22px'
    }
  }, icon), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center gap-x-2",
    style: {
      marginBottom: '15px'
    }
  }, is_pro && /*#__PURE__*/_react.default.createElement(_forceUi.Badge, {
    label: "PRO",
    size: "xs",
    type: "pill",
    variant: "inverse"
  }), !is_pro && /*#__PURE__*/_react.default.createElement(_forceUi.Switch, {
    onChange: handleSwitchChange // Updated to use the new function
    ,
    size: "sm",
    value: isActive,
    className: "hfe-remove-ring"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-col w-full"
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "text-sm font-medium text-text-primary pt-3 m-0 pb-1"
  }, title), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center justify-between w-full"
  }, demo_url && /*#__PURE__*/_react.default.createElement("a", {
    href: demo_url,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "text-sm text-text-tertiary m-0 mb-1 hfe-remove-ring",
    style: {
      textDecoration: 'none',
      lineHeight: '1.5rem'
    }
  }, (0, _i18n.__)('View Demo', 'header-footer-elementor')), /*#__PURE__*/_react.default.createElement("div", {
    className: `${!demo_url ? 'hfe-tooltip-wrap' : ''}`
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Tooltip, {
    arrow: true,
    content: /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("span", {
      className: "font-semibold block mb-2"
    }, title), /*#__PURE__*/_react.default.createElement("span", {
      className: "block mb-2"
    }, description), doc_url && /*#__PURE__*/_react.default.createElement("a", {
      href: doc_url,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "cursor-pointer",
      style: {
        color: '#B498E5',
        textDecoration: 'none'
      }
    }, /*#__PURE__*/_react.default.createElement(_lucideReact.FileText, {
      style: {
        color: '#B498E5',
        width: '11px',
        height: '11px',
        marginRight: '3px'
      }
    }), (0, _i18n.__)('Read Documentation', 'header-footer-elementor'))),
    placement: "bottom",
    title: "",
    triggers: ['click'],
    variant: "dark",
    size: "xs"
  }, /*#__PURE__*/_react.default.createElement(_lucideReact.InfoIcon, {
    className: "h-5 w-5",
    size: 18,
    color: "#A0A5B2"
  }))))));
};
var _default = exports.default = WidgetItem;