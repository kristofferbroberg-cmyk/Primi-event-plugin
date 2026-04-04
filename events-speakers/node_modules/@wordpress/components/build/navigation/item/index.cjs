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

// packages/components/src/navigation/item/index.tsx
var item_exports = {};
__export(item_exports, {
  NavigationItem: () => NavigationItem,
  default: () => item_default
});
module.exports = __toCommonJS(item_exports);
var import_clsx = __toESM(require("clsx"));
var import_icons = require("@wordpress/icons");
var import_i18n = require("@wordpress/i18n");
var import_button = __toESM(require("../../button/index.cjs"));
var import_context = require("../context.cjs");
var import_navigation_styles = require("../styles/navigation-styles.cjs");
var import_base_content = __toESM(require("./base-content.cjs"));
var import_base = __toESM(require("./base.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
var noop = () => {
};
function NavigationItem(props) {
  const {
    badge,
    children,
    className,
    href,
    item,
    navigateToMenu,
    onClick = noop,
    title,
    icon,
    hideIfTargetMenuEmpty,
    isText,
    ...restProps
  } = props;
  const {
    activeItem,
    setActiveMenu,
    navigationTree: {
      isMenuEmpty
    }
  } = (0, import_context.useNavigationContext)();
  if (hideIfTargetMenuEmpty && navigateToMenu && isMenuEmpty(navigateToMenu)) {
    return null;
  }
  const isActive = item && activeItem === item;
  const classes = (0, import_clsx.default)(className, {
    "is-active": isActive
  });
  const onItemClick = (event) => {
    if (navigateToMenu) {
      setActiveMenu(navigateToMenu);
    }
    onClick(event);
  };
  const navigationIcon = (0, import_i18n.isRTL)() ? import_icons.chevronLeft : import_icons.chevronRight;
  const baseProps = children ? props : {
    ...props,
    onClick: void 0
  };
  const itemProps = isText ? restProps : {
    as: import_button.default,
    __next40pxDefaultSize: "as" in restProps ? restProps.as === void 0 : true,
    href,
    onClick: onItemClick,
    "aria-current": isActive ? "page" : void 0,
    ...restProps
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_base.default, {
    ...baseProps,
    className: classes,
    children: children || /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_navigation_styles.ItemUI, {
      ...itemProps,
      children: [icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_navigation_styles.ItemIconUI, {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.Icon, {
          icon
        })
      }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_base_content.default, {
        title,
        badge
      }), navigateToMenu && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.Icon, {
        icon: navigationIcon
      })]
    })
  });
}
var item_default = NavigationItem;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NavigationItem
});
//# sourceMappingURL=index.cjs.map
