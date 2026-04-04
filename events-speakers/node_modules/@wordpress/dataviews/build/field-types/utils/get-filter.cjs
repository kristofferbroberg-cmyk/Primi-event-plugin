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

// packages/dataviews/src/field-types/utils/get-filter.ts
var get_filter_exports = {};
__export(get_filter_exports, {
  default: () => getFilter
});
module.exports = __toCommonJS(get_filter_exports);
var import_operators = require("../../utils/operators.cjs");
function getFilter(fieldType) {
  return fieldType.validOperators.reduce((accumulator, operator) => {
    const operatorObj = (0, import_operators.getOperatorByName)(operator);
    if (operatorObj?.filter) {
      accumulator[operator] = operatorObj.filter;
    }
    return accumulator;
  }, {});
}
//# sourceMappingURL=get-filter.cjs.map
