// packages/components/src/box-control/input-control.tsx
import { useInstanceId } from "@wordpress/compose";
import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import { settings } from "@wordpress/icons";
import Tooltip from "../tooltip/index.mjs";
import { parseQuantityAndUnitFromRawValue } from "../unit-control/utils.mjs";
import { CUSTOM_VALUE_SETTINGS, getMergedValue, getAllowedSides, getPresetIndexFromValue, getPresetValueFromIndex, isValuePreset, isValuesDefined, isValueMixed, LABELS } from "./utils.mjs";
import { FlexedBoxControlIcon, FlexedRangeControl, InputWrapper, StyledUnitControl } from "./styles/box-control-styles.mjs";
import Button from "../button/index.mjs";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
var noop = () => {
};
function getSidesToModify(side, sides, isAlt) {
  const allowedSides = getAllowedSides(sides);
  let modifiedSides = [];
  switch (side) {
    case "all":
      modifiedSides = ["top", "bottom", "left", "right"];
      break;
    case "horizontal":
      modifiedSides = ["left", "right"];
      break;
    case "vertical":
      modifiedSides = ["top", "bottom"];
      break;
    default:
      modifiedSides = [side];
  }
  if (isAlt) {
    switch (side) {
      case "top":
        modifiedSides.push("bottom");
        break;
      case "bottom":
        modifiedSides.push("top");
        break;
      case "left":
        modifiedSides.push("left");
        break;
      case "right":
        modifiedSides.push("right");
        break;
    }
  }
  return modifiedSides.filter((s) => allowedSides.has(s));
}
function BoxInputControl({
  __next40pxDefaultSize,
  onChange = noop,
  onFocus = noop,
  values,
  selectedUnits,
  setSelectedUnits,
  sides,
  side,
  min = 0,
  presets,
  presetKey,
  ...props
}) {
  const defaultValuesToModify = getSidesToModify(side, sides);
  const handleOnFocus = (event) => {
    onFocus(event, {
      side
    });
  };
  const handleOnChange = (nextValues) => {
    onChange(nextValues);
  };
  const handleRawOnValueChange = (next) => {
    const nextValues = {
      ...values
    };
    defaultValuesToModify.forEach((modifiedSide) => {
      nextValues[modifiedSide] = next;
    });
    handleOnChange(nextValues);
  };
  const handleOnValueChange = (next, extra) => {
    const nextValues = {
      ...values
    };
    const isNumeric = next !== void 0 && !isNaN(parseFloat(next));
    const nextValue = isNumeric ? next : void 0;
    const modifiedSides = getSidesToModify(
      side,
      sides,
      /**
       * Supports changing pair sides. For example, holding the ALT key
       * when changing the TOP will also update BOTTOM.
       */
      // @ts-expect-error - TODO: event.altKey is only present when the change event was
      // triggered by a keyboard event. Should this feature be implemented differently so
      // it also works with drag events?
      !!extra?.event.altKey
    );
    modifiedSides.forEach((modifiedSide) => {
      nextValues[modifiedSide] = nextValue;
    });
    handleOnChange(nextValues);
  };
  const handleOnUnitChange = (next) => {
    const newUnits = {
      ...selectedUnits
    };
    defaultValuesToModify.forEach((modifiedSide) => {
      newUnits[modifiedSide] = next;
    });
    setSelectedUnits(newUnits);
  };
  const mergedValue = getMergedValue(values, defaultValuesToModify);
  const hasValues = isValuesDefined(values);
  const isMixed = hasValues && defaultValuesToModify.length > 1 && isValueMixed(values, defaultValuesToModify);
  const [parsedQuantity, parsedUnit] = parseQuantityAndUnitFromRawValue(mergedValue);
  const computedUnit = hasValues ? parsedUnit : selectedUnits[defaultValuesToModify[0]];
  const generatedId = useInstanceId(BoxInputControl, "box-control-input");
  const inputId = [generatedId, side].join("-");
  const isMixedUnit = defaultValuesToModify.length > 1 && mergedValue === void 0 && defaultValuesToModify.some((s) => selectedUnits[s] !== computedUnit);
  const usedValue = mergedValue === void 0 && computedUnit ? computedUnit : mergedValue;
  const mixedPlaceholder = isMixed || isMixedUnit ? __("Mixed") : void 0;
  const hasPresets = presets && presets.length > 0 && presetKey;
  const hasPresetValue = hasPresets && mergedValue !== void 0 && !isMixed && isValuePreset(mergedValue, presetKey);
  const [showCustomValueControl, setShowCustomValueControl] = useState(!hasPresets || !hasPresetValue && !isMixed && mergedValue !== void 0);
  const presetIndex = hasPresetValue ? getPresetIndexFromValue(mergedValue, presetKey, presets) : void 0;
  const marks = hasPresets ? [{
    value: 0,
    label: "",
    tooltip: __("None")
  }, ...presets.map((preset, index) => ({
    value: index + 1,
    label: "",
    tooltip: preset.name ?? preset.slug
  }))] : [];
  return /* @__PURE__ */ _jsxs(InputWrapper, {
    expanded: true,
    children: [/* @__PURE__ */ _jsx(FlexedBoxControlIcon, {
      side,
      sides
    }), showCustomValueControl && /* @__PURE__ */ _jsxs(_Fragment, {
      children: [/* @__PURE__ */ _jsx(Tooltip, {
        placement: "top-end",
        text: LABELS[side],
        children: /* @__PURE__ */ _jsx(StyledUnitControl, {
          ...props,
          min,
          __shouldNotWarnDeprecated36pxSize: true,
          __next40pxDefaultSize,
          className: "component-box-control__unit-control",
          id: inputId,
          isPressEnterToChange: true,
          disableUnits: isMixed || isMixedUnit,
          value: usedValue,
          onChange: handleOnValueChange,
          onUnitChange: handleOnUnitChange,
          onFocus: handleOnFocus,
          label: LABELS[side],
          placeholder: mixedPlaceholder,
          hideLabelFromVision: true
        })
      }), /* @__PURE__ */ _jsx(FlexedRangeControl, {
        __next40pxDefaultSize,
        __shouldNotWarnDeprecated36pxSize: true,
        "aria-controls": inputId,
        label: LABELS[side],
        hideLabelFromVision: true,
        onChange: (newValue) => {
          handleOnValueChange(newValue !== void 0 ? [newValue, computedUnit].join("") : void 0);
        },
        min: isFinite(min) ? min : 0,
        max: CUSTOM_VALUE_SETTINGS[computedUnit ?? "px"]?.max ?? 10,
        step: CUSTOM_VALUE_SETTINGS[computedUnit ?? "px"]?.step ?? 0.1,
        value: parsedQuantity ?? 0,
        withInputField: false
      })]
    }), hasPresets && !showCustomValueControl && /* @__PURE__ */ _jsx(FlexedRangeControl, {
      __next40pxDefaultSize: true,
      className: "spacing-sizes-control__range-control",
      value: presetIndex !== void 0 ? presetIndex + 1 : 0,
      onChange: (newIndex) => {
        const newValue = newIndex === 0 || newIndex === void 0 ? void 0 : getPresetValueFromIndex(newIndex - 1, presetKey, presets);
        handleRawOnValueChange(newValue);
      },
      withInputField: false,
      "aria-valuenow": presetIndex !== void 0 ? presetIndex + 1 : 0,
      "aria-valuetext": marks[presetIndex !== void 0 ? presetIndex + 1 : 0].tooltip,
      renderTooltipContent: (index) => marks[!index ? 0 : index].tooltip,
      min: 0,
      max: marks.length - 1,
      marks,
      label: LABELS[side],
      hideLabelFromVision: true
    }), hasPresets && /* @__PURE__ */ _jsx(Button, {
      label: showCustomValueControl ? __("Use size preset") : __("Set custom size"),
      icon: settings,
      onClick: () => {
        setShowCustomValueControl(!showCustomValueControl);
      },
      isPressed: showCustomValueControl,
      size: "small",
      iconSize: 24
    })]
  }, `box-control-${side}`);
}
export {
  BoxInputControl as default
};
//# sourceMappingURL=input-control.mjs.map
