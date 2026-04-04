"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/components/src/validated-form-controls/components/form-token-field.tsx
var form_token_field_exports = {};
__export(form_token_field_exports, {
  ValidatedFormTokenField: () => ValidatedFormTokenField
});
module.exports = __toCommonJS(form_token_field_exports);
var import_element = require("@wordpress/element");
var import_control_with_error = require("../control-with-error.cjs");
var import_form_token_field = require("../../form-token-field/index.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
var UnforwardedValidatedFormTokenField = ({
  required,
  customValidity,
  markWhenOptional,
  ...restProps
}, forwardedRef) => {
  const validityTargetRef = (0, import_element.useRef)(null);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: "components-validated-control__wrapper-with-error-delegate",
    ref: forwardedRef,
    children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_control_with_error.ControlWithError, {
      required,
      markWhenOptional,
      customValidity,
      getValidityTarget: () => validityTargetRef.current,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_form_token_field.FormTokenField, {
        __next40pxDefaultSize: true,
        ...restProps
      })
    }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
      className: "components-validated-control__error-delegate",
      type: "text",
      ref: validityTargetRef,
      required,
      value: restProps.value && restProps.value.length > 0 ? "hasvalue" : "",
      tabIndex: -1,
      onChange: () => {
      },
      onFocus: (e) => {
        e.target.previousElementSibling?.querySelector('input[type="text"]')?.focus();
      }
    })]
  });
};
var ValidatedFormTokenField = (0, import_element.forwardRef)(UnforwardedValidatedFormTokenField);
ValidatedFormTokenField.displayName = "ValidatedFormTokenField";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ValidatedFormTokenField
});
//# sourceMappingURL=form-token-field.cjs.map
