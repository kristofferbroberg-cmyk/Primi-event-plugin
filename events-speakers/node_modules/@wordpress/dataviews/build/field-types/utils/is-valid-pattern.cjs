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

// packages/dataviews/src/field-types/utils/is-valid-pattern.ts
var is_valid_pattern_exports = {};
__export(is_valid_pattern_exports, {
  default: () => isValidPattern
});
module.exports = __toCommonJS(is_valid_pattern_exports);
function isValidPattern(item, field) {
  if (field.isValid.pattern?.constraint === void 0) {
    return true;
  }
  try {
    const regexp = new RegExp(field.isValid.pattern.constraint);
    const value = field.getValue({ item });
    if ([void 0, "", null].includes(value)) {
      return true;
    }
    return regexp.test(String(value));
  } catch {
    return false;
  }
}
//# sourceMappingURL=is-valid-pattern.cjs.map
