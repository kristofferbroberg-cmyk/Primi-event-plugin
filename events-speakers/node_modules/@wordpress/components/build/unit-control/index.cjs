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

// packages/components/src/unit-control/index.tsx
var unit_control_exports = {};
__export(unit_control_exports, {
  UnitControl: () => UnitControl,
  default: () => unit_control_default,
  parseQuantityAndUnitFromRawValue: () => import_utils2.parseQuantityAndUnitFromRawValue,
  useCustomUnits: () => import_utils2.useCustomUnits
});
module.exports = __toCommonJS(unit_control_exports);
var import_clsx = __toESM(require("clsx"));
var import_deprecated = __toESM(require("@wordpress/deprecated"));
var import_element = require("@wordpress/element");
var import_i18n = require("@wordpress/i18n");
var import_unit_control_styles = require("./styles/unit-control-styles.cjs");
var import_unit_select_control = __toESM(require("./unit-select-control.cjs"));
var import_utils = require("./utils.cjs");
var import_hooks = require("../utils/hooks/index.cjs");
var import_strings = require("../utils/strings.cjs");
var import_use_deprecated_props = require("../utils/use-deprecated-props.cjs");
var import_deprecated_36px_size = require("../utils/deprecated-36px-size.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
var import_utils2 = require("./utils.cjs");
function UnforwardedUnitControl(unitControlProps, forwardedRef) {
  const {
    __unstableStateReducer,
    autoComplete = "off",
    // @ts-expect-error Ensure that children is omitted from restProps
    children,
    className,
    disabled = false,
    disableUnits = false,
    isPressEnterToChange = false,
    isResetValueOnUnitChange = false,
    isUnitSelectTabbable = true,
    label,
    onChange: onChangeProp,
    onUnitChange,
    size = "default",
    unit: unitProp,
    units: unitsProp = import_utils.CSS_UNITS,
    value: valueProp,
    onFocus: onFocusProp,
    __shouldNotWarnDeprecated36pxSize,
    ...props
  } = (0, import_use_deprecated_props.useDeprecated36pxDefaultSizeProp)(unitControlProps);
  (0, import_deprecated_36px_size.maybeWarnDeprecated36pxSize)({
    componentName: "UnitControl",
    __next40pxDefaultSize: props.__next40pxDefaultSize,
    size,
    __shouldNotWarnDeprecated36pxSize
  });
  if ("unit" in unitControlProps) {
    (0, import_deprecated.default)("UnitControl unit prop", {
      since: "5.6",
      hint: "The unit should be provided within the `value` prop.",
      version: "6.2"
    });
  }
  const nonNullValueProp = valueProp ?? void 0;
  const [units, reFirstCharacterOfUnits] = (0, import_element.useMemo)(() => {
    const list = (0, import_utils.getUnitsWithCurrentUnit)(nonNullValueProp, unitProp, unitsProp);
    const [{
      value: firstUnitValue = ""
    } = {}, ...rest] = list;
    const firstCharacters = rest.reduce((carry, {
      value
    }) => {
      const first = (0, import_strings.escapeRegExp)(value?.substring(0, 1) || "");
      return carry.includes(first) ? carry : `${carry}|${first}`;
    }, (0, import_strings.escapeRegExp)(firstUnitValue.substring(0, 1)));
    return [list, new RegExp(`^(?:${firstCharacters})$`, "i")];
  }, [nonNullValueProp, unitProp, unitsProp]);
  const [parsedQuantity, parsedUnit] = (0, import_utils.getParsedQuantityAndUnit)(nonNullValueProp, unitProp, units);
  const [unit, setUnit] = (0, import_hooks.useControlledState)(units.length === 1 ? units[0].value : unitProp, {
    initial: parsedUnit,
    fallback: ""
  });
  (0, import_element.useEffect)(() => {
    if (parsedUnit !== void 0) {
      setUnit(parsedUnit);
    }
  }, [parsedUnit, setUnit]);
  const classes = (0, import_clsx.default)(
    "components-unit-control",
    // This class is added for legacy purposes to maintain it on the outer
    // wrapper. See: https://github.com/WordPress/gutenberg/pull/45139
    "components-unit-control-wrapper",
    className
  );
  const handleOnQuantityChange = (nextQuantityValue, changeProps) => {
    if (nextQuantityValue === "" || typeof nextQuantityValue === "undefined" || nextQuantityValue === null) {
      onChangeProp?.("", changeProps);
      return;
    }
    const onChangeValue = (0, import_utils.getValidParsedQuantityAndUnit)(nextQuantityValue, units, parsedQuantity, unit).join("");
    onChangeProp?.(onChangeValue, changeProps);
  };
  const handleOnUnitChange = (nextUnitValue, changeProps) => {
    const {
      data
    } = changeProps;
    let nextValue = `${parsedQuantity ?? ""}${nextUnitValue}`;
    if (isResetValueOnUnitChange && data?.default !== void 0) {
      nextValue = `${data.default}${nextUnitValue}`;
    }
    onChangeProp?.(nextValue, changeProps);
    onUnitChange?.(nextUnitValue, changeProps);
    setUnit(nextUnitValue);
  };
  let handleOnKeyDown;
  if (!disableUnits && isUnitSelectTabbable && units.length) {
    handleOnKeyDown = (event) => {
      props.onKeyDown?.(event);
      if (!event.metaKey && !event.ctrlKey && reFirstCharacterOfUnits.test(event.key)) {
        refInputSuffix.current?.focus();
      }
    };
  }
  const refInputSuffix = (0, import_element.useRef)(null);
  const inputSuffix = !disableUnits ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_unit_select_control.default, {
    ref: refInputSuffix,
    "aria-label": (0, import_i18n.__)("Select unit"),
    disabled,
    isUnitSelectTabbable,
    onChange: handleOnUnitChange,
    size: ["small", "compact"].includes(size) || size === "default" && !props.__next40pxDefaultSize ? "small" : "default",
    unit,
    units,
    onFocus: onFocusProp,
    onBlur: unitControlProps.onBlur
  }) : null;
  let step = props.step;
  if (!step && units) {
    const activeUnit = units.find((option) => option.value === unit);
    step = activeUnit?.step ?? 1;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_unit_control_styles.ValueInput, {
    ...props,
    __shouldNotWarnDeprecated36pxSize: true,
    autoComplete,
    className: classes,
    disabled,
    spinControls: "none",
    isPressEnterToChange,
    label,
    onKeyDown: handleOnKeyDown,
    onChange: handleOnQuantityChange,
    ref: forwardedRef,
    size,
    suffix: inputSuffix,
    type: isPressEnterToChange ? "text" : "number",
    value: parsedQuantity ?? "",
    step,
    onFocus: onFocusProp,
    __unstableStateReducer
  });
}
var UnitControl = (0, import_element.forwardRef)(UnforwardedUnitControl);
UnitControl.displayName = "UnitControl";
var unit_control_default = UnitControl;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UnitControl,
  parseQuantityAndUnitFromRawValue,
  useCustomUnits
});
//# sourceMappingURL=index.cjs.map
