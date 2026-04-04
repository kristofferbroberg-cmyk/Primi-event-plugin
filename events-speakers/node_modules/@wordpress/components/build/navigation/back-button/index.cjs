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

// packages/components/src/navigation/back-button/index.tsx
var back_button_exports = {};
__export(back_button_exports, {
  NavigationBackButton: () => NavigationBackButton,
  default: () => back_button_default
});
module.exports = __toCommonJS(back_button_exports);
var import_clsx = __toESM(require("clsx"));
var import_element = require("@wordpress/element");
var import_i18n = require("@wordpress/i18n");
var import_icons = require("@wordpress/icons");
var import_context = require("../context.cjs");
var import_navigation_styles = require("../styles/navigation-styles.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
function UnforwardedNavigationBackButton({
  backButtonLabel,
  className,
  href,
  onClick,
  parentMenu
}, ref) {
  const {
    setActiveMenu,
    navigationTree
  } = (0, import_context.useNavigationContext)();
  const classes = (0, import_clsx.default)("components-navigation__back-button", className);
  const parentMenuTitle = parentMenu !== void 0 ? navigationTree.getMenu(parentMenu)?.title : void 0;
  const handleOnClick = (event) => {
    if (typeof onClick === "function") {
      onClick(event);
    }
    const animationDirection = (0, import_i18n.isRTL)() ? "left" : "right";
    if (parentMenu && !event.defaultPrevented) {
      setActiveMenu(parentMenu, animationDirection);
    }
  };
  const icon = (0, import_i18n.isRTL)() ? import_icons.chevronRight : import_icons.chevronLeft;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_navigation_styles.MenuBackButtonUI, {
    __next40pxDefaultSize: true,
    className: classes,
    href,
    variant: "tertiary",
    ref,
    onClick: handleOnClick,
    children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.Icon, {
      icon
    }), backButtonLabel || parentMenuTitle || (0, import_i18n.__)("Back")]
  });
}
var NavigationBackButton = (0, import_element.forwardRef)(UnforwardedNavigationBackButton);
NavigationBackButton.displayName = "NavigationBackButton";
var back_button_default = NavigationBackButton;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NavigationBackButton
});
//# sourceMappingURL=index.cjs.map
