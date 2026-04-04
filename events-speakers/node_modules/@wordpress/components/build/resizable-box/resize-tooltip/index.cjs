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

// packages/components/src/resizable-box/resize-tooltip/index.tsx
var resize_tooltip_exports = {};
__export(resize_tooltip_exports, {
  default: () => resize_tooltip_default
});
module.exports = __toCommonJS(resize_tooltip_exports);
var import_clsx = __toESM(require("clsx"));
var import_element = require("@wordpress/element");
var import_label = __toESM(require("./label.cjs"));
var import_utils = require("./utils.cjs");
var import_resize_tooltip = require("./styles/resize-tooltip.styles.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
var noop = () => {
};
function ResizeTooltip({
  axis,
  className,
  fadeTimeout = 180,
  isVisible = true,
  labelRef,
  onResize = noop,
  position = import_utils.POSITIONS.bottom,
  showPx = true,
  zIndex = 1e3,
  ...props
}, ref) {
  const {
    label,
    resizeListener
  } = (0, import_utils.useResizeLabel)({
    axis,
    fadeTimeout,
    onResize,
    showPx,
    position
  });
  if (!isVisible) {
    return null;
  }
  const classes = (0, import_clsx.default)("components-resize-tooltip", className);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_resize_tooltip.Root, {
    "aria-hidden": "true",
    className: classes,
    ref,
    ...props,
    children: [resizeListener, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_label.default, {
      "aria-hidden": props["aria-hidden"],
      label,
      position,
      ref: labelRef,
      zIndex
    })]
  });
}
var ForwardedComponent = (0, import_element.forwardRef)(ResizeTooltip);
var resize_tooltip_default = ForwardedComponent;
//# sourceMappingURL=index.cjs.map
