"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _forceUi = require("@bsf/force-ui");
var _i18n = require("@wordpress/i18n");
var _reactHotToast = _interopRequireWildcard(require("react-hot-toast"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const radioData = [{
  id: "1",
  title: (0, _i18n.__)('Option 1 (Recommended)', 'header-footer-elementor'),
  description: (0, _i18n.__)("This option will automatically replace your theme's header and footer files with custom templates from the plugin. It works with most themes and is selected by default.", "header-footer-elementor"),
  value: "1"
}, {
  id: "2",
  title: (0, _i18n.__)('Option 2', 'header-footer-elementor'),
  description: (0, _i18n.__)("This option will automatically replace your theme's header and footer files with custom templates from the plugin. It works with most themes and is selected by default.", "header-footer-elementor"),
  value: "2"
}];
const ThemeSupport = () => {
  if ("no" === hfeSettingsData.show_theme_support) {
    return null;
  }

  // State to store the selected radio option
  const [selectedOption, setSelectedOption] = (0, _react.useState)(hfeSettingsData.theme_option);
  const [isInitialLoad, setIsInitialLoad] = (0, _react.useState)(true);
  (0, _react.useEffect)(() => {
    setIsInitialLoad(false);
  }, []);
  const handleRadioChange = event => {
    const newValue = event.target.value;
    setSelectedOption(newValue); // Update the selected option in state.

    // Only send the AJAX call if this is not the initial load.
    if (!isInitialLoad) {
      saveOption(newValue);
    }
  };

  // Function to save the selected option.
  const saveOption = async option => {
    try {
      const response = await fetch(hfe_admin_data.ajax_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          action: 'save_theme_compatibility_option',
          // WordPress action for your AJAX handler.
          hfe_compatibility_option: option,
          nonce: hfe_admin_data.nonce // Nonce for security.
        })
      });
      const result = await response.json();
      if (result.success) {
        _reactHotToast.default.success((0, _i18n.__)('Settings saved successfully!', 'header-footer-elementor'));
      } else {
        _reactHotToast.default.error((0, _i18n.__)('Failed to save settings!', 'header-footer-elementor'));
      }
    } catch (error) {
      _reactHotToast.default.error((0, _i18n.__)('Failed to save settings!', 'header-footer-elementor'));
    }
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_forceUi.Title, {
    description: "",
    icon: null,
    iconPosition: "right",
    size: "sm",
    tag: "h2",
    title: (0, _i18n.__)('Theme Support', 'header-footer-elementor')
  }), /*#__PURE__*/_react.default.createElement(_forceUi.Container, {
    align: "stretch",
    className: "bg-background-primary p-6 rounded-lg",
    containerType: "flex",
    direction: "column",
    gap: "sm",
    justify: "start",
    style: {
      marginTop: "24px",
      maxWidth: "696px"
    }
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Container.Item, {
    className: "flex flex-col space-y-1"
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "text-base font-semibold m-0"
  }, (0, _i18n.__)('Select Option to Add Theme Support', 'header-footer-elementor')), /*#__PURE__*/_react.default.createElement("p", {
    className: "text-sm font-normal m-0"
  }, (0, _i18n.__)(`To ensure compatibility between the header/footer and your theme, please choose one of the following options to enable theme support:`, 'header-footer-elementor'))), /*#__PURE__*/_react.default.createElement(_forceUi.Container.Item, {
    className: "p-2 space-y-4",
    alignSelf: "auto",
    order: "none"
  }, radioData.map(item => /*#__PURE__*/_react.default.createElement("div", {
    key: item.id,
    className: "flex items-start gap-1 justify-center cursor-pointer"
  }, /*#__PURE__*/_react.default.createElement("input", {
    id: item.id,
    value: item.value,
    type: "radio",
    className: "mt-1 cursor-pointer hfe-radio-field",
    name: "theme-support-option" // Group radio buttons
    ,
    onChange: handleRadioChange // Track the change
    ,
    checked: selectedOption === item.value // Controlled input
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-col cursor-pointer"
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Label, {
    size: "sm",
    variant: "neutral",
    className: "text-sm font-semibold text-text-secondary cursor-pointer flex flex-col items-start justify-start",
    htmlFor: item.id
  }, item.title, ":", /*#__PURE__*/_react.default.createElement("p", {
    className: "m-0 text-sm font-normal text-text-secondary cursor-pointer"
  }, item.description)))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center p-4 border rounded-lg text-start",
    style: {
      paddingTop: '16px',
      paddingBottom: '16px',
      backgroundColor: "#F3F0FF"
    }
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "m-0 text-sm"
  }, /*#__PURE__*/_react.default.createElement("strong", null, (0, _i18n.__)('Note:', 'header-footer-elementor')), " ", (0, _i18n.__)('If neither option works, please contact your theme author to add support for this plugin.', 'header-footer-elementor')))), /*#__PURE__*/_react.default.createElement(_reactHotToast.Toaster, {
    position: "top-right",
    reverseOrder: false,
    gutter: 8,
    containerStyle: {
      top: 20,
      right: 20,
      marginTop: '80px'
    },
    toastOptions: {
      duration: 5000,
      style: {
        background: 'white'
      },
      success: {
        duration: 3000,
        style: {
          color: ''
        },
        iconTheme: {
          primary: '#6005ff',
          secondary: '#fff'
        }
      }
    }
  }));
};
var _default = exports.default = ThemeSupport;