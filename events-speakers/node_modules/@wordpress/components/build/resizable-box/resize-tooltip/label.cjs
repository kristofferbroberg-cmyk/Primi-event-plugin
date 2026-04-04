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

// packages/components/src/resizable-box/resize-tooltip/label.tsx
var label_exports = {};
__export(label_exports, {
  default: () => label_default
});
module.exports = __toCommonJS(label_exports);
var import_element = require("@wordpress/element");
var import_i18n = require("@wordpress/i18n");
var import_utils = require("./utils.cjs");
var import_resize_tooltip = require("./styles/resize-tooltip.styles.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
var CORNER_OFFSET = 4;
var CURSOR_OFFSET_TOP = CORNER_OFFSET * 2.5;
function Label({
  label,
  position = import_utils.POSITIONS.corner,
  zIndex = 1e3,
  ...props
}, ref) {
  const showLabel = !!label;
  const isBottom = position === import_utils.POSITIONS.bottom;
  const isCorner = position === import_utils.POSITIONS.corner;
  if (!showLabel) {
    return null;
  }
  let style = {
    opacity: showLabel ? 1 : void 0,
    zIndex
  };
  let labelStyle = {};
  if (isBottom) {
    style = {
      ...style,
      position: "absolute",
      bottom: CURSOR_OFFSET_TOP * -1,
      left: "50%",
      transform: "translate(-50%, 0)"
    };
    labelStyle = {
      transform: `translate(0, 100%)`
    };
  }
  if (isCorner) {
    style = {
      ...style,
      position: "absolute",
      top: CORNER_OFFSET,
      right: (0, import_i18n.isRTL)() ? void 0 : CORNER_OFFSET,
      left: (0, import_i18n.isRTL)() ? CORNER_OFFSET : void 0
    };
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_resize_tooltip.TooltipWrapper, {
    "aria-hidden": "true",
    className: "components-resizable-tooltip__tooltip-wrapper",
    ref,
    style,
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_resize_tooltip.Tooltip, {
      className: "components-resizable-tooltip__tooltip",
      style: labelStyle,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_resize_tooltip.LabelText, {
        as: "span",
        children: label
      })
    })
  });
}
var ForwardedComponent = (0, import_element.forwardRef)(Label);
var label_default = ForwardedComponent;
//# sourceMappingURL=label.cjs.map
