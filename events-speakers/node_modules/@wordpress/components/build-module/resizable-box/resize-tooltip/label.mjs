// packages/components/src/resizable-box/resize-tooltip/label.tsx
import { forwardRef } from "@wordpress/element";
import { isRTL } from "@wordpress/i18n";
import { POSITIONS } from "./utils.mjs";
import { TooltipWrapper, Tooltip, LabelText } from "./styles/resize-tooltip.styles.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
var CORNER_OFFSET = 4;
var CURSOR_OFFSET_TOP = CORNER_OFFSET * 2.5;
function Label({
  label,
  position = POSITIONS.corner,
  zIndex = 1e3,
  ...props
}, ref) {
  const showLabel = !!label;
  const isBottom = position === POSITIONS.bottom;
  const isCorner = position === POSITIONS.corner;
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
      right: isRTL() ? void 0 : CORNER_OFFSET,
      left: isRTL() ? CORNER_OFFSET : void 0
    };
  }
  return /* @__PURE__ */ _jsx(TooltipWrapper, {
    "aria-hidden": "true",
    className: "components-resizable-tooltip__tooltip-wrapper",
    ref,
    style,
    ...props,
    children: /* @__PURE__ */ _jsx(Tooltip, {
      className: "components-resizable-tooltip__tooltip",
      style: labelStyle,
      children: /* @__PURE__ */ _jsx(LabelText, {
        as: "span",
        children: label
      })
    })
  });
}
var ForwardedComponent = forwardRef(Label);
var label_default = ForwardedComponent;
export {
  label_default as default
};
//# sourceMappingURL=label.mjs.map
