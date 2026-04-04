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

// packages/dataviews/src/field-types/utils/is-valid-required-for-array.ts
var is_valid_required_for_array_exports = {};
__export(is_valid_required_for_array_exports, {
  default: () => isValidRequiredForArray
});
module.exports = __toCommonJS(is_valid_required_for_array_exports);
function isValidRequiredForArray(item, field) {
  const value = field.getValue({ item });
  return Array.isArray(value) && value.length > 0 && value.every(
    (element) => ![void 0, "", null].includes(element)
  );
}
//# sourceMappingURL=is-valid-required-for-array.cjs.map
