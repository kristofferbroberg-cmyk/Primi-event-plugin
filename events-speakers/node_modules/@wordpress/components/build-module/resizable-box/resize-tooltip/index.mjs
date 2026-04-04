// packages/components/src/resizable-box/resize-tooltip/index.tsx
import clsx from "clsx";
import { forwardRef } from "@wordpress/element";
import Label from "./label.mjs";
import { useResizeLabel, POSITIONS } from "./utils.mjs";
import { Root } from "./styles/resize-tooltip.styles.mjs";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var noop = () => {
};
function ResizeTooltip({
  axis,
  className,
  fadeTimeout = 180,
  isVisible = true,
  labelRef,
  onResize = noop,
  position = POSITIONS.bottom,
  showPx = true,
  zIndex = 1e3,
  ...props
}, ref) {
  const {
    label,
    resizeListener
  } = useResizeLabel({
    axis,
    fadeTimeout,
    onResize,
    showPx,
    position
  });
  if (!isVisible) {
    return null;
  }
  const classes = clsx("components-resize-tooltip", className);
  return /* @__PURE__ */ _jsxs(Root, {
    "aria-hidden": "true",
    className: classes,
    ref,
    ...props,
    children: [resizeListener, /* @__PURE__ */ _jsx(Label, {
      "aria-hidden": props["aria-hidden"],
      label,
      position,
      ref: labelRef,
      zIndex
    })]
  });
}
var ForwardedComponent = forwardRef(ResizeTooltip);
var resize_tooltip_default = ForwardedComponent;
export {
  resize_tooltip_default as default
};
//# sourceMappingURL=index.mjs.map
