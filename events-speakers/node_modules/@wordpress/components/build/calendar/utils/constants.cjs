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

// packages/components/src/calendar/utils/constants.ts
var constants_exports = {};
__export(constants_exports, {
  COMMON_PROPS: () => COMMON_PROPS,
  MODIFIER_CLASSNAMES: () => MODIFIER_CLASSNAMES
});
module.exports = __toCommonJS(constants_exports);
var import_day_cell = require("./day-cell.cjs");
var CLASSNAMES = {
  root: "components-calendar",
  day: "components-calendar__day",
  day_button: "components-calendar__day-button",
  outside: "components-calendar__day--outside",
  caption_label: "components-calendar__caption-label",
  button_next: "components-calendar__button-next",
  button_previous: "components-calendar__button-previous",
  chevron: "components-calendar__chevron",
  nav: "components-calendar__nav",
  month_caption: "components-calendar__month-caption",
  months: "components-calendar__months",
  month_grid: "components-calendar__month-grid",
  weekday: "components-calendar__weekday",
  today: "components-calendar__day--today",
  selected: "components-calendar__day--selected",
  disabled: "components-calendar__day--disabled",
  hidden: "components-calendar__day--hidden",
  range_start: "components-calendar__range-start",
  range_end: "components-calendar__range-end",
  range_middle: "components-calendar__range-middle",
  weeks_before_enter: "components-calendar__weeks-before-enter",
  weeks_before_exit: "components-calendar__weeks-before-exit",
  weeks_after_enter: "components-calendar__weeks-after-enter",
  weeks_after_exit: "components-calendar__weeks-after-exit",
  caption_after_enter: "components-calendar__caption-after-enter",
  caption_after_exit: "components-calendar__caption-after-exit",
  caption_before_enter: "components-calendar__caption-before-enter",
  caption_before_exit: "components-calendar__caption-before-exit"
};
var MODIFIER_CLASSNAMES = {
  preview: "components-calendar__day--preview",
  preview_start: "components-calendar__day--preview-start",
  preview_end: "components-calendar__day--preview-end"
};
var COMMON_PROPS = {
  animate: true,
  // Only show days in the current month
  showOutsideDays: false,
  // Hide week number column
  showWeekNumber: false,
  // Show weekdays row
  hideWeekdays: false,
  // Month and year caption are not interactive
  captionLayout: "label",
  // Show a variable number of weeks depending on the month
  fixedWeeks: false,
  // Show navigation buttons
  hideNavigation: false,
  // Class names
  classNames: CLASSNAMES,
  // Default role
  role: "application",
  components: {
    Day: import_day_cell.Day
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  COMMON_PROPS,
  MODIFIER_CLASSNAMES
});
//# sourceMappingURL=constants.cjs.map
