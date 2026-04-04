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

// packages/dataviews/src/components/dataform-controls/index.tsx
var dataform_controls_exports = {};
__export(dataform_controls_exports, {
  getControl: () => getControl,
  getControlByType: () => getControlByType
});
module.exports = __toCommonJS(dataform_controls_exports);
var import_checkbox = __toESM(require("./checkbox.cjs"));
var import_combobox = __toESM(require("./combobox.cjs"));
var import_datetime = __toESM(require("./datetime.cjs"));
var import_date = __toESM(require("./date.cjs"));
var import_adaptive_select = __toESM(require("./adaptive-select.cjs"));
var import_email = __toESM(require("./email.cjs"));
var import_telephone = __toESM(require("./telephone.cjs"));
var import_url = __toESM(require("./url.cjs"));
var import_integer = __toESM(require("./integer.cjs"));
var import_number = __toESM(require("./number.cjs"));
var import_radio = __toESM(require("./radio.cjs"));
var import_select = __toESM(require("./select.cjs"));
var import_text = __toESM(require("./text.cjs"));
var import_toggle = __toESM(require("./toggle.cjs"));
var import_textarea = __toESM(require("./textarea.cjs"));
var import_toggle_group = __toESM(require("./toggle-group.cjs"));
var import_array = __toESM(require("./array.cjs"));
var import_color = __toESM(require("./color.cjs"));
var import_password = __toESM(require("./password.cjs"));
var import_has_elements = __toESM(require("../../field-types/utils/has-elements.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
var FORM_CONTROLS = {
  adaptiveSelect: import_adaptive_select.default,
  array: import_array.default,
  checkbox: import_checkbox.default,
  color: import_color.default,
  combobox: import_combobox.default,
  datetime: import_datetime.default,
  date: import_date.default,
  email: import_email.default,
  telephone: import_telephone.default,
  url: import_url.default,
  integer: import_integer.default,
  number: import_number.default,
  password: import_password.default,
  radio: import_radio.default,
  select: import_select.default,
  text: import_text.default,
  toggle: import_toggle.default,
  textarea: import_textarea.default,
  toggleGroup: import_toggle_group.default
};
function isEditConfig(value) {
  return value && typeof value === "object" && typeof value.control === "string";
}
function createConfiguredControl(config) {
  const { control, ...controlConfig } = config;
  const BaseControlType = getControlByType(control);
  if (BaseControlType === null) {
    return null;
  }
  return function ConfiguredControl(props) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaseControlType, { ...props, config: controlConfig });
  };
}
function getControl(field, fallback) {
  if (typeof field.Edit === "function") {
    return field.Edit;
  }
  if (typeof field.Edit === "string") {
    return getControlByType(field.Edit);
  }
  if (isEditConfig(field.Edit)) {
    return createConfiguredControl(field.Edit);
  }
  if ((0, import_has_elements.default)(field) && field.type !== "array") {
    return getControlByType("adaptiveSelect");
  }
  if (fallback === null) {
    return null;
  }
  return getControlByType(fallback);
}
function getControlByType(type) {
  if (Object.keys(FORM_CONTROLS).includes(type)) {
    return FORM_CONTROLS[type];
  }
  return null;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getControl,
  getControlByType
});
//# sourceMappingURL=index.cjs.map
