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

// packages/components/src/validated-form-controls/components/toggle-group-control.tsx
var toggle_group_control_exports = {};
__export(toggle_group_control_exports, {
  ValidatedToggleGroupControl: () => ValidatedToggleGroupControl
});
module.exports = __toCommonJS(toggle_group_control_exports);
var import_element = require("@wordpress/element");
var import_control_with_error = require("../control-with-error.cjs");
var import_toggle_group_control = require("../../toggle-group-control/index.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
var UnforwardedValidatedToggleGroupControl = ({
  required,
  customValidity,
  markWhenOptional,
  ...restProps
}, forwardedRef) => {
  const validityTargetRef = (0, import_element.useRef)(null);
  const nameAttr = (0, import_element.useId)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: "components-validated-control__wrapper-with-error-delegate",
    children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_control_with_error.ControlWithError, {
      required,
      markWhenOptional,
      customValidity,
      getValidityTarget: () => validityTargetRef.current,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_toggle_group_control.ToggleGroupControl, {
        __next40pxDefaultSize: true,
        ref: forwardedRef,
        ...restProps
      })
    }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
      className: "components-validated-control__error-delegate",
      type: "radio",
      ref: validityTargetRef,
      required,
      checked: restProps.value !== void 0,
      tabIndex: -1,
      name: nameAttr,
      onChange: () => {
      },
      onFocus: (e) => {
        e.target.previousElementSibling?.querySelector('[data-active-item="true"]')?.focus();
      }
    })]
  });
};
var ValidatedToggleGroupControl = (0, import_element.forwardRef)(UnforwardedValidatedToggleGroupControl);
ValidatedToggleGroupControl.displayName = "ValidatedToggleGroupControl";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ValidatedToggleGroupControl
});
//# sourceMappingURL=toggle-group-control.cjs.map
