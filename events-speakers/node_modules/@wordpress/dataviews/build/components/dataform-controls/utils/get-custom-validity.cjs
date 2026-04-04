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

// packages/dataviews/src/components/dataform-controls/utils/get-custom-validity.ts
var get_custom_validity_exports = {};
__export(get_custom_validity_exports, {
  default: () => getCustomValidity
});
module.exports = __toCommonJS(get_custom_validity_exports);
function getCustomValidity(isValid, validity) {
  let customValidity;
  if (isValid?.required && validity?.required) {
    customValidity = validity?.required?.message ? validity.required : void 0;
  } else if (isValid?.pattern && validity?.pattern) {
    customValidity = validity.pattern;
  } else if (isValid?.min && validity?.min) {
    customValidity = validity.min;
  } else if (isValid?.max && validity?.max) {
    customValidity = validity.max;
  } else if (isValid?.minLength && validity?.minLength) {
    customValidity = validity.minLength;
  } else if (isValid?.maxLength && validity?.maxLength) {
    customValidity = validity.maxLength;
  } else if (isValid?.elements && validity?.elements) {
    customValidity = validity.elements;
  } else if (validity?.custom) {
    customValidity = validity.custom;
  }
  return customValidity;
}
//# sourceMappingURL=get-custom-validity.cjs.map
