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

// packages/components/src/box-control/index.tsx
var box_control_exports = {};
__export(box_control_exports, {
  applyValueToSides: () => import_utils3.applyValueToSides,
  default: () => box_control_default
});
module.exports = __toCommonJS(box_control_exports);
var import_compose = require("@wordpress/compose");
var import_element = require("@wordpress/element");
var import_i18n = require("@wordpress/i18n");
var import_warning = __toESM(require("@wordpress/warning"));
var import_base_control = require("../base-control/index.cjs");
var import_input_control = __toESM(require("./input-control.cjs"));
var import_linked_button = __toESM(require("./linked-button.cjs"));
var import_grid = require("../grid/index.cjs");
var import_box_control_styles = require("./styles/box-control-styles.cjs");
var import_utils = require("../unit-control/utils.cjs");
var import_utils2 = require("./utils.cjs");
var import_hooks = require("../utils/hooks/index.cjs");
var import_deprecated_36px_size = require("../utils/deprecated-36px-size.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
var import_utils3 = require("./utils.cjs");
var defaultInputProps = {
  min: 0
};
var noop = () => {
};
function useUniqueId(idProp) {
  const instanceId = (0, import_compose.useInstanceId)(BoxControl, "inspector-box-control");
  return idProp || instanceId;
}
function BoxControl({
  __next40pxDefaultSize = false,
  id: idProp,
  inputProps = defaultInputProps,
  onChange = noop,
  label = (0, import_i18n.__)("Box Control"),
  values: valuesProp,
  units,
  sides,
  splitOnAxis = false,
  allowReset = true,
  resetValues = import_utils2.DEFAULT_VALUES,
  presets,
  presetKey,
  onMouseOver,
  onMouseOut
}) {
  const [values, setValues] = (0, import_hooks.useControlledState)(valuesProp, {
    fallback: import_utils2.DEFAULT_VALUES
  });
  const inputValues = values || import_utils2.DEFAULT_VALUES;
  const hasInitialValue = (0, import_utils2.isValuesDefined)(valuesProp);
  const hasOneSide = sides?.length === 1;
  const [isDirty, setIsDirty] = (0, import_element.useState)(hasInitialValue);
  const [isLinked, setIsLinked] = (0, import_element.useState)(!hasInitialValue || !(0, import_utils2.isValueMixed)(inputValues) || hasOneSide);
  const [side, setSide] = (0, import_element.useState)((0, import_utils2.getInitialSide)(isLinked, splitOnAxis));
  const [selectedUnits, setSelectedUnits] = (0, import_element.useState)({
    top: (0, import_utils.parseQuantityAndUnitFromRawValue)(valuesProp?.top)[1],
    right: (0, import_utils.parseQuantityAndUnitFromRawValue)(valuesProp?.right)[1],
    bottom: (0, import_utils.parseQuantityAndUnitFromRawValue)(valuesProp?.bottom)[1],
    left: (0, import_utils.parseQuantityAndUnitFromRawValue)(valuesProp?.left)[1]
  });
  const id = useUniqueId(idProp);
  const headingId = `${id}-heading`;
  const toggleLinked = () => {
    setIsLinked(!isLinked);
    setSide((0, import_utils2.getInitialSide)(!isLinked, splitOnAxis));
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
  (0, import_deprecated_36px_size.maybeWarnDeprecated36pxSize)({
    componentName: "BoxControl",
    __next40pxDefaultSize,
    size: void 0
  });
  const sidesToRender = (0, import_utils2.getAllowedSides)(sides);
  if (presets && !presetKey || !presets && presetKey) {
    const definedProp = presets ? "presets" : "presetKey";
    const missingProp = presets ? "presetKey" : "presets";
    globalThis.SCRIPT_DEBUG === true ? (0, import_warning.default)(`wp.components.BoxControl: the '${missingProp}' prop is required when the '${definedProp}' prop is defined.`) : void 0;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_grid.Grid, {
    id,
    columns: 3,
    templateColumns: "1fr min-content min-content",
    role: "group",
    "aria-labelledby": headingId,
    children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_base_control.BaseControl.VisualLabel, {
      id: headingId,
      children: label
    }), isLinked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_box_control_styles.InputWrapper, {
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_input_control.default, {
        side: "all",
        ...inputControlProps
      })
    }), !hasOneSide && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_box_control_styles.LinkedButtonWrapper, {
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_linked_button.default, {
        onClick: toggleLinked,
        isLinked
      })
    }), !isLinked && splitOnAxis && ["vertical", "horizontal"].map((axis) => (
      // Disable reason: the parent component is handling the __next40pxDefaultSize prop
      // eslint-disable-next-line @wordpress/components-no-missing-40px-size-prop
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_input_control.default, {
        side: axis,
        ...inputControlProps
      }, axis)
    )), !isLinked && !splitOnAxis && Array.from(sidesToRender).map((axis) => (
      // Disable reason: the parent component is handling the __next40pxDefaultSize prop
      // eslint-disable-next-line @wordpress/components-no-missing-40px-size-prop
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_input_control.default, {
        side: axis,
        ...inputControlProps
      }, axis)
    )), allowReset && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_box_control_styles.ResetButton, {
      className: "component-box-control__reset-button",
      variant: "secondary",
      size: "small",
      onClick: handleOnReset,
      disabled: !isDirty,
      children: (0, import_i18n.__)("Reset")
    })]
  });
}
var box_control_default = BoxControl;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  applyValueToSides
});
//# sourceMappingURL=index.cjs.map
