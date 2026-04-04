// packages/components/src/duotone-picker/duotone-picker.tsx
import fastDeepEqual from "fast-deep-equal/es6/index.js";
import { useMemo } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";
import ColorListPicker from "./color-list-picker/index.mjs";
import CircularOptionPicker, { getComputeCircularOptionPickerCommonProps } from "../circular-option-picker/index.mjs";
import { VStack } from "../v-stack/index.mjs";
import CustomDuotoneBar from "./custom-duotone-bar.mjs";
import { getDefaultColors, getGradientFromCSSColors } from "./utils.mjs";
import { Spacer } from "../spacer/index.mjs";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function DuotonePicker({
  asButtons,
  loop,
  clearable = true,
  unsetable = true,
  colorPalette,
  duotonePalette,
  disableCustomColors,
  disableCustomDuotone,
  value,
  onChange,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  ...otherProps
}) {
  const [defaultDark, defaultLight] = useMemo(() => getDefaultColors(colorPalette), [colorPalette]);
  const isUnset = value === "unset";
  const unsetOptionLabel = __("Unset");
  const unsetOption = /* @__PURE__ */ _jsx(CircularOptionPicker.Option, {
    value: "unset",
    isSelected: isUnset,
    tooltipText: unsetOptionLabel,
    "aria-label": unsetOptionLabel,
    className: "components-duotone-picker__color-indicator",
    onClick: () => {
      onChange(isUnset ? void 0 : "unset");
    }
  }, "unset");
  const duotoneOptions = duotonePalette.map(({
    colors,
    slug,
    name
  }) => {
    const style = {
      background: getGradientFromCSSColors(colors, "135deg"),
      color: "transparent"
    };
    const tooltipText = name ?? sprintf(
      // translators: %s: duotone code e.g: "dark-grayscale" or "7f7f7f-ffffff".
      __("Duotone code: %s"),
      slug
    );
    const label = name ? sprintf(
      // translators: %s: The name of the option e.g: "Dark grayscale".
      __("Duotone: %s"),
      name
    ) : tooltipText;
    const isSelected = fastDeepEqual(colors, value);
    return /* @__PURE__ */ _jsx(CircularOptionPicker.Option, {
      value: colors,
      isSelected,
      "aria-label": label,
      tooltipText,
      style,
      onClick: () => {
        onChange(isSelected ? void 0 : colors);
      }
    }, slug);
  });
  const {
    metaProps,
    labelProps
  } = getComputeCircularOptionPickerCommonProps(asButtons, loop, ariaLabel, ariaLabelledby);
  const options = unsetable ? [unsetOption, ...duotoneOptions] : duotoneOptions;
  return /* @__PURE__ */ _jsx(CircularOptionPicker, {
    ...otherProps,
    ...metaProps,
    ...labelProps,
    options,
    actions: !!clearable && /* @__PURE__ */ _jsx(CircularOptionPicker.ButtonAction, {
      onClick: () => onChange(void 0),
      accessibleWhenDisabled: true,
      disabled: !value,
      children: __("Clear")
    }),
    children: /* @__PURE__ */ _jsx(Spacer, {
      paddingTop: options.length === 0 ? 0 : 4,
      children: /* @__PURE__ */ _jsxs(VStack, {
        spacing: 3,
        children: [!disableCustomColors && !disableCustomDuotone && /* @__PURE__ */ _jsx(CustomDuotoneBar, {
          value: isUnset ? void 0 : value,
          onChange
        }), !disableCustomDuotone && /* @__PURE__ */ _jsx(ColorListPicker, {
          labels: [__("Shadows"), __("Highlights")],
          colors: colorPalette,
          value: isUnset ? void 0 : value,
          disableCustomColors,
          enableAlpha: true,
          onChange: (newColors) => {
            if (!newColors[0]) {
              newColors[0] = defaultDark;
            }
            if (!newColors[1]) {
              newColors[1] = defaultLight;
            }
            const newValue = newColors.length >= 2 ? newColors : void 0;
            onChange(newValue);
          }
        })]
      })
    })
  });
}
var duotone_picker_default = DuotonePicker;
export {
  duotone_picker_default as default
};
//# sourceMappingURL=duotone-picker.mjs.map
