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

// packages/dataviews/src/field-types/media.tsx
var media_exports = {};
__export(media_exports, {
  default: () => media_default
});
module.exports = __toCommonJS(media_exports);
var import_get_value_formatted_default = __toESM(require("./utils/get-value-formatted-default.cjs"));
var media_default = {
  type: "media",
  render: () => null,
  Edit: null,
  sort: () => 0,
  enableSorting: false,
  enableGlobalSearch: false,
  defaultOperators: [],
  validOperators: [],
  format: {},
  getValueFormatted: import_get_value_formatted_default.default,
  // cannot validate any constraint, so
  // the only available validation for the field author
  // would be providing a custom validator.
  validate: {}
};
//# sourceMappingURL=media.cjs.map
