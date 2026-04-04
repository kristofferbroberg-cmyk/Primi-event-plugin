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

// packages/dataviews/src/components/dataform-controls/utils/relative-date-control.tsx
var relative_date_control_exports = {};
__export(relative_date_control_exports, {
  default: () => RelativeDateControl
});
module.exports = __toCommonJS(relative_date_control_exports);
var import_clsx = __toESM(require("clsx"));
var import_components = require("@wordpress/components");
var import_element = require("@wordpress/element");
var import_i18n = require("@wordpress/i18n");
var import_ui = require("@wordpress/ui");
var import_constants = require("../../../constants.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
var TIME_UNITS_OPTIONS = {
  [import_constants.OPERATOR_IN_THE_PAST]: [
    { value: "days", label: (0, import_i18n.__)("Days") },
    { value: "weeks", label: (0, import_i18n.__)("Weeks") },
    { value: "months", label: (0, import_i18n.__)("Months") },
    { value: "years", label: (0, import_i18n.__)("Years") }
  ],
  [import_constants.OPERATOR_OVER]: [
    { value: "days", label: (0, import_i18n.__)("Days ago") },
    { value: "weeks", label: (0, import_i18n.__)("Weeks ago") },
    { value: "months", label: (0, import_i18n.__)("Months ago") },
    { value: "years", label: (0, import_i18n.__)("Years ago") }
  ]
};
function RelativeDateControl({
  className,
  data,
  field,
  onChange,
  hideLabelFromVision,
  operator
}) {
  const options = TIME_UNITS_OPTIONS[operator === import_constants.OPERATOR_IN_THE_PAST ? "inThePast" : "over"];
  const { id, label, description, getValue, setValue } = field;
  const fieldValue = getValue({ item: data });
  const { value: relValue = "", unit = options[0].value } = fieldValue && typeof fieldValue === "object" ? fieldValue : {};
  const onChangeValue = (0, import_element.useCallback)(
    (newValue) => onChange(
      setValue({
        item: data,
        value: { value: Number(newValue), unit }
      })
    ),
    [onChange, setValue, data, unit]
  );
  const onChangeUnit = (0, import_element.useCallback)(
    (newUnit) => onChange(
      setValue({
        item: data,
        value: { value: relValue, unit: newUnit }
      })
    ),
    [onChange, setValue, data, relValue]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_components.BaseControl,
    {
      id,
      className: (0, import_clsx.default)(className, "dataviews-controls__relative-date"),
      label,
      hideLabelFromVision,
      help: description,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Stack, { direction: "row", gap: "sm", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_components.__experimentalNumberControl,
          {
            __next40pxDefaultSize: true,
            className: "dataviews-controls__relative-date-number",
            spinControls: "none",
            min: 1,
            step: 1,
            value: relValue,
            onChange: onChangeValue
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_components.SelectControl,
          {
            className: "dataviews-controls__relative-date-unit",
            __next40pxDefaultSize: true,
            label: (0, import_i18n.__)("Unit"),
            value: unit,
            options,
            onChange: onChangeUnit,
            hideLabelFromVision: true
          }
        )
      ] })
    }
  );
}
//# sourceMappingURL=relative-date-control.cjs.map
