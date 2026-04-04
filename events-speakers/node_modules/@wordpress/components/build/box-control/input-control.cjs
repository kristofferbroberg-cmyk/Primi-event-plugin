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

// packages/components/src/box-control/input-control.tsx
var input_control_exports = {};
__export(input_control_exports, {
  default: () => BoxInputControl
});
module.exports = __toCommonJS(input_control_exports);
var import_compose = require("@wordpress/compose");
var import_i18n = require("@wordpress/i18n");
var import_element = require("@wordpress/element");
var import_icons = require("@wordpress/icons");
var import_tooltip = __toESM(require("../tooltip/index.cjs"));
var import_utils = require("../unit-control/utils.cjs");
var import_utils2 = require("./utils.cjs");
var import_box_control_styles = require("./styles/box-control-styles.cjs");
var import_button = __toESM(require("../button/index.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
var noop = () => {
};
function getSidesToModify(side, sides, isAlt) {
  const allowedSides = (0, import_utils2.getAllowedSides)(sides);
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
  const mergedValue = (0, import_utils2.getMergedValue)(values, defaultValuesToModify);
  const hasValues = (0, import_utils2.isValuesDefined)(values);
  const isMixed = hasValues && defaultValuesToModify.length > 1 && (0, import_utils2.isValueMixed)(values, defaultValuesToModify);
  const [parsedQuantity, parsedUnit] = (0, import_utils.parseQuantityAndUnitFromRawValue)(mergedValue);
  const computedUnit = hasValues ? parsedUnit : selectedUnits[defaultValuesToModify[0]];
  const generatedId = (0, import_compose.useInstanceId)(BoxInputControl, "box-control-input");
  const inputId = [generatedId, side].join("-");
  const isMixedUnit = defaultValuesToModify.length > 1 && mergedValue === void 0 && defaultValuesToModify.some((s) => selectedUnits[s] !== computedUnit);
  const usedValue = mergedValue === void 0 && computedUnit ? computedUnit : mergedValue;
  const mixedPlaceholder = isMixed || isMixedUnit ? (0, import_i18n.__)("Mixed") : void 0;
  const hasPresets = presets && presets.length > 0 && presetKey;
  const hasPresetValue = hasPresets && mergedValue !== void 0 && !isMixed && (0, import_utils2.isValuePreset)(mergedValue, presetKey);
  const [showCustomValueControl, setShowCustomValueControl] = (0, import_element.useState)(!hasPresets || !hasPresetValue && !isMixed && mergedValue !== void 0);
  const presetIndex = hasPresetValue ? (0, import_utils2.getPresetIndexFromValue)(mergedValue, presetKey, presets) : void 0;
  const marks = hasPresets ? [{
    value: 0,
    label: "",
    tooltip: (0, import_i18n.__)("None")
  }, ...presets.map((preset, index) => ({
    value: index + 1,
    label: "",
    tooltip: preset.name ?? preset.slug
  }))] : [];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_box_control_styles.InputWrapper, {
    expanded: true,
    children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_box_control_styles.FlexedBoxControlIcon, {
      side,
      sides
    }), showCustomValueControl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
      children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_tooltip.default, {
        placement: "top-end",
        text: import_utils2.LABELS[side],
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_box_control_styles.StyledUnitControl, {
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
          label: import_utils2.LABELS[side],
          placeholder: mixedPlaceholder,
          hideLabelFromVision: true
        })
      }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_box_control_styles.FlexedRangeControl, {
        __next40pxDefaultSize,
        __shouldNotWarnDeprecated36pxSize: true,
        "aria-controls": inputId,
        label: import_utils2.LABELS[side],
        hideLabelFromVision: true,
        onChange: (newValue) => {
          handleOnValueChange(newValue !== void 0 ? [newValue, computedUnit].join("") : void 0);
        },
        min: isFinite(min) ? min : 0,
        max: import_utils2.CUSTOM_VALUE_SETTINGS[computedUnit ?? "px"]?.max ?? 10,
        step: import_utils2.CUSTOM_VALUE_SETTINGS[computedUnit ?? "px"]?.step ?? 0.1,
        value: parsedQuantity ?? 0,
        withInputField: false
      })]
    }), hasPresets && !showCustomValueControl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_box_control_styles.FlexedRangeControl, {
      __next40pxDefaultSize: true,
      className: "spacing-sizes-control__range-control",
      value: presetIndex !== void 0 ? presetIndex + 1 : 0,
      onChange: (newIndex) => {
        const newValue = newIndex === 0 || newIndex === void 0 ? void 0 : (0, import_utils2.getPresetValueFromIndex)(newIndex - 1, presetKey, presets);
        handleRawOnValueChange(newValue);
      },
      withInputField: false,
      "aria-valuenow": presetIndex !== void 0 ? presetIndex + 1 : 0,
      "aria-valuetext": marks[presetIndex !== void 0 ? presetIndex + 1 : 0].tooltip,
      renderTooltipContent: (index) => marks[!index ? 0 : index].tooltip,
      min: 0,
      max: marks.length - 1,
      marks,
      label: import_utils2.LABELS[side],
      hideLabelFromVision: true
    }), hasPresets && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_button.default, {
      label: showCustomValueControl ? (0, import_i18n.__)("Use size preset") : (0, import_i18n.__)("Set custom size"),
      icon: import_icons.settings,
      onClick: () => {
        setShowCustomValueControl(!showCustomValueControl);
      },
      isPressed: showCustomValueControl,
      size: "small",
      iconSize: 24
    })]
  }, `box-control-${side}`);
}
//# sourceMappingURL=input-control.cjs.map
