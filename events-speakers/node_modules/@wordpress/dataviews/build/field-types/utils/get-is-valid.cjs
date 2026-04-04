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

// packages/dataviews/src/field-types/utils/get-is-valid.ts
var get_is_valid_exports = {};
__export(get_is_valid_exports, {
  default: () => getIsValid
});
module.exports = __toCommonJS(get_is_valid_exports);
function getIsValid(field, fieldType) {
  let required;
  if (field.isValid?.required === true && fieldType.validate.required !== void 0) {
    required = {
      constraint: true,
      validate: fieldType.validate.required
    };
  }
  let elements;
  if ((field.isValid?.elements === true || // elements is enabled unless the field opts-out
  field.isValid?.elements === void 0 && (!!field.elements || !!field.getElements)) && fieldType.validate.elements !== void 0) {
    elements = {
      constraint: true,
      validate: fieldType.validate.elements
    };
  }
  let min;
  if (typeof field.isValid?.min === "number" && fieldType.validate.min !== void 0) {
    min = {
      constraint: field.isValid.min,
      validate: fieldType.validate.min
    };
  }
  let max;
  if (typeof field.isValid?.max === "number" && fieldType.validate.max !== void 0) {
    max = {
      constraint: field.isValid.max,
      validate: fieldType.validate.max
    };
  }
  let minLength;
  if (typeof field.isValid?.minLength === "number" && fieldType.validate.minLength !== void 0) {
    minLength = {
      constraint: field.isValid.minLength,
      validate: fieldType.validate.minLength
    };
  }
  let maxLength;
  if (typeof field.isValid?.maxLength === "number" && fieldType.validate.maxLength !== void 0) {
    maxLength = {
      constraint: field.isValid.maxLength,
      validate: fieldType.validate.maxLength
    };
  }
  let pattern;
  if (field.isValid?.pattern !== void 0 && fieldType.validate.pattern !== void 0) {
    pattern = {
      constraint: field.isValid?.pattern,
      validate: fieldType.validate.pattern
    };
  }
  const custom = field.isValid?.custom ?? fieldType.validate.custom;
  return {
    required,
    elements,
    min,
    max,
    minLength,
    maxLength,
    pattern,
    custom
  };
}
//# sourceMappingURL=get-is-valid.cjs.map
