// packages/components/src/box-control/index.tsx
import { useInstanceId } from "@wordpress/compose";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import warning from "@wordpress/warning";
import { BaseControl } from "../base-control/index.mjs";
import InputControl from "./input-control.mjs";
import LinkedButton from "./linked-button.mjs";
import { Grid } from "../grid/index.mjs";
import { InputWrapper, ResetButton, LinkedButtonWrapper } from "./styles/box-control-styles.mjs";
import { parseQuantityAndUnitFromRawValue } from "../unit-control/utils.mjs";
import { DEFAULT_VALUES, getInitialSide, isValueMixed, isValuesDefined, getAllowedSides } from "./utils.mjs";
import { useControlledState } from "../utils/hooks/index.mjs";
import { maybeWarnDeprecated36pxSize } from "../utils/deprecated-36px-size.mjs";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { applyValueToSides } from "./utils.mjs";
var defaultInputProps = {
  min: 0
};
var noop = () => {
};
function useUniqueId(idProp) {
  const instanceId = useInstanceId(BoxControl, "inspector-box-control");
  return idProp || instanceId;
}
function BoxControl({
  __next40pxDefaultSize = false,
  id: idProp,
  inputProps = defaultInputProps,
  onChange = noop,
  label = __("Box Control"),
  values: valuesProp,
  units,
  sides,
  splitOnAxis = false,
  allowReset = true,
  resetValues = DEFAULT_VALUES,
  presets,
  presetKey,
  onMouseOver,
  onMouseOut
}) {
  const [values, setValues] = useControlledState(valuesProp, {
    fallback: DEFAULT_VALUES
  });
  const inputValues = values || DEFAULT_VALUES;
  const hasInitialValue = isValuesDefined(valuesProp);
  const hasOneSide = sides?.length === 1;
  const [isDirty, setIsDirty] = useState(hasInitialValue);
  const [isLinked, setIsLinked] = useState(!hasInitialValue || !isValueMixed(inputValues) || hasOneSide);
  const [side, setSide] = useState(getInitialSide(isLinked, splitOnAxis));
  const [selectedUnits, setSelectedUnits] = useState({
    top: parseQuantityAndUnitFromRawValue(valuesProp?.top)[1],
    right: parseQuantityAndUnitFromRawValue(valuesProp?.right)[1],
    bottom: parseQuantityAndUnitFromRawValue(valuesProp?.bottom)[1],
    left: parseQuantityAndUnitFromRawValue(valuesProp?.left)[1]
  });
  const id = useUniqueId(idProp);
  const headingId = `${id}-heading`;
  const toggleLinked = () => {
    setIsLinked(!isLinked);
    setSide(getInitialSide(!isLinked, splitOnAxis));
  };
  const handleOnFocus = (_event, {
    side: nextSide
  }) => {
    setSide(nextSide);
  };
  const handleOnChange = (nextValues) => {
    onChange(nextValues);
    setValues(nextValues);
    setIsDirty(true);
  };
  const handleOnReset = () => {
    onChange(resetValues);
    setValues(resetValues);
    setSelectedUnits(resetValues);
    setIsDirty(false);
  };
  const inputControlProps = {
    onMouseOver,
    onMouseOut,
    ...inputProps,
    onChange: handleOnChange,
    onFocus: handleOnFocus,
    isLinked,
    units,
    selectedUnits,
    setSelectedUnits,
    sides,
    values: inputValues,
    __next40pxDefaultSize,
    presets,
    presetKey
  };
  maybeWarnDeprecated36pxSize({
    componentName: "BoxControl",
    __next40pxDefaultSize,
    size: void 0
  });
  const sidesToRender = getAllowedSides(sides);
  if (presets && !presetKey || !presets && presetKey) {
    const definedProp = presets ? "presets" : "presetKey";
    const missingProp = presets ? "presetKey" : "presets";
    globalThis.SCRIPT_DEBUG === true ? warning(`wp.components.BoxControl: the '${missingProp}' prop is required when the '${definedProp}' prop is defined.`) : void 0;
  }
  return /* @__PURE__ */ _jsxs(Grid, {
    id,
    columns: 3,
    templateColumns: "1fr min-content min-content",
    role: "group",
    "aria-labelledby": headingId,
    children: [/* @__PURE__ */ _jsx(BaseControl.VisualLabel, {
      id: headingId,
      children: label
    }), isLinked && /* @__PURE__ */ _jsx(InputWrapper, {
      children: /* @__PURE__ */ _jsx(InputControl, {
        side: "all",
        ...inputControlProps
      })
    }), !hasOneSide && /* @__PURE__ */ _jsx(LinkedButtonWrapper, {
      children: /* @__PURE__ */ _jsx(LinkedButton, {
        onClick: toggleLinked,
        isLinked
      })
    }), !isLinked && splitOnAxis && ["vertical", "horizontal"].map((axis) => (
      // Disable reason: the parent component is handling the __next40pxDefaultSize prop
      // eslint-disable-next-line @wordpress/components-no-missing-40px-size-prop
      /* @__PURE__ */ _jsx(InputControl, {
        side: axis,
        ...inputControlProps
      }, axis)
    )), !isLinked && !splitOnAxis && Array.from(sidesToRender).map((axis) => (
      // Disable reason: the parent component is handling the __next40pxDefaultSize prop
      // eslint-disable-next-line @wordpress/components-no-missing-40px-size-prop
      /* @__PURE__ */ _jsx(InputControl, {
        side: axis,
        ...inputControlProps
      }, axis)
    )), allowReset && /* @__PURE__ */ _jsx(ResetButton, {
      className: "component-box-control__reset-button",
      variant: "secondary",
      size: "small",
      onClick: handleOnReset,
      disabled: !isDirty,
      children: __("Reset")
    })]
  });
}
var box_control_default = BoxControl;
export {
  applyValueToSides,
  box_control_default as default
};
//# sourceMappingURL=index.mjs.map
