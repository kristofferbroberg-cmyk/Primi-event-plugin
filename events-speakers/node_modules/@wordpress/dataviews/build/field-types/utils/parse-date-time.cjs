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

// packages/dataviews/src/field-types/utils/parse-date-time.ts
var parse_date_time_exports = {};
__export(parse_date_time_exports, {
  default: () => parseDateTime
});
module.exports = __toCommonJS(parse_date_time_exports);
var import_date_fns = require("date-fns");
var import_date = require("@wordpress/date");
function parseDateTime(dateTimeString) {
  if (!dateTimeString) {
    return null;
  }
  const parsed = (0, import_date.getDate)(dateTimeString);
  return parsed && (0, import_date_fns.isValid)(parsed) ? parsed : null;
}
//# sourceMappingURL=parse-date-time.cjs.map
