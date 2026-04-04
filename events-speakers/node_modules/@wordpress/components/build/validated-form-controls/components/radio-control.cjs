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

// packages/components/src/validated-form-controls/components/radio-control.tsx
var radio_control_exports = {};
__export(radio_control_exports, {
  ValidatedRadioControl: () => ValidatedRadioControl
});
module.exports = __toCommonJS(radio_control_exports);
var import_compose = require("@wordpress/compose");
var import_element = require("@wordpress/element");
var import_control_with_error = require("../control-with-error.cjs");
var import_radio_control = __toESM(require("../../radio-control/index.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
var UnforwardedValidatedRadioControl = ({
  required,
  customValidity,
  markWhenOptional,
  ...restProps
}, forwardedRef) => {
  const validityTargetRef = (0, import_element.useRef)(null);
  const mergedRefs = (0, import_compose.useMergeRefs)([forwardedRef, validityTargetRef]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_control_with_error.ControlWithError, {
    required,
    markWhenOptional,
    ref: mergedRefs,
    customValidity,
    getValidityTarget: () => validityTargetRef.current?.querySelector('input[type="radio"]'),
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_radio_control.default, {
      ...restProps
    })
  });
};
var ValidatedRadioControl = (0, import_element.forwardRef)(UnforwardedValidatedRadioControl);
ValidatedRadioControl.displayName = "ValidatedRadioControl";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ValidatedRadioControl
});
//# sourceMappingURL=radio-control.cjs.map
