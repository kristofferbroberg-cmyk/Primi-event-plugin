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

// packages/dataviews/src/components/dataform-controls/utils/validated-number.tsx
var validated_number_exports = {};
__export(validated_number_exports, {
  default: () => ValidatedNumber
});
module.exports = __toCommonJS(validated_number_exports);
var import_components = require("@wordpress/components");
var import_element = require("@wordpress/element");
var import_i18n = require("@wordpress/i18n");
var import_constants = require("../../../constants.cjs");
var import_lock_unlock = require("../../../lock-unlock.cjs");
var import_get_custom_validity = __toESM(require("./get-custom-validity.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
var { ValidatedNumberControl } = (0, import_lock_unlock.unlock)(import_components.privateApis);
function toNumberOrEmpty(value) {
  if (value === "" || value === void 0) {
    return "";
  }
  const number = Number(value);
  return Number.isFinite(number) ? number : "";
}
function BetweenControls({
  value,
  onChange,
  hideLabelFromVision,
  step
}) {
  const [min = "", max = ""] = value;
  const onChangeMin = (0, import_element.useCallback)(
    (newValue) => onChange([toNumberOrEmpty(newValue), max]),
    [onChange, max]
  );
  const onChangeMax = (0, import_element.useCallback)(
    (newValue) => onChange([min, toNumberOrEmpty(newValue)]),
    [onChange, min]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_components.BaseControl,
    {
      help: (0, import_i18n.__)("The max. value must be greater than the min. value."),
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_components.Flex, { direction: "row", gap: 4, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_components.__experimentalNumberControl,
          {
            label: (0, import_i18n.__)("Min."),
            value: min,
            max: max ? Number(max) - step : void 0,
            onChange: onChangeMin,
            __next40pxDefaultSize: true,
            hideLabelFromVision,
            step
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_components.__experimentalNumberControl,
          {
            label: (0, import_i18n.__)("Max."),
            value: max,
            min: min ? Number(min) + step : void 0,
            onChange: onChangeMax,
            __next40pxDefaultSize: true,
            hideLabelFromVision,
            step
          }
        )
      ] })
    }
  );
}
function ValidatedNumber({
  data,
  field,
  onChange,
  hideLabelFromVision,
  markWhenOptional,
  operator,
  validity
}) {
  const decimals = field.format?.decimals ?? 0;
  const step = Math.pow(10, Math.abs(decimals) * -1);
  const { label, description, getValue, setValue, isValid } = field;
  const value = getValue({ item: data }) ?? "";
  const onChangeControl = (0, import_element.useCallback)(
    (newValue) => {
      onChange(
        setValue({
          item: data,
          // Do not convert an empty string or undefined to a number,
          // otherwise there's a mismatch between the UI control (empty)
          // and the data relied by onChange (0).
          value: ["", void 0].includes(newValue) ? void 0 : Number(newValue)
        })
      );
    },
    [data, onChange, setValue]
  );
  const onChangeBetweenControls = (0, import_element.useCallback)(
    (newValue) => {
      onChange(
        setValue({
          item: data,
          value: newValue
        })
      );
    },
    [data, onChange, setValue]
  );
  if (operator === import_constants.OPERATOR_BETWEEN) {
    let valueBetween = ["", ""];
    if (Array.isArray(value) && value.length === 2 && value.every(
      (element) => typeof element === "number" || element === ""
    )) {
      valueBetween = value;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      BetweenControls,
      {
        value: valueBetween,
        onChange: onChangeBetweenControls,
        hideLabelFromVision,
        step
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ValidatedNumberControl,
    {
      required: !!isValid.required,
      markWhenOptional,
      customValidity: (0, import_get_custom_validity.default)(isValid, validity),
      label,
      help: description,
      value,
      onChange: onChangeControl,
      __next40pxDefaultSize: true,
      hideLabelFromVision,
      step,
      min: isValid.min ? isValid.min.constraint : void 0,
      max: isValid.max ? isValid.max.constraint : void 0
    }
  );
}
//# sourceMappingURL=validated-number.cjs.map
