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

// packages/components/src/validated-form-controls/components/text-control.tsx
var text_control_exports = {};
__export(text_control_exports, {
  ValidatedTextControl: () => ValidatedTextControl
});
module.exports = __toCommonJS(text_control_exports);
var import_compose = require("@wordpress/compose");
var import_element = require("@wordpress/element");
var import_control_with_error = require("../control-with-error.cjs");
var import_text_control = __toESM(require("../../text-control/index.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
var UnforwardedValidatedTextControl = ({
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
    customValidity,
    getValidityTarget: () => validityTargetRef.current,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_text_control.default, {
      __next40pxDefaultSize: true,
      ref: mergedRefs,
      ...restProps
    })
  });
};
var ValidatedTextControl = (0, import_element.forwardRef)(UnforwardedValidatedTextControl);
ValidatedTextControl.displayName = "ValidatedTextControl";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ValidatedTextControl
});
//# sourceMappingURL=text-control.cjs.map
