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

// packages/components/src/navigation/menu/index.tsx
var menu_exports = {};
__export(menu_exports, {
  NavigationMenu: () => NavigationMenu,
  default: () => menu_default
});
module.exports = __toCommonJS(menu_exports);
var import_clsx = __toESM(require("clsx"));
var import_element = require("@wordpress/element");
var import_constants = require("../constants.cjs");
var import_context = require("./context.cjs");
var import_context2 = require("../context.cjs");
var import_use_navigation_tree_menu = require("./use-navigation-tree-menu.cjs");
var import_back_button = __toESM(require("../back-button/index.cjs"));
var import_menu_title = __toESM(require("./menu-title.cjs"));
var import_search_no_results_found = __toESM(require("./search-no-results-found.cjs"));
var import_navigable_container = require("../../navigable-container/index.cjs");
var import_navigation_styles = require("../styles/navigation-styles.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
function NavigationMenu(props) {
  const {
    backButtonLabel,
    children,
    className,
    hasSearch,
    menu = import_constants.ROOT_MENU,
    onBackButtonClick,
    onSearch: setControlledSearch,
    parentMenu,
    search: controlledSearch,
    isSearchDebouncing,
    title,
    titleAction
  } = props;
  const [uncontrolledSearch, setUncontrolledSearch] = (0, import_element.useState)("");
  (0, import_use_navigation_tree_menu.useNavigationTreeMenu)(props);
  const {
    activeMenu
  } = (0, import_context2.useNavigationContext)();
  const context = {
    menu,
    search: uncontrolledSearch
  };
  if (activeMenu !== menu) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_context.NavigationMenuContext.Provider, {
      value: context,
      children
    });
  }
  const isControlledSearch = !!setControlledSearch;
  const search = isControlledSearch ? controlledSearch : uncontrolledSearch;
  const onSearch = isControlledSearch ? setControlledSearch : setUncontrolledSearch;
  const menuTitleId = `components-navigation__menu-title-${menu}`;
  const classes = (0, import_clsx.default)("components-navigation__menu", className);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_context.NavigationMenuContext.Provider, {
    value: context,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_navigation_styles.MenuUI, {
      className: classes,
      children: [(parentMenu || onBackButtonClick) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_back_button.default, {
        backButtonLabel,
        parentMenu,
        onClick: onBackButtonClick
      }), title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_menu_title.default, {
        hasSearch,
        onSearch,
        search,
        title,
        titleAction
      }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_navigable_container.NavigableMenu, {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
          "aria-labelledby": menuTitleId,
          children: [children, search && !isSearchDebouncing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_search_no_results_found.default, {
            search
          })]
        })
      })]
    })
  });
}
var menu_default = NavigationMenu;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NavigationMenu
});
//# sourceMappingURL=index.cjs.map
