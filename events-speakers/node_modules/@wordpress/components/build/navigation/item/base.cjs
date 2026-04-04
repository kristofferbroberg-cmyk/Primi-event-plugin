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

// packages/components/src/navigation/item/base.tsx
var base_exports = {};
__export(base_exports, {
  default: () => NavigationItemBase
});
module.exports = __toCommonJS(base_exports);
var import_clsx = __toESM(require("clsx"));
var import_element = require("@wordpress/element");
var import_context = require("../context.cjs");
var import_use_navigation_tree_item = require("./use-navigation-tree-item.cjs");
var import_navigation_styles = require("../styles/navigation-styles.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
var uniqueId = 0;
function NavigationItemBase(props) {
  const {
    children,
    className,
    title,
    href,
    ...restProps
  } = props;
  const [itemId] = (0, import_element.useState)(`item-${++uniqueId}`);
  (0, import_use_navigation_tree_item.useNavigationTreeItem)(itemId, props);
  const {
    navigationTree
  } = (0, import_context.useNavigationContext)();
  if (!navigationTree.getItem(itemId)?._isVisible) {
    return null;
  }
  const classes = (0, import_clsx.default)("components-navigation__item", className);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_navigation_styles.ItemBaseUI, {
    className: classes,
    ...restProps,
    children
  });
}
//# sourceMappingURL=base.cjs.map
