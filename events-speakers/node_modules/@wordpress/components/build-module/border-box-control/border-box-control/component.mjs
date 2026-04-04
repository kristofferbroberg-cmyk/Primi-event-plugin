// packages/components/src/border-box-control/border-box-control/component.tsx
import { __ } from "@wordpress/i18n";
import { useMemo, useState } from "@wordpress/element";
import { useMergeRefs } from "@wordpress/compose";
import BorderBoxControlLinkedButton from "../border-box-control-linked-button/index.mjs";
import BorderBoxControlSplitControls from "../border-box-control-split-controls/index.mjs";
import { BorderControl } from "../../border-control/index.mjs";
import { StyledLabel } from "../../base-control/styles/base-control-styles.mjs";
import { View } from "../../view/index.mjs";
import { VisuallyHidden } from "../../visually-hidden/index.mjs";
import { contextConnect } from "../../context/index.mjs";
import { useBorderBoxControl } from "./hook.mjs";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var BorderLabel = (props) => {
  const {
    label,
    hideLabelFromVision
  } = props;
  if (!label) {
    return null;
  }
  return hideLabelFromVision ? /* @__PURE__ */ _jsx(VisuallyHidden, {
    as: "label",
    children: label
  }) : /* @__PURE__ */ _jsx(StyledLabel, {
    children: label
  });
};
var UnconnectedBorderBoxControl = (props, forwardedRef) => {
  const {
    className,
    colors,
    disableCustomColors,
    disableUnits,
    enableAlpha,
    enableStyle,
    hasMixedBorders,
    hideLabelFromVision,
    isLinked,
    label,
    linkedControlClassName,
    linkedValue,
    onLinkedChange,
    onSplitChange,
    popoverPlacement,
    popoverOffset,
    size,
    splitValue,
    toggleLinked,
    wrapperClassName,
    __experimentalIsRenderedInSidebar,
    ...otherProps
  } = useBorderBoxControl(props);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const popoverProps = useMemo(() => popoverPlacement ? {
    placement: popoverPlacement,
    offset: popoverOffset,
    anchor: popoverAnchor,
    shift: true
  } : void 0, [popoverPlacement, popoverOffset, popoverAnchor]);
  const mergedRef = useMergeRefs([setPopoverAnchor, forwardedRef]);
  return /* @__PURE__ */ _jsxs(View, {
    className,
    ...otherProps,
    ref: mergedRef,
    children: [/* @__PURE__ */ _jsx(BorderLabel, {
      label,
      hideLabelFromVision
    }), /* @__PURE__ */ _jsxs(View, {
      className: wrapperClassName,
      children: [isLinked ? /* @__PURE__ */ _jsx(BorderControl, {
        className: linkedControlClassName,
        colors,
        disableUnits,
        disableCustomColors,
        enableAlpha,
        enableStyle,
        onChange: onLinkedChange,
        placeholder: hasMixedBorders ? __("Mixed") : void 0,
        __unstablePopoverProps: popoverProps,
        shouldSanitizeBorder: false,
        value: linkedValue,
        withSlider: true,
        width: size === "__unstable-large" ? "116px" : "110px",
        __experimentalIsRenderedInSidebar,
        __shouldNotWarnDeprecated36pxSize: true,
        size
      }) : /* @__PURE__ */ _jsx(BorderBoxControlSplitControls, {
        colors,
        disableCustomColors,
        enableAlpha,
        enableStyle,
        onChange: onSplitChange,
        popoverPlacement,
        popoverOffset,
        value: splitValue,
        __experimentalIsRenderedInSidebar,
        size
      }), /* @__PURE__ */ _jsx(BorderBoxControlLinkedButton, {
        onClick: toggleLinked,
        isLinked,
        size
      })]
    })]
  });
};
var BorderBoxControl = contextConnect(UnconnectedBorderBoxControl, "BorderBoxControl");
var component_default = BorderBoxControl;
export {
  BorderBoxControl,
  component_default as default
};
//# sourceMappingURL=component.mjs.map
