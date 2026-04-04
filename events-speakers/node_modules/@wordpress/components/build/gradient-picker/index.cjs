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

// packages/components/src/gradient-picker/index.tsx
var gradient_picker_exports = {};
__export(gradient_picker_exports, {
  GradientPicker: () => GradientPicker,
  default: () => gradient_picker_default
});
module.exports = __toCommonJS(gradient_picker_exports);
var import_i18n = require("@wordpress/i18n");
var import_compose = require("@wordpress/compose");
var import_element = require("@wordpress/element");
var import_circular_option_picker = __toESM(require("../circular-option-picker/index.cjs"));
var import_custom_gradient_picker = __toESM(require("../custom-gradient-picker/index.cjs"));
var import_v_stack = require("../v-stack/index.cjs");
var import_styles = require("../color-palette/styles.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
var isMultipleOriginObject = (obj) => Array.isArray(obj.gradients) && !("gradient" in obj);
var isMultipleOriginArray = (arr) => {
  return arr.length > 0 && arr.every((gradientObj) => isMultipleOriginObject(gradientObj));
};
function SingleOrigin({
  className,
  clearGradient,
  gradients,
  onChange,
  value,
  ...additionalProps
}) {
  const gradientOptions = (0, import_element.useMemo)(() => {
    return gradients.map(({
      gradient,
      name,
      slug
    }, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_circular_option_picker.default.Option, {
      value: gradient,
      isSelected: value === gradient,
      tooltipText: name || // translators: %s: gradient code e.g: "linear-gradient(90deg, rgba(98,16,153,1) 0%, rgba(172,110,22,1) 100%);".
      (0, import_i18n.sprintf)((0, import_i18n.__)("Gradient code: %s"), gradient),
      style: {
        color: "rgba( 0,0,0,0 )",
        background: gradient
      },
      onClick: value === gradient ? clearGradient : () => onChange(gradient, index),
      "aria-label": name ? (
        // translators: %s: The name of the gradient e.g: "Angular red to blue".
        (0, import_i18n.sprintf)((0, import_i18n.__)("Gradient: %s"), name)
      ) : (
        // translators: %s: gradient code e.g: "linear-gradient(90deg, rgba(98,16,153,1) 0%, rgba(172,110,22,1) 100%);".
        (0, import_i18n.sprintf)((0, import_i18n.__)("Gradient code: %s"), gradient)
      )
    }, slug));
  }, [gradients, value, onChange, clearGradient]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_circular_option_picker.default.OptionGroup, {
    className,
    options: gradientOptions,
    ...additionalProps
  });
}
function MultipleOrigin({
  className,
  clearGradient,
  gradients,
  onChange,
  value,
  headingLevel
}) {
  const instanceId = (0, import_compose.useInstanceId)(MultipleOrigin);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_v_stack.VStack, {
    spacing: 3,
    className,
    children: gradients.map(({
      name,
      gradients: gradientSet
    }, index) => {
      const id = `color-palette-${instanceId}-${index}`;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_v_stack.VStack, {
        spacing: 2,
        children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_styles.ColorHeading, {
          level: headingLevel,
          id,
          children: name
        }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SingleOrigin, {
          clearGradient,
          gradients: gradientSet,
          onChange: (gradient) => onChange(gradient, index),
          value,
          "aria-labelledby": id
        })]
      }, index);
    })
  });
}
function Component(props) {
  const {
    asButtons,
    loop,
    actions,
    headingLevel,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    ...additionalProps
  } = props;
  const options = isMultipleOriginArray(props.gradients) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultipleOrigin, {
    headingLevel,
    ...additionalProps
  }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SingleOrigin, {
    ...additionalProps
  });
  const {
    metaProps,
    labelProps
  } = (0, import_circular_option_picker.getComputeCircularOptionPickerCommonProps)(asButtons, loop, ariaLabel, ariaLabelledby);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_circular_option_picker.default, {
    ...metaProps,
    ...labelProps,
    actions,
    options
  });
}
function GradientPicker({
  className,
  gradients = [],
  onChange,
  value,
  clearable = true,
  enableAlpha = true,
  disableCustomGradients = false,
  __experimentalIsRenderedInSidebar,
  headingLevel = 2,
  ...additionalProps
}) {
  const clearGradient = (0, import_element.useCallback)(() => onChange(void 0), [onChange]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_v_stack.VStack, {
    spacing: gradients.length ? 4 : 0,
    children: [!disableCustomGradients && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_custom_gradient_picker.default, {
      __experimentalIsRenderedInSidebar,
      enableAlpha,
      value,
      onChange
    }), (gradients.length > 0 || clearable) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
      ...additionalProps,
      className,
      clearGradient,
      gradients,
      onChange,
      value,
      actions: clearable && !disableCustomGradients && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_circular_option_picker.default.ButtonAction, {
        onClick: clearGradient,
        accessibleWhenDisabled: true,
        disabled: !value,
        children: (0, import_i18n.__)("Clear")
      }),
      headingLevel
    })]
  });
}
var gradient_picker_default = GradientPicker;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GradientPicker
});
//# sourceMappingURL=index.cjs.map
