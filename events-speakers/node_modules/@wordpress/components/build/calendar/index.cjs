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

// packages/components/src/calendar/index.tsx
var calendar_exports = {};
__export(calendar_exports, {
  DateCalendar: () => import_date_calendar.DateCalendar,
  DateRangeCalendar: () => import_date_range_calendar.DateRangeCalendar,
  TZDate: () => import_react_day_picker.TZDate
});
module.exports = __toCommonJS(calendar_exports);
var import_react_day_picker = require("react-day-picker");
var import_date_calendar = require("./date-calendar/index.cjs");
var import_date_range_calendar = require("./date-range-calendar/index.cjs");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DateCalendar,
  DateRangeCalendar,
  TZDate
});
//# sourceMappingURL=index.cjs.map
