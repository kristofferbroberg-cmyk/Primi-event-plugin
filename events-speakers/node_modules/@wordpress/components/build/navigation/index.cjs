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

// packages/components/src/navigation/index.tsx
var navigation_exports = {};
__export(navigation_exports, {
  Navigation: () => Navigation,
  default: () => navigation_default
});
module.exports = __toCommonJS(navigation_exports);
var import_clsx = __toESM(require("clsx"));
var import_deprecated = __toESM(require("@wordpress/deprecated"));
var import_element = require("@wordpress/element");
var import_i18n = require("@wordpress/i18n");
var import_animate = require("../animate/index.cjs");
var import_constants = require("./constants.cjs");
var import_context = require("./context.cjs");
var import_navigation_styles = require("./styles/navigation-styles.cjs");
var import_use_create_navigation_tree = require("./use-create-navigation-tree.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
var noop = () => {
};
function Navigation({
  activeItem,
  activeMenu = import_constants.ROOT_MENU,
  children,
  className,
  onActivateMenu = noop
}) {
  const [menu, setMenu] = (0, import_element.useState)(activeMenu);
  const [slideOrigin, setSlideOrigin] = (0, import_element.useState)();
  const navigationTree = (0, import_use_create_navigation_tree.useCreateNavigationTree)();
  const defaultSlideOrigin = (0, import_i18n.isRTL)() ? "right" : "left";
  (0, import_deprecated.default)("wp.components.Navigation (and all subcomponents)", {
    since: "6.8",
    version: "7.1",
    alternative: "wp.components.Navigator"
  });
  const setActiveMenu = (menuId, slideInOrigin = defaultSlideOrigin) => {
    if (!navigationTree.getMenu(menuId)) {
      return;
    }
    setSlideOrigin(slideInOrigin);
    setMenu(menuId);
    onActivateMenu(menuId);
  };
  const isMountedRef = (0, import_element.useRef)(false);
  (0, import_element.useEffect)(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
    }
  }, []);
  (0, import_element.useEffect)(() => {
    if (activeMenu !== menu) {
      setActiveMenu(activeMenu);
    }
  }, [activeMenu]);
  const context = {
    activeItem,
    activeMenu: menu,
    setActiveMenu,
    navigationTree
  };
  const classes = (0, import_clsx.default)("components-navigation", className);
  const animateClassName = (0, import_animate.getAnimateClassName)({
    type: "slide-in",
    origin: slideOrigin
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_navigation_styles.NavigationUI, {
    className: classes,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
      className: animateClassName ? (0, import_clsx.default)({
        [animateClassName]: isMountedRef.current && slideOrigin
      }) : void 0,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_context.NavigationContext.Provider, {
        value: context,
        children
      })
    }, menu)
  });
}
var navigation_default = Navigation;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Navigation
});
//# sourceMappingURL=index.cjs.map
