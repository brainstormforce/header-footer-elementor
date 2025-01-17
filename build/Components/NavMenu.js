"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _forceUi = require("@bsf/force-ui");
var _lucideReact = require("lucide-react");
var _i18n = require("@wordpress/i18n");
var _routes = require("../admin/settings/routes");
var _index = require("../router/index");
var _whatsNewRss = _interopRequireDefault(require("whats-new-rss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function updateNavMenuActiveState() {
  const currentPath = window.location.hash;
  const menuItems = document.querySelectorAll("#adminmenu #toplevel_page_hfe a");
  menuItems.forEach(item => {
    const href = item.getAttribute("href");
    const parentLi = item.closest("li");
    const itemText = item.textContent.trim();
    if (href && (currentPath.includes(href.split("#")[1]) || "#dashboard" === currentPath && itemText === "Dashboard")) {
      parentLi.classList.add("current");
    } else {
      parentLi.classList.remove("current");
    }
  });
}
const NavMenu = () => {
  const [isDropdownOpen, setIsDropdownOpen] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    updateNavMenuActiveState();
    window.addEventListener("hashchange", updateNavMenuActiveState);
    return () => {
      window.removeEventListener("hashchange", updateNavMenuActiveState);
    };
  }, []);

  // Get the current URL's hash part (after the #).
  const currentPath = window.location.hash;
  const isActive = path => currentPath.includes(path);
  const linkStyle = path => ({
    color: isActive(path) ? "#111827" : "#4B5563",
    borderBottom: isActive(path) ? "2px solid #6005FF" : "none",
    paddingBottom: "22px",
    marginBottom: "-16px"
  });
  const handleRedirect = url => {
    window.open(url, "_blank");
    setIsDropdownOpen(false);
  };
  (0, _whatsNewRss.default)({
    rssFeedURL: "https://ultimateelementor.com/whats-new/feed/",
    selector: "#hfe-whats-new",
    triggerButton: {
      beforeBtn: '<div class="w-4 sm:w-8 h-8 sm:h-10 flex items-center whitespace-nowrap justify-center cursor-pointer rounded-full border border-slate-200">',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#434141" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-megaphone"><path d="m3 11 18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>',
      afterBtn: "</div>"
    },
    flyout: {
      title: (0, _i18n.__)("What's New?", "astra-sites"),
      formatDate: date => {
        const dayOfWeek = date.toLocaleDateString("en-US", {
          weekday: "long"
        });
        const month = date.toLocaleDateString("en-US", {
          month: "long"
        });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${dayOfWeek} ${month} ${day}, ${year}`;
      }
    }
  });
  return /*#__PURE__*/_react.default.createElement(_forceUi.Topbar, {
    className: "hfe-nav-menu relative",
    style: {
      width: "unset",
      padding: "0.5rem",
      zIndex: "9",
      paddingTop: "1rem"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-col lg:flex-row items-start md:items-center w-full"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-row md:items-center md:gap-8 w-full"
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Topbar.Left, null, /*#__PURE__*/_react.default.createElement(_forceUi.Topbar.Item, null, /*#__PURE__*/_react.default.createElement(_index.Link, {
    to: _routes.routes.dashboard.path
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: `${hfeSettingsData.icon_url}`,
    alt: "Icon",
    className: "ml-4 cursor-pointer",
    style: {
      height: "35px",
      width: "35px"
    }
  })))), /*#__PURE__*/_react.default.createElement(_forceUi.Topbar.Middle, {
    className: "flex-grow",
    align: "left"
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Topbar.Item, null, /*#__PURE__*/_react.default.createElement("nav", {
    className: "flex flex-wrap gap-6 mt-2 md:mt-0 cursor-pointer"
  }, /*#__PURE__*/_react.default.createElement(_index.Link, {
    to: _routes.routes.dashboard.path,
    className: `${isActive("dashboard") ? "active-link" : ""}`,
    style: linkStyle("dashboard")
  }, (0, _i18n.__)("Dashboard", "header-footer-elementor")), /*#__PURE__*/_react.default.createElement(_index.Link, {
    to: _routes.routes.headerFooterBuilder.path,
    className: `${isActive("edit.php?post_type=elementor-hf") ? "active-link" : ""}`,
    style: linkStyle("edit.php?post_type=elementor-hf"),
    onClick: () => {
      console.log("Navigating to Header & Footer Builder");
    }
  }, (0, _i18n.__)("Header & Footer Builder", "header-footer-elementor")), /*#__PURE__*/_react.default.createElement(_index.Link, {
    to: _routes.routes.widgets.path,
    className: `${isActive("widgets") ? "active-link" : ""}`,
    style: linkStyle("widgets")
  }, (0, _i18n.__)("Widgets", "header-footer-elementor")), /*#__PURE__*/_react.default.createElement(_index.Link, {
    to: _routes.routes.templates.path,
    className: `${isActive("templates") ? "active-link" : ""}`,
    style: linkStyle("templates")
  }, (0, _i18n.__)("Templates", "header-footer-elementor")), /*#__PURE__*/_react.default.createElement(_index.Link, {
    to: _routes.routes.settings.path,
    className: `${isActive("settings") ? "active-link" : ""}`,
    style: linkStyle("settings")
  }, (0, _i18n.__)("Settings", "header-footer-elementor")), /*#__PURE__*/_react.default.createElement(_index.Link, {
    to: _routes.routes.upgrade.path,
    className: `${isActive("upgrade") ? "active-link" : ""}`,
    style: linkStyle("upgrade")
  }, (0, _i18n.__)("Free vs Pro", "header-footer-elementor")))), /*#__PURE__*/_react.default.createElement(_forceUi.Topbar.Item, null, /*#__PURE__*/_react.default.createElement(_forceUi.Button, {
    icon: /*#__PURE__*/_react.default.createElement(_lucideReact.ArrowUpRight, null),
    iconPosition: "right",
    variant: "ghost",
    className: "hfe-remove-ring mb-2",
    style: {
      color: "#6005FF",
      // paddingBottom: "10px",
      background: "none",
      border: "none",
      padding: 0,
      cursor: "pointer"
    },
    onClick: () => handleRedirect("https://ultimateelementor.com/pricing/?utm_source=uae-lite-dashboard&utm_medium=navigation-bar&utm_campaign=uae-lite-upgrade")
  }, (0, _i18n.__)("Get Pro", "header-footer-elementor")))), /*#__PURE__*/_react.default.createElement(_forceUi.Topbar.Right, {
    className: "gap-4"
  }, /*#__PURE__*/_react.default.createElement(_forceUi.Topbar.Item, null, /*#__PURE__*/_react.default.createElement(_forceUi.DropdownMenu, {
    placement: "bottom-start",
    isOpen: isDropdownOpen,
    onOpenChange: setIsDropdownOpen
  }, /*#__PURE__*/_react.default.createElement(_forceUi.DropdownMenu.Trigger, null, /*#__PURE__*/_react.default.createElement(_forceUi.Badge, {
    label: (0, _i18n.__)("Free", "header-footer-elementor"),
    size: "xs",
    variant: "neutral"
  })), /*#__PURE__*/_react.default.createElement(_forceUi.DropdownMenu.Content, {
    className: "w-52"
  }, /*#__PURE__*/_react.default.createElement(_forceUi.DropdownMenu.List, null, /*#__PURE__*/_react.default.createElement(_forceUi.DropdownMenu.Item, null, (0, _i18n.__)("Version", "header-footer-elementor")), /*#__PURE__*/_react.default.createElement(_forceUi.DropdownMenu.Item, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex justify-between w-full"
  }, `${hfeSettingsData.uaelite_current_version}`, /*#__PURE__*/_react.default.createElement(_forceUi.Badge, {
    label: (0, _i18n.__)("Free", "header-footer-elementor"),
    size: "xs",
    variant: "neutral"
  }))))))), /*#__PURE__*/_react.default.createElement(_forceUi.Topbar.Item, {
    className: "gap-4 cursor-pointer"
  }, /*#__PURE__*/_react.default.createElement(_forceUi.DropdownMenu, {
    placement: "bottom-start",
    isOpen: isDropdownOpen,
    onOpenChange: setIsDropdownOpen
  }, /*#__PURE__*/_react.default.createElement(_forceUi.DropdownMenu.Trigger, null, /*#__PURE__*/_react.default.createElement(_lucideReact.CircleHelp, null)), /*#__PURE__*/_react.default.createElement(_forceUi.DropdownMenu.Content, {
    className: "w-60"
  }, /*#__PURE__*/_react.default.createElement(_forceUi.DropdownMenu.List, null, /*#__PURE__*/_react.default.createElement(_forceUi.DropdownMenu.Item, null, (0, _i18n.__)("Useful Resources", "header-footer-elementor")), /*#__PURE__*/_react.default.createElement(_forceUi.DropdownMenu.Item, {
    className: "text-text-primary",
    style: {
      color: "black"
    },
    onClick: () => handleRedirect("https://ultimateelementor.com/docs/getting-started-with-ultimate-addons-for-elementor-lite/")
  }, /*#__PURE__*/_react.default.createElement(_lucideReact.FileText, {
    style: {
      color: "black"
    }
  }), (0, _i18n.__)("Getting Started", "header-footer-elementor")), /*#__PURE__*/_react.default.createElement(_forceUi.DropdownMenu.Item, {
    onClick: () => handleRedirect("https://ultimateelementor.com/docs-category/widgets/")
  }, /*#__PURE__*/_react.default.createElement(_lucideReact.FileText, null), (0, _i18n.__)("How to use widgets", "header-footer-elementor")), /*#__PURE__*/_react.default.createElement(_forceUi.DropdownMenu.Item, {
    onClick: () => handleRedirect("https://ultimateelementor.com/docs-category/features/")
  }, /*#__PURE__*/_react.default.createElement(_lucideReact.FileText, null), (0, _i18n.__)("How to use features", "header-footer-elementor")), /*#__PURE__*/_react.default.createElement(_forceUi.DropdownMenu.Item, {
    onClick: () => handleRedirect("https://ultimateelementor.com/docs-category/templates/")
  }, /*#__PURE__*/_react.default.createElement(_lucideReact.FileText, null), (0, _i18n.__)("How to use templates", "header-footer-elementor")), /*#__PURE__*/_react.default.createElement(_forceUi.DropdownMenu.Item, {
    onClick: () => handleRedirect("https://ultimateelementor.com/contact/")
  }, /*#__PURE__*/_react.default.createElement(_lucideReact.Headset, null), (0, _i18n.__)("Contact us", "header-footer-elementor"))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "pb-1",
    id: "hfe-whats-new"
  })), /*#__PURE__*/_react.default.createElement(_index.Link, {
    to: _routes.routes.settings.path
  }, /*#__PURE__*/_react.default.createElement(_lucideReact.User, {
    className: "cursor-pointer hfe-user-icon",
    style: {
      color: "black"
    }
  }))))));
};
var _default = exports.default = NavMenu;