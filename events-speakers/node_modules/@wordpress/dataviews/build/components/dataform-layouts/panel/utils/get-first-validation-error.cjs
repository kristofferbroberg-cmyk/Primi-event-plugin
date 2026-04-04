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

// packages/dataviews/src/components/dataform-layouts/panel/utils/get-first-validation-error.ts
var get_first_validation_error_exports = {};
__export(get_first_validation_error_exports, {
  default: () => get_first_validation_error_default
});
module.exports = __toCommonJS(get_first_validation_error_exports);
function getFirstValidationError(validity) {
  if (!validity) {
    return void 0;
  }
  const validityRules = Object.keys(validity).filter(
    (key) => key !== "children"
  );
  for (const key of validityRules) {
    const rule = validity[key];
    if (rule === void 0) {
      continue;
    }
    if (rule.type === "invalid") {
      if (rule.message) {
        return rule.message;
      }
      if (key === "required") {
        return "A required field is empty";
      }
      return "Unidentified validation error";
    }
  }
  if (validity.children) {
    for (const childValidity of Object.values(validity.children)) {
      const childError = getFirstValidationError(childValidity);
      if (childError) {
        return childError;
      }
    }
  }
  return void 0;
}
var get_first_validation_error_default = getFirstValidationError;
//# sourceMappingURL=get-first-validation-error.cjs.map
