"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/components/src/navigation/menu/menu-title.tsx
var menu_title_exports = {};
__export(menu_title_exports, {
  default: () => NavigationMenuTitle
});
module.exports = __toCommonJS(menu_title_exports);
var import_element = require("@wordpress/element");
var import_i18n = require("@wordpress/i18n");
var import_icons = require("@wordpress/icons");
var import_animate = require("../../animate/index.cjs");
var import_button = __toESM(require("../../button/index.cjs"));
var import_menu_title_search = __toESM(require("./menu-title-search.cjs"));
var import_navigation_styles = require("../styles/navigation-styles.cjs");
var import_context = require("./context.cjs");
var import_constants = require("../constants.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
function NavigationMenuTitle({
  hasSearch,
  onSearch,
  search,
  title,
  titleAction
}) {
  const [isSearching, setIsSearching] = (0, import_element.useState)(false);
  const {
    menu
  } = (0, import_context.useNavigationMenuContext)();
  const searchButtonRef = (0, import_element.useRef)(null);
  if (!title) {
    return null;
  }
  const onCloseSearch = () => {
    setIsSearching(false);
    setTimeout(() => {
      searchButtonRef.current?.focus();
    }, import_constants.SEARCH_FOCUS_DELAY);
  };
  const menuTitleId = `components-navigation__menu-title-${menu}`;
  const searchButtonLabel = (0, import_i18n.sprintf)((0, import_i18n.__)("Search in %s"), title);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_navigation_styles.MenuTitleUI, {
    className: "components-navigation__menu-title",
    children: [!isSearching && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_navigation_styles.GroupTitleUI, {
      as: "h2",
      className: "components-navigation__menu-title-heading",
      level: 3,
      children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
        id: menuTitleId,
        children: title
      }), (hasSearch || titleAction) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_navigation_styles.MenuTitleActionsUI, {
        children: [titleAction, hasSearch && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_button.default, {
          size: "small",
          variant: "tertiary",
          label: searchButtonLabel,
          onClick: () => setIsSearching(true),
          ref: searchButtonRef,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.Icon, {
            icon: import_icons.search
          })
        })]
      })]
    }), isSearching && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
      className: (0, import_animate.getAnimateClassName)({
        type: "slide-in",
        origin: "left"
      }),
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_menu_title_search.default, {
        onCloseSearch,
        onSearch,
        search,
        title
      })
    })]
  });
}
//# sourceMappingURL=menu-title.cjs.map
