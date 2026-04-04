// packages/components/src/gradient-picker/index.tsx
import { __, sprintf } from "@wordpress/i18n";
import { useInstanceId } from "@wordpress/compose";
import { useCallback, useMemo } from "@wordpress/element";
import CircularOptionPicker, { getComputeCircularOptionPickerCommonProps } from "../circular-option-picker/index.mjs";
import CustomGradientPicker from "../custom-gradient-picker/index.mjs";
import { VStack } from "../v-stack/index.mjs";
import { ColorHeading } from "../color-palette/styles.mjs";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
  const gradientOptions = useMemo(() => {
    return gradients.map(({
      gradient,
      name,
      slug
    }, index) => /* @__PURE__ */ _jsx(CircularOptionPicker.Option, {
      value: gradient,
      isSelected: value === gradient,
      tooltipText: name || // translators: %s: gradient code e.g: "linear-gradient(90deg, rgba(98,16,153,1) 0%, rgba(172,110,22,1) 100%);".
      sprintf(__("Gradient code: %s"), gradient),
      style: {
        color: "rgba( 0,0,0,0 )",
        background: gradient
      },
      onClick: value === gradient ? clearGradient : () => onChange(gradient, index),
      "aria-label": name ? (
        // translators: %s: The name of the gradient e.g: "Angular red to blue".
        sprintf(__("Gradient: %s"), name)
      ) : (
        // translators: %s: gradient code e.g: "linear-gradient(90deg, rgba(98,16,153,1) 0%, rgba(172,110,22,1) 100%);".
        sprintf(__("Gradient code: %s"), gradient)
      )
    }, slug));
  }, [gradients, value, onChange, clearGradient]);
  return /* @__PURE__ */ _jsx(CircularOptionPicker.OptionGroup, {
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
  const instanceId = useInstanceId(MultipleOrigin);
  return /* @__PURE__ */ _jsx(VStack, {
    spacing: 3,
    className,
    children: gradients.map(({
      name,
      gradients: gradientSet
    }, index) => {
      const id = `color-palette-${instanceId}-${index}`;
      return /* @__PURE__ */ _jsxs(VStack, {
        spacing: 2,
        children: [/* @__PURE__ */ _jsx(ColorHeading, {
          level: headingLevel,
          id,
          children: name
        }), /* @__PURE__ */ _jsx(SingleOrigin, {
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
  const options = isMultipleOriginArray(props.gradients) ? /* @__PURE__ */ _jsx(MultipleOrigin, {
    headingLevel,
    ...additionalProps
  }) : /* @__PURE__ */ _jsx(SingleOrigin, {
    ...additionalProps
  });
  const {
    metaProps,
    labelProps
  } = getComputeCircularOptionPickerCommonProps(asButtons, loop, ariaLabel, ariaLabelledby);
  return /* @__PURE__ */ _jsx(CircularOptionPicker, {
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
  const clearGradient = useCallback(() => onChange(void 0), [onChange]);
  return /* @__PURE__ */ _jsxs(VStack, {
    spacing: gradients.length ? 4 : 0,
    children: [!disableCustomGradients && /* @__PURE__ */ _jsx(CustomGradientPicker, {
      __experimentalIsRenderedInSidebar,
      enableAlpha,
      value,
      onChange
    }), (gradients.length > 0 || clearable) && /* @__PURE__ */ _jsx(Component, {
      ...additionalProps,
      className,
      clearGradient,
      gradients,
      onChange,
      value,
      actions: clearable && !disableCustomGradients && /* @__PURE__ */ _jsx(CircularOptionPicker.ButtonAction, {
        onClick: clearGradient,
        accessibleWhenDisabled: true,
        disabled: !value,
        children: __("Clear")
      }),
      headingLevel
    })]
  });
}
var gradient_picker_default = GradientPicker;
export {
  GradientPicker,
  gradient_picker_default as default
};
//# sourceMappingURL=index.mjs.map
