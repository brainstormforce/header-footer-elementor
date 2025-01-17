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
const ExploreTemplates = () => {
  const [loading, setLoading] = (0, _react.useState)(true);
  const [templatesStatus, setTemplatesStatus] = (0, _react.useState)(null);
  const [redirectUrl, setRedirectUrl] = (0, _react.useState)(null);
  const templateData = [{
    id: 1,
    icon: "",
    title: (0, _i18n.__)("250+ templates for every niche", "header-footer-elementor")
  }, {
    id: 2,
    icon: "",
    title: (0, _i18n.__)("Modern, timeless designs", "header-footer-elementor")
  }, {
    id: 3,
    icon: "",
    title: (0, _i18n.__)("Full design flexibility for easy customization", "header-footer-elementor")
  }, {
    id: 4,
    icon: "",
    title: (0, _i18n.__)("100% responsive across all devices", "header-footer-elementor")
  }];
  (0, _react.useEffect)(() => {
    const fetchSettings = () => {
      setLoading(true);
      (0, _apiFetch.default)({
        path: '/hfe/v1/templates',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': hfeSettingsData.hfe_nonce_action // Use the correct nonce
        }
      }).then(data => {
        setTemplatesStatus(data.templates_status);
        if (data.redirect_url) {
          setRedirectUrl(data.redirect_url); // Save URL in state variable
        }
        setLoading(false); // Stop loading
      }).catch(err => {
        setLoading(false); // Stop loading
      });
    };
    fetchSettings();
  }, []);
  if (loading) {
    return;
  }
  const button_text = 'Install' === templatesStatus ? (0, _i18n.__)('Install Starter Templates', 'header-footer-elementor') : 'Installed' ? (0, _i18n.__)('Activate Starter Templates', 'header-footer-elementor') : '';
  const handleButtonClick = e => {
    if (redirectUrl) {
      window.open(redirectUrl, '_blank');
    } else {
      const buttonElement = document.querySelector('.hfe-starter-template-button span');
      const formData = new window.FormData();
      formData.append('action', 'hfe_recommended_plugin_install');
      formData.append('_ajax_nonce', hfe_admin_data.installer_nonce);
      formData.append('slug', 'astra-sites');
      if (buttonElement && templatesStatus === 'Install') {
        buttonElement.innerText = (0, _i18n.__)('Installing Starter Templates...', 'header-footer-elementor');

        // AJAX call to install the starter template.
        (0, _apiFetch.default)({
          url: hfe_admin_data.ajax_url,
          method: 'POST',
          body: formData
        }).then(data => {
          if (data.success || data.errorCode === 'folder_exists') {
            buttonElement.innerText = (0, _i18n.__)('Installed Starter Templates', 'header-footer-elementor');
            callAnalyticsWebhook();
            activatePlugin();
          } else {
            buttonElement.innerText = (0, _i18n.__)('Install Starter Templates', 'header-footer-elementor');
          }
        });
      }
      if (buttonElement && templatesStatus === 'Installed') {
        buttonElement.innerText = (0, _i18n.__)('Activating Starter Templates...', 'header-footer-elementor');
        activatePlugin();
      }
    }
  };
  const callAnalyticsWebhook = () => {
    const webhookUrl = 'https://webhook.suretriggers.com/suretriggers/a7ac4b20-18f9-4ec6-9813-dfac83328d00';
    const today = new Date().toISOString().split('T')[0];
    const params = new URLSearchParams({
      source: 'UAE Lite',
      target_plugin: 'Starter Templates',
      date: today // Add today's date
    });
    fetch(`${webhookUrl}?${params.toString()}`, {
      method: 'GET'
    }).then(response => response.json()).then(data => {
      // console.log('Webhook call successful:', data);
    }).catch(error => {
      // console.error('Error calling webhook:', error);
    });
  };
  const activatePlugin = () => {
    const formData = new window.FormData();
    const st_pro_status = hfeSettingsData.st_pro_status;
    var plugin_file = 'astra-sites/astra-sites.php';
    var plugin_slug = 'astra-sites';
    if ('Installed' === st_pro_status && ('Install' === hfeSettingsData.st_status || 'Installed' === hfeSettingsData.st_status)) {
      plugin_file = 'astra-pro-sites/astra-pro-sites.php';
      plugin_slug = 'astra-pro-sites';
    }
    formData.append('action', 'hfe_recommended_plugin_activate');
    formData.append('nonce', hfe_admin_data.nonce);
    formData.append('plugin', plugin_file);
    formData.append('type', 'plugin');
    formData.append('slug', plugin_slug);
    (0, _apiFetch.default)({
      url: hfe_admin_data.ajax_url,
      method: 'POST',
      body: formData
    }).then(data => {
      if (data.success) {
        const buttonElement = document.querySelector('.hfe-starter-template-button');
        if (buttonElement) {
          // Check if buttonElement is not null
          const spanElement = buttonElement.querySelector('span');
          if (spanElement) {
            // Check if spanElement is not null
            spanElement.innerText = (0, _i18n.__)('Activating Starter Templates...', 'header-footer-elementor');
            buttonElement.classList.add('hfe-plugin-activated');
            spanElement.innerText = (0, _i18n.__)('Activated Starter Templates', 'header-footer-elementor');
            location.reload();
          }
        }
      } else {
        const buttonElement = document.querySelector('.hfe-starter-template-button');
        if (buttonElement) {
          // Check if buttonElement is not null
          const spanElement = buttonElement.querySelector('span');
          if (spanElement) {
            // Check if spanElement is not null
            spanElement.innerText = (0, _i18n.__)('Activate Starter Templates', 'header-footer-elementor');
          }
        }
      }
    });
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_forceUi.Container, {
    className: "flex gap-2 flex-col md:flex-row bg-background-primary p-6 md:p-10 border-[0.5px] border-subtle rounded-xl shadow-sm flex-col-reverse",
    containerType: "flex",
    gap: "xs"
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Container.Item, {
    className: "flex flex-col justify-between w-full mt-4  md:w-1/2 mb-4 md:mb-0"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_forceUi.Title, {
    description: "",
    icon: /*#__PURE__*/_react.default.createElement(_lucideReact.Zap, null),
    iconPosition: "left",
    size: "xs",
    tag: "h6",
    title: (0, _i18n.__)("Design Your Website in Minutes", "header-footer-elementor"),
    className: "text-xs font-semibold text-brand-primary-600 mb-2"
  }), /*#__PURE__*/_react.default.createElement(_forceUi.Title, {
    description: "",
    icon: "",
    iconPosition: "left",
    tag: "h6",
    title: (0, _i18n.__)("Build your website faster using our prebuilt templates", "header-footer-elementor"),
    className: "py-1 text-sm mb-2"
  }), /*#__PURE__*/_react.default.createElement("p", {
    className: "text-sm md:text-md m-0 text-text-secondary text-text-tertiary"
  }, (0, _i18n.__)('Stop building your site from scratch. Use our professional templates for your stunning website.It is easy to customize and completely responsive. Explore hundreds of designs and bring your vision to life in no time.', 'header-footer-elementor'))), /*#__PURE__*/_react.default.createElement("div", {
    className: "grid grid-cols-1 gap-1 my-4"
  }, templateData.map(template => /*#__PURE__*/_react.default.createElement(_forceUi.Title, {
    key: template.id,
    description: "",
    icon: /*#__PURE__*/_react.default.createElement(_lucideReact.Check, {
      className: "text-brand-primary-600 mr-1 h-3 w-3"
    }),
    iconPosition: "left",
    size: "xs",
    tag: "h6",
    title: (0, _i18n.__)(template.title, 'header-footer-elementor'),
    className: ""
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-col md:flex-row items-center pb-3 gap-4",
    style: {
      marginTop: "15px"
    }
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Button, {
    icon: /*#__PURE__*/_react.default.createElement(_lucideReact.Plus, null),
    iconPosition: "right",
    variant: "secondary",
    style: {
      backgroundColor: "#6005FF",
      outlineWidth: "0px"
    },
    className: "w-auto hfe-starter-template-button hfe-remove-ring cursor-pointer",
    onClick: handleButtonClick
  }, 'Activated' === templatesStatus ? (0, _i18n.__)('Explore Templates', 'header-footer-elementor') : button_text), /*#__PURE__*/_react.default.createElement(_forceUi.Button, {
    icon: "",
    iconPosition: "right",
    variant: "ghost",
    className: "w-auto hfe-link-color hfe-remove-ring",
    onClick: () => {
      window.open('https://startertemplates.com/', '_blank');
    }
  }, (0, _i18n.__)('Learn More', 'header-footer-elementor')))), /*#__PURE__*/_react.default.createElement(_forceUi.Container.Item, {
    className: "flex justify-center md:justify-end w-full md:w-1/2"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: `${hfeSettingsData.template_url}`,
    alt: "Column Showcase",
    className: "object-contain w-full md:w-5/6"
  }))));
};
var _default = exports.default = ExploreTemplates;