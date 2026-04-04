"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/components/src/z-stack/component.tsx
var component_exports = {};
__export(component_exports, {
  ZStack: () => ZStack,
  default: () => component_default
});
module.exports = __toCommonJS(component_exports);
var import_element = require("@wordpress/element");
var import_get_valid_children = require("../utils/get-valid-children.cjs");
var import_context = require("../context/index.cjs");
var import_styles = require("./styles.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
function UnconnectedZStack(props, forwardedRef) {
  const {
    children,
    className,
    isLayered = true,
    isReversed = false,
    offset = 0,
    ...otherProps
  } = (0, import_context.useContextSystem)(props, "ZStack");
  const validChildren = (0, import_get_valid_children.getValidChildren)(children);
  const childrenLastIndex = validChildren.length - 1;
  const clonedChildren = validChildren.map((child, index) => {
    const zIndex = isReversed ? childrenLastIndex - index : index;
    const offsetAmount = isLayered ? offset * index : offset;
    const key = (0, import_element.isValidElement)(child) ? child.key : index;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_styles.ZStackChildView, {
      offsetAmount,
      zIndex,
      children: child
    }, key);
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_styles.ZStackView, {
    ...otherProps,
    className,
    isLayered,
    ref: forwardedRef,
    children: clonedChildren
  });
}
var ZStack = (0, import_context.contextConnect)(UnconnectedZStack, "ZStack");
var component_default = ZStack;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ZStack
});
//# sourceMappingURL=component.cjs.map
