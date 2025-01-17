"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _forceUi = require("@bsf/force-ui");
var _lucideReact = require("lucide-react");
var _WidgetItem = _interopRequireDefault(require("../../Dashboard/WidgetItem"));
var _apiFetch = _interopRequireDefault(require("@wordpress/api-fetch"));
var _i18n = require("@wordpress/i18n");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const FeatureWidgets = () => {
  const [allWidgetsData, setAllWidgetsData] = (0, _react.useState)(null); // Initialize state.
  const [searchTerm, setSearchTerm] = (0, _react.useState)('');
  const [loadingActivate, setLoadingActivate] = (0, _react.useState)(false); // Loading state for activate button
  const [loadingDeactivate, setLoadingDeactivate] = (0, _react.useState)(false);
  const [loading, setLoading] = (0, _react.useState)(true);
  const [updateCounter, setUpdateCounter] = (0, _react.useState)(0);
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

  // New function to handle search input change
  const handleSearchChange = event => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Filter widgets based on search term
  const filteredWidgets = allWidgetsData?.filter(widget => widget.title.toLowerCase().includes(searchTerm) || widget.keywords?.some(keyword => keyword.toLowerCase().includes(searchTerm)));
  const handleActivateAll = async () => {
    setLoadingActivate(true);
    const formData = new window.FormData();
    formData.append('action', 'hfe_bulk_activate_widgets');
    formData.append('nonce', hfe_admin_data.nonce);
    (0, _apiFetch.default)({
      url: hfe_admin_data.ajax_url,
      method: 'POST',
      body: formData
    }).then(data => {
      setLoadingActivate(false);
      if (data.success) {
        setAllWidgetsData(prevWidgets => prevWidgets.map(widget => ({
          ...widget,
          is_active: true
        })));
        setUpdateCounter(prev => prev + 1);
      } else if (data.error) {
        setLoadingActivate(false);
        console.error('Error during AJAX request:', error);
      }
    }).catch(error => {
      setLoadingActivate(false);
      console.error('Error during AJAX request:', error);
    });
  };
  const handleDeactivateAll = async () => {
    setLoadingDeactivate(true);
    const formData = new window.FormData();
    formData.append('action', 'hfe_bulk_deactivate_widgets');
    formData.append('nonce', hfe_admin_data.nonce);
    (0, _apiFetch.default)({
      url: hfe_admin_data.ajax_url,
      method: 'POST',
      body: formData
    }).then(data => {
      setLoadingDeactivate(false);
      if (data.success) {
        setAllWidgetsData(prevWidgets => prevWidgets.map(widget => ({
          ...widget,
          is_active: false
        })));
        setUpdateCounter(prev => prev + 1);
      } else if (data.error) {
        console.error('AJAX request failed:', data.error);
      }
    }).catch(error => {
      setLoadingDeactivate(false);
      console.error('Error during AJAX request:', error);
    });
  };
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
    className: "rounded-lg bg-white w-full mb-4"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-col md:flex-row md:items-center md:justify-between p-4",
    style: {
      paddingBottom: '0'
    }
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "m-0 text-sm font-semibold text-text-primary mb-2 md:mb-0"
  }, (0, _i18n.__)("Widgets / Features", "header-footer-elementor")), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-col md:flex-row items-center gap-y-2 md:gap-x-2 md:mr-7 relative"
  }, /*#__PURE__*/_react.default.createElement(_lucideReact.SearchIcon, {
    className: "absolute top-1/2 transform -translate-y-1/2 text-gray-400",
    style: {
      backgroundColor: '#F9FAFB',
      left: '2%',
      width: '18px',
      height: '18px'
    }
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "search",
    placeholder: (0, _i18n.__)('Search...', 'header-footer-elementor'),
    className: "mr-2 pl-10 w-full md:w-auto",
    style: {
      height: '40px',
      borderColor: '#e0e0e0',
      // Default border color
      outline: 'none',
      // Removes the default outline
      boxShadow: 'none',
      backgroundColor: '#F9FAFB' // Removes the default box shadow
    },
    onFocus: e => e.target.style.borderColor = '#6005FF' // Apply focus color
    ,
    onBlur: e => e.target.style.borderColor = '#e0e0e0' // Revert to default color
    ,
    onChange: handleSearchChange
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-row gap-2 w-full md:w-auto"
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Button, {
    icon: loadingActivate ? /*#__PURE__*/_react.default.createElement(_lucideReact.LoaderCircle, {
      className: "animate-spin"
    }) : null,
    iconPosition: "left",
    variant: "outline",
    className: "hfe-bulk-action-button",
    onClick: handleActivateAll // Attach the onClick event.
    ,
    disabled: !!searchTerm
  }, loadingActivate ? (0, _i18n.__)('Activating...', 'header-footer-elementor') : (0, _i18n.__)('Activate All', 'header-footer-elementor')), /*#__PURE__*/_react.default.createElement(_forceUi.Button, {
    icon: loadingDeactivate ? /*#__PURE__*/_react.default.createElement(_lucideReact.LoaderCircle, {
      className: "animate-spin"
    }) : null // Loader for deactivate button.
    ,
    iconPosition: "left",
    variant: "outline",
    onClick: handleDeactivateAll,
    className: "hfe-bulk-action-button",
    disabled: !!searchTerm
  }, loadingDeactivate ? (0, _i18n.__)('Deactivating...', 'header-footer-elementor') : (0, _i18n.__)('Deactivate All', 'header-footer-elementor'))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex bg-black flex-col rounded-lg p-4",
    style: {
      minHeight: "800px"
    }
  }, loading ? /*#__PURE__*/_react.default.createElement(_forceUi.Container, {
    align: "stretch",
    className: "p-2 gap-1.5 grid grid-cols-2 md:grid-cols-4",
    style: {
      backgroundColor: "#F9FAFB"
    },
    containerType: "grid",
    gap: "",
    justify: "start"
  }, [...Array(30)].map((_, index) => /*#__PURE__*/_react.default.createElement(_forceUi.Container.Item, {
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
    className: "p-1 gap-1.5 grid-cols-2 md:grid-cols-4",
    containerType: "grid",
    gap: "",
    justify: "start",
    style: {
      backgroundColor: '#F9FAFB'
    }
  }, filteredWidgets?.map(widget => /*#__PURE__*/_react.default.createElement(_forceUi.Container.Item, {
    key: widget.id,
    alignSelf: "auto",
    className: "text-wrap rounded-md shadow-container-item bg-background-primary p-4"
  }, /*#__PURE__*/_react.default.createElement(_WidgetItem.default, {
    widget: {
      ...widget,
      updateCounter
    },
    key: widget.id,
    updateCounter: updateCounter
  }))))));
};
var _default = exports.default = FeatureWidgets;