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

// packages/components/src/border-box-control/border-box-control/component.tsx
var component_exports = {};
__export(component_exports, {
  BorderBoxControl: () => BorderBoxControl,
  default: () => component_default
});
module.exports = __toCommonJS(component_exports);
var import_i18n = require("@wordpress/i18n");
var import_element = require("@wordpress/element");
var import_compose = require("@wordpress/compose");
var import_border_box_control_linked_button = __toESM(require("../border-box-control-linked-button/index.cjs"));
var import_border_box_control_split_controls = __toESM(require("../border-box-control-split-controls/index.cjs"));
var import_border_control = require("../../border-control/index.cjs");
var import_base_control_styles = require("../../base-control/styles/base-control-styles.cjs");
var import_view = require("../../view/index.cjs");
var import_visually_hidden = require("../../visually-hidden/index.cjs");
var import_context = require("../../context/index.cjs");
var import_hook = require("./hook.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
var BorderLabel = (props) => {
  const {
    label,
    hideLabelFromVision
  } = props;
  if (!label) {
    return null;
  }
  return hideLabelFromVision ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_visually_hidden.VisuallyHidden, {
    as: "label",
    children: label
  }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_base_control_styles.StyledLabel, {
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
  } = (0, import_hook.useBorderBoxControl)(props);
  const [popoverAnchor, setPopoverAnchor] = (0, import_element.useState)(null);
  const popoverProps = (0, import_element.useMemo)(() => popoverPlacement ? {
    placement: popoverPlacement,
    offset: popoverOffset,
    anchor: popoverAnchor,
    shift: true
  } : void 0, [popoverPlacement, popoverOffset, popoverAnchor]);
  const mergedRef = (0, import_compose.useMergeRefs)([setPopoverAnchor, forwardedRef]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_view.View, {
    className,
    ...otherProps,
    ref: mergedRef,
    children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BorderLabel, {
      label,
      hideLabelFromVision
    }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_view.View, {
      className: wrapperClassName,
      children: [isLinked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_border_control.BorderControl, {
        className: linkedControlClassName,
        colors,
        disableUnits,
        disableCustomColors,
        enableAlpha,
        enableStyle,
        onChange: onLinkedChange,
        placeholder: hasMixedBorders ? (0, import_i18n.__)("Mixed") : void 0,
        __unstablePopoverProps: popoverProps,
        shouldSanitizeBorder: false,
        value: linkedValue,
        withSlider: true,
        width: size === "__unstable-large" ? "116px" : "110px",
        __experimentalIsRenderedInSidebar,
        __shouldNotWarnDeprecated36pxSize: true,
        size
      }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_border_box_control_split_controls.default, {
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
      }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_border_box_control_linked_button.default, {
        onClick: toggleLinked,
        isLinked,
        size
      })]
    })]
  });
};
var BorderBoxControl = (0, import_context.contextConnect)(UnconnectedBorderBoxControl, "BorderBoxControl");
var component_default = BorderBoxControl;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BorderBoxControl
});
//# sourceMappingURL=component.cjs.map
