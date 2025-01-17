"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _forceUi = require("@bsf/force-ui");
var _apiFetch = _interopRequireDefault(require("@wordpress/api-fetch"));
var _i18n = require("@wordpress/i18n");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ExtendWebsiteWidget = _ref => {
  let {
    plugin,
    setUpdateCounter // Receive setUpdateCounter as a prop
  } = _ref;
  const {
    path,
    slug,
    siteUrl,
    icon,
    type,
    name,
    zipUrl,
    desc,
    wporg,
    isFree,
    action,
    status,
    settings_url
  } = plugin;
  const [isDialogOpen, setIsDialogOpen] = (0, _react.useState)(false);
  const [pluginData, setPluginData] = (0, _react.useState)(null);
  const getAction = status => {
    if (status === 'Activated') {
      return 'site_redirect';
    } else if (status === 'Installed') {
      return 'hfe_recommended_plugin_activate';
    }
    return 'hfe_recommended_plugin_install';
  };
  const handlePluginAction = e => {
    const action = e.currentTarget.dataset.action;
    const formData = new window.FormData();
    const currentPluginData = {
      init: e.currentTarget.dataset.init,
      type: e.currentTarget.dataset.type,
      slug: e.currentTarget.dataset.slug,
      name: e.currentTarget.dataset.pluginname
    };
    switch (action) {
      case 'hfe_recommended_plugin_activate':
        // Confirmation only for theme activation
        if (currentPluginData.type === 'theme') {
          // Show dialog for confirmation
          setPluginData(currentPluginData);
          setIsDialogOpen(true);
        } else {
          // Directly activate for non-theme plugins
          activatePlugin(currentPluginData);
        }
        break;
      case 'hfe_recommended_plugin_install':
        // Installation process without any confirmation
        formData.append('action', currentPluginData.type === 'theme' ? 'hfe_recommended_theme_install' : 'hfe_recommended_plugin_install');
        formData.append('_ajax_nonce', hfe_admin_data.installer_nonce);
        formData.append('slug', currentPluginData.slug);
        e.target.innerText = (0, _i18n.__)('Installing..', 'header-footer-elementor');
        (0, _apiFetch.default)({
          url: hfe_admin_data.ajax_url,
          method: 'POST',
          body: formData
        }).then(data => {
          if (data.success || data.errorCode === 'folder_exists') {
            e.target.innerText = (0, _i18n.__)('Installed', 'header-footer-elementor');
            callAnalyticsWebhook(currentPluginData);
            if (currentPluginData.type === 'theme') {
              // Change button state to "Activate" after successful installation
              const buttonElement = document.querySelector(`[data-slug="${currentPluginData.slug}"]`);
              buttonElement.dataset.action = 'hfe_recommended_plugin_activate';
              e.target.innerText = (0, _i18n.__)('Activate', 'header-footer-elementor');
            } else {
              activatePlugin(currentPluginData);
            }
          } else {
            e.target.innerText = (0, _i18n.__)('Install', 'header-footer-elementor');
            alert(currentPluginData.type === 'theme' ? (0, _i18n.__)('Theme Installation failed, Please try again later.', 'header-footer-elementor') : (0, _i18n.__)('Plugin Installation failed, Please try again later.', 'header-footer-elementor'));
          }
        });
        break;
      case 'site_redirect':
        window.open(siteUrl, '_blank'); // Open siteUrl in a new tab
        break;
      default:
        // Do nothing.
        break;
    }
  };
  const callAnalyticsWebhook = pluginData => {
    const webhookUrl = 'https://webhook.suretriggers.com/suretriggers/a7ac4b20-18f9-4ec6-9813-dfac83328d00';
    const today = new Date().toISOString().split('T')[0];
    const params = new URLSearchParams({
      source: 'UAE Lite',
      target_plugin: pluginData.name,
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
  const activatePlugin = pluginData => {
    setIsDialogOpen(false);
    const formData = new window.FormData();
    formData.append('action', 'hfe_recommended_plugin_activate');
    formData.append('nonce', hfe_admin_data.nonce);
    formData.append('plugin', pluginData.init);
    formData.append('type', pluginData.type);
    formData.append('slug', pluginData.slug);
    const buttonElement = document.querySelector(`[data-slug="${pluginData.slug}"]`);
    const spanElement = buttonElement.querySelector('span');
    spanElement.innerText = (0, _i18n.__)('Activating..', 'header-footer-elementor');
    (0, _apiFetch.default)({
      url: hfe_admin_data.ajax_url,
      method: 'POST',
      body: formData
    }).then(data => {
      if (data.success) {
        if (spanElement) {
          // Check if spanElement is not null
          buttonElement.style.color = '#16A34A';
          buttonElement.dataset.action = 'site_redirect';
          buttonElement.classList.add('hfe-plugin-activated');
          spanElement.innerText = (0, _i18n.__)('Activated', 'header-footer-elementor');
          window.open(settings_url, '_blank');
          setTimeout(() => {
            // Reload the section or recall the REST API
            setUpdateCounter(prev => prev + 1);
          }, 5000);
        }
      } else {
        if ('theme' == pluginData.type) {
          // console.log(__(`Theme Activation failed, Please try again later.`, 'header-footer-elementor'));
        } else {
          // console.log(__(`Plugin Activation failed, Please try again later.`, 'header-footer-elementor'));
        }
        const buttonElement = document.querySelector(`[data-slug="${pluginData.slug}"]`);
        if (buttonElement) {
          // Check if buttonElement is not null
          const spanElement = buttonElement.querySelector('span');
          if (spanElement) {
            // Check if spanElement is not null
            spanElement.innerText = (0, _i18n.__)('Activate', 'header-footer-elementor');
          }
        }
      }
    });
  };
  return /*#__PURE__*/_react.default.createElement(_forceUi.Container, {
    align: "center",
    containerType: "flex",
    direction: "column",
    justify: "between",
    gap: "lg"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center justify-between w-full"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "h-5 w-5"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: icon,
    alt: "Recommended Plugins/Themes",
    className: "w-full h-auto rounded",
    style: {
      width: "24px",
      height: "24px"
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center gap-x-2"
  }, isFree && /*#__PURE__*/_react.default.createElement(_forceUi.Badge, {
    label: (0, _i18n.__)("Free", "header-footer-elementor"),
    size: "xs",
    type: "pill",
    variant: "green"
  }), /*#__PURE__*/_react.default.createElement(_forceUi.Button, {
    size: "xs",
    variant: "link",
    className: "cursor-pointer hfe-remove-ring",
    onClick: handlePluginAction // Trigger action on click
    ,
    "data-plugin": zipUrl,
    "data-type": type,
    "data-pluginname": name,
    "data-slug": slug,
    "data-site": siteUrl,
    "data-init": path,
    "data-action": getAction(status),
    style: {
      color: status === 'Activated' ? '#16A34A' : '#6005FF'
    }
  }, status === 'Activated' ? (0, _i18n.__)('Visit Site', 'header-footer-elementor') : 'Installed' === status ? 'Activate' : status), /*#__PURE__*/_react.default.createElement(_forceUi.Dialog, {
    design: "simple",
    open: isDialogOpen,
    setOpen: setIsDialogOpen
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Dialog.Backdrop, null), /*#__PURE__*/_react.default.createElement(_forceUi.Dialog.Panel, null, /*#__PURE__*/_react.default.createElement(_forceUi.Dialog.Header, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Dialog.Title, null, (0, _i18n.__)('Activate Theme', 'header-footer-elementor'))), /*#__PURE__*/_react.default.createElement(_forceUi.Dialog.Description, null, (0, _i18n.__)('Are you sure you want to switch your current theme to Astra?', 'header-footer-elementor'))), /*#__PURE__*/_react.default.createElement(_forceUi.Dialog.Footer, null, /*#__PURE__*/_react.default.createElement(_forceUi.Button, {
    onClick: () => activatePlugin(pluginData)
  }, (0, _i18n.__)('Yes', 'header-footer-elementor')), /*#__PURE__*/_react.default.createElement(_forceUi.Button, {
    variant: "outline",
    onClick: () => setIsDialogOpen(false)
  }, (0, _i18n.__)('Close', 'header-footer-elementor'))))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-col w-full pb-4"
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "text-sm font-medium text-text-primary pb-1 m-0 cursor-pointer",
    onClick: () => window.open(plugin.siteurl, '_blank')
  }, (0, _i18n.__)(name, 'header-footer-elementor')), /*#__PURE__*/_react.default.createElement("p", {
    className: "text-sm font-medium text-text-tertiary m-0"
  }, (0, _i18n.__)(desc, 'header-footer-elementor'))));
};
var _default = exports.default = ExtendWebsiteWidget;