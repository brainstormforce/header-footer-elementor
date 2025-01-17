"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _forceUi = require("@bsf/force-ui");
var _i18n = require("@wordpress/i18n");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const VersionControl = () => {
  const previousLiteVersions = hfeSettingsData.uaelite_versions;
  const liteVersionRef = (0, _react.useRef)(previousLiteVersions ? previousLiteVersions[0].value : '');
  const [liteVersionSelect, setLiteVersionSelect] = (0, _react.useState)(previousLiteVersions ? previousLiteVersions[0].value : '');
  const [freeproductSelect, setFreeproductSelect] = (0, _react.useState)('elementor-header-footer');
  const [openLitePopup, setOpenLitePopup] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {}, [openLitePopup]);
  const onLiteCancelClick = () => {
    setOpenLitePopup(false);
  };
  const onLiteContinueClick = () => {
    const rollbackUrl = hfeSettingsData.uaelite_rollback_url.replace('VERSION', liteVersionSelect);
    setOpenLitePopup(false);
    window.location.href = rollbackUrl;
  };
  const handleLiteVersionChange = event => {
    setLiteVersionSelect(event.target.value);
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_forceUi.Title, {
    description: "",
    icon: null,
    iconPosition: "right",
    size: "sm",
    tag: "h2",
    title: (0, _i18n.__)('Version Control', 'header-footer-elementor')
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "box-border bg-background-primary p-6 rounded-lg",
    style: {
      marginTop: "24px"
    }
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Container, {
    align: "center",
    className: "flex flex-col lg:flex-row",
    containerType: "flex",
    direction: "column",
    gap: "sm",
    justify: "start"
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Container.Item, {
    className: "shrink flex flex-col space-y-1"
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "text-base font-semibold m-0"
  }, (0, _i18n.__)(`Rollback to Previous Version`, 'header-footer-elementor')), /*#__PURE__*/_react.default.createElement("p", {
    className: "text-sm font-normal m-0"
  }, (0, _i18n.__)('Experiencing an issue with current version? Roll back to a previous version to help troubleshoot the issue.', 'header-footer-elementor'))), /*#__PURE__*/_react.default.createElement(_forceUi.Container.Item, {
    className: "p-2 flex space-y-4",
    alignSelf: "auto",
    order: "none"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "bsf-rollback-version"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "hidden",
    name: "product-name",
    id: "bsf-product-name",
    value: 'header-footer-elementor'
  }), /*#__PURE__*/_react.default.createElement("select", {
    id: "uaeliteVersionRollback",
    ref: liteVersionRef,
    onBlur: () => {
      setFreeproductSelect('elementor-header-footer');
    },
    onChange: handleLiteVersionChange,
    style: {
      padding: '8px',
      marginRight: '10px',
      marginTop: '16px',
      cursor: 'pointer',
      borderRadius: '4px',
      height: '40px',
      width: '100px',
      outline: 'none',
      // Removes the default outline
      boxShadow: 'none'
      // marginTop: '16px'     // Removes the default box shadow
    },
    onFocus: e => e.target.style.borderColor = '#6005FF' // Apply focus color
  }, previousLiteVersions.map(version => /*#__PURE__*/_react.default.createElement("option", {
    key: version.value,
    value: version.value
  }, version.label)))), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-col cursor-pointer"
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Dialog, {
    design: "simple",
    exitOnEsc: true,
    scrollLock: true,
    open: openLitePopup // Ensure Dialog is controlled by state
    ,
    setOpen: setOpenLitePopup // Synchronize state
    ,
    trigger: /*#__PURE__*/_react.default.createElement(_forceUi.Button, {
      style: {
        backgroundColor: '#6005ff'
      }
    }, (0, _i18n.__)('Rollback', 'header-footer-elementor'))
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Dialog.Backdrop, null), /*#__PURE__*/_react.default.createElement(_forceUi.Dialog.Panel, null, /*#__PURE__*/_react.default.createElement(_forceUi.Dialog.Header, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Dialog.Title, null, (0, _i18n.__)('Rollback to Previous Version', 'header-footer-elementor')), /*#__PURE__*/_react.default.createElement(_forceUi.Dialog.CloseButton, null))), /*#__PURE__*/_react.default.createElement(_forceUi.Dialog.Body, null, (0, _i18n.__)(`Are you sure you want to rollback to Ultimate Addons for Elementor v${liteVersionSelect}?`, 'header-footer-elementor')), /*#__PURE__*/_react.default.createElement(_forceUi.Dialog.Footer, null, /*#__PURE__*/_react.default.createElement(_forceUi.Button, {
    onClick: onLiteContinueClick
  }, (0, _i18n.__)('Rollback', 'header-footer-elementor')), /*#__PURE__*/_react.default.createElement(_forceUi.Button, {
    onClick: onLiteCancelClick
  }, (0, _i18n.__)('Cancel', 'header-footer-elementor'))))))))));
};
var _default = exports.default = VersionControl;