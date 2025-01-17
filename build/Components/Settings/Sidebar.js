"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Sidebar = _ref => {
  let {
    items,
    onSelectItem
  } = _ref;
  const [selectedItemId, setSelectedItemId] = (0, _react.useState)(null); // State to track selected item

  const handleSelectItem = item => {
    setSelectedItemId(item.id); // Update selected item
    onSelectItem(item); // Trigger onSelectItem callback
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: "1rem",
      width: "100%"
    }
  }, items.map(item => /*#__PURE__*/_react.default.createElement("div", {
    key: item.id,
    className: "mb-2"
  }, item.main && /*#__PURE__*/_react.default.createElement("p", {
    className: "text-sm text-text-tertiary font-normal mb-2"
  }, item.main), /*#__PURE__*/_react.default.createElement("div", {
    className: `h-10 flex items-center justify-start gap-2 px-2 rounded-md cursor-pointer ${selectedItemId === item.id ? 'bg-gray-100' : 'bg-background-primary'}`,
    style: {
      backgroundColor: selectedItemId === item.id ? '#F9FAFB' : '' // Apply background color when selected
    },
    onClick: () => handleSelectItem(item)
  }, /*#__PURE__*/_react.default.createElement("span", null, selectedItemId === item.id ? item.selected : item.icon), /*#__PURE__*/_react.default.createElement("p", {
    className: "m-0 text-base font-normal"
  }, item.title)))));
};
var _default = exports.default = Sidebar;