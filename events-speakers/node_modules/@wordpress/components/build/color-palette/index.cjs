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

// packages/components/src/color-palette/index.tsx
var color_palette_exports = {};
__export(color_palette_exports, {
  ColorPalette: () => ColorPalette,
  CustomColorPickerDropdown: () => CustomColorPickerDropdown,
  default: () => color_palette_default
});
module.exports = __toCommonJS(color_palette_exports);
var import_colord = require("colord");
var import_names = __toESM(require("colord/plugins/names"));
var import_a11y = __toESM(require("colord/plugins/a11y"));
var import_clsx = __toESM(require("clsx"));
var import_compose = require("@wordpress/compose");
var import_i18n = require("@wordpress/i18n");
var import_element = require("@wordpress/element");
var import_dropdown = __toESM(require("../dropdown/index.cjs"));
var import_color_picker = require("../color-picker/index.cjs");
var import_circular_option_picker = __toESM(require("../circular-option-picker/index.cjs"));
var import_v_stack = require("../v-stack/index.cjs");
var import_truncate = require("../truncate/index.cjs");
var import_styles = require("./styles.cjs");
var import_dropdown_content_wrapper = __toESM(require("../dropdown/dropdown-content-wrapper.cjs"));
var import_utils = require("./utils.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
(0, import_colord.extend)([import_names.default, import_a11y.default]);
function SinglePalette({
  className,
  clearColor,
  colors,
  onChange,
  value,
  ...additionalProps
}) {
  const colorOptions = (0, import_element.useMemo)(() => {
    return colors.map(({
      color,
      name
    }, index) => {
      const colordColor = (0, import_colord.colord)(color);
      const isSelected = value === color;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_circular_option_picker.default.Option, {
        isSelected,
        selectedIconProps: isSelected ? {
          fill: colordColor.contrast() > colordColor.contrast("#000") ? "#fff" : "#000"
        } : {},
        tooltipText: name || // translators: %s: color hex code e.g: "#f00".
        (0, import_i18n.sprintf)((0, import_i18n.__)("Color code: %s"), color),
        style: {
          backgroundColor: color,
          color
        },
        onClick: isSelected ? clearColor : () => onChange(color, index)
      }, `${color}-${index}`);
    });
  }, [colors, value, onChange, clearColor]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_circular_option_picker.default.OptionGroup, {
    className,
    options: colorOptions,
    ...additionalProps
  });
}
function MultiplePalettes({
  className,
  clearColor,
  colors,
  onChange,
  value,
  headingLevel
}) {
  const instanceId = (0, import_compose.useInstanceId)(MultiplePalettes, "color-palette");
  if (colors.length === 0) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_v_stack.VStack, {
    spacing: 3,
    className,
    children: colors.map(({
      name,
      colors: colorPalette
    }, index) => {
      const id = `${instanceId}-${index}`;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_v_stack.VStack, {
        spacing: 2,
        children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_styles.ColorHeading, {
          id,
          level: headingLevel,
          children: name
        }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SinglePalette, {
          clearColor,
          colors: colorPalette,
          onChange: (newColor) => onChange(newColor, index),
          value,
          "aria-labelledby": id
        })]
      }, index);
    })
  });
}
function CustomColorPickerDropdown({
  isRenderedInSidebar,
  popoverProps: receivedPopoverProps,
  ...props
}) {
  const popoverProps = (0, import_element.useMemo)(() => ({
    shift: true,
    // Disabling resize as it would otherwise cause the popover to show
    // scrollbars while dragging the color picker's handle close to the
    // popover edge.
    resize: false,
    ...isRenderedInSidebar ? {
      // When in the sidebar: open to the left (stacking),
      // leaving the same gap as the parent popover.
      placement: "left-start",
      offset: 34
    } : {
      // Default behavior: open below the anchor
      placement: "bottom",
      offset: 8
    },
    ...receivedPopoverProps
  }), [isRenderedInSidebar, receivedPopoverProps]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dropdown.default, {
    contentClassName: "components-color-palette__custom-color-dropdown-content",
    popoverProps,
    ...props
  });
}
function UnforwardedColorPalette(props, forwardedRef) {
  const {
    asButtons,
    loop,
    clearable = true,
    colors = [],
    disableCustomColors = false,
    enableAlpha = false,
    onChange,
    value,
    __experimentalIsRenderedInSidebar = false,
    headingLevel = 2,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    ...additionalProps
  } = props;
  const [normalizedColorValue, setNormalizedColorValue] = (0, import_element.useState)(value);
  const clearColor = (0, import_element.useCallback)(() => onChange(void 0), [onChange]);
  const customColorPaletteCallbackRef = (0, import_element.useCallback)((node) => {
    setNormalizedColorValue((0, import_utils.normalizeColorValue)(value, node));
  }, [value]);
  const hasMultipleColorOrigins = (0, import_utils.isMultiplePaletteArray)(colors);
  const buttonLabelName = (0, import_element.useMemo)(() => (0, import_utils.extractColorNameFromCurrentValue)(value, colors, hasMultipleColorOrigins), [value, colors, hasMultipleColorOrigins]);
  const renderCustomColorPicker = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dropdown_content_wrapper.default, {
    paddingSize: "none",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_color_picker.ColorPicker, {
      color: normalizedColorValue,
      onChange: (color) => onChange(color),
      enableAlpha
    })
  });
  const isHex = value?.startsWith("#");
  const displayValue = value?.replace(/^var\((.+)\)$/, "$1");
  const customColorAccessibleLabel = !!displayValue ? (0, import_i18n.sprintf)(
    // translators: 1: The name of the color e.g: "vivid red". 2: The color's hex code e.g: "#f00".
    (0, import_i18n.__)('Custom color picker. The currently selected color is called "%1$s" and has a value of "%2$s".'),
    buttonLabelName,
    displayValue
  ) : (0, import_i18n.__)("Custom color picker");
  const paletteCommonProps = {
    clearColor,
    onChange,
    value
  };
  const actions = !!clearable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_circular_option_picker.default.ButtonAction, {
    onClick: clearColor,
    accessibleWhenDisabled: true,
    disabled: !value,
    children: (0, import_i18n.__)("Clear")
  });
  const {
    metaProps,
    labelProps
  } = (0, import_circular_option_picker.getComputeCircularOptionPickerCommonProps)(asButtons, loop, ariaLabel, ariaLabelledby);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_v_stack.VStack, {
    spacing: 3,
    ref: forwardedRef,
    ...additionalProps,
    children: [!disableCustomColors && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomColorPickerDropdown, {
      isRenderedInSidebar: __experimentalIsRenderedInSidebar,
      renderContent: renderCustomColorPicker,
      renderToggle: ({
        isOpen,
        onToggle
      }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_v_stack.VStack, {
        className: "components-color-palette__custom-color-wrapper",
        spacing: 0,
        children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
          ref: customColorPaletteCallbackRef,
          className: "components-color-palette__custom-color-button",
          "aria-expanded": isOpen,
          "aria-haspopup": "true",
          onClick: onToggle,
          "aria-label": customColorAccessibleLabel,
          style: {
            background: value
          },
          type: "button"
        }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_v_stack.VStack, {
          className: "components-color-palette__custom-color-text-wrapper",
          spacing: 0.5,
          children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_truncate.Truncate, {
            className: "components-color-palette__custom-color-name",
            children: value ? buttonLabelName : (0, import_i18n.__)("No color selected")
          }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_truncate.Truncate, {
            className: (0, import_clsx.default)("components-color-palette__custom-color-value", {
              "components-color-palette__custom-color-value--is-hex": isHex
            }),
            children: displayValue
          })]
        })]
      })
    }), (colors.length > 0 || actions) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_circular_option_picker.default, {
      ...metaProps,
      ...labelProps,
      actions,
      options: hasMultipleColorOrigins ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultiplePalettes, {
        ...paletteCommonProps,
        headingLevel,
        colors,
        value
      }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SinglePalette, {
        ...paletteCommonProps,
        colors,
        value
      })
    })]
  });
}
var ColorPalette = (0, import_element.forwardRef)(UnforwardedColorPalette);
ColorPalette.displayName = "ColorPalette";
var color_palette_default = ColorPalette;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ColorPalette,
  CustomColorPickerDropdown
});
//# sourceMappingURL=index.cjs.map
