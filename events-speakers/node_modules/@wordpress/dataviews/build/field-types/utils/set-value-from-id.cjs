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

// packages/dataviews/src/field-types/utils/set-value-from-id.ts
var set_value_from_id_exports = {};
__export(set_value_from_id_exports, {
  default: () => set_value_from_id_default
});
module.exports = __toCommonJS(set_value_from_id_exports);
var setValueFromId = (id) => ({ value }) => {
  const path = id.split(".");
  const result = {};
  let current = result;
  for (const segment of path.slice(0, -1)) {
    current[segment] = {};
    current = current[segment];
  }
  current[path.at(-1)] = value;
  return result;
};
var set_value_from_id_default = setValueFromId;
//# sourceMappingURL=set-value-from-id.cjs.map
