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

// packages/components/src/calendar/date-range-calendar/index.tsx
var date_range_calendar_exports = {};
__export(date_range_calendar_exports, {
  DateRangeCalendar: () => DateRangeCalendar,
  usePreviewRange: () => usePreviewRange
});
module.exports = __toCommonJS(date_range_calendar_exports);
var import_date_fns = require("date-fns");
var import_react_day_picker = require("react-day-picker");
var import_locale = require("react-day-picker/locale");
var import_element = require("@wordpress/element");
var import_constants = require("../utils/constants.cjs");
var import_misc = require("../utils/misc.cjs");
var import_hooks = require("../../utils/hooks/index.cjs");
var import_use_localization_props = require("../utils/use-localization-props.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
function usePreviewRange({
  selected,
  hoveredDate,
  excludeDisabled,
  min,
  max,
  disabled
}) {
  return (0, import_element.useMemo)(() => {
    if (!hoveredDate || !selected?.from) {
      return;
    }
    let previewHighlight;
    let potentialNewRange;
    if (hoveredDate < selected.from) {
      previewHighlight = {
        from: hoveredDate,
        to: selected.from
      };
      potentialNewRange = {
        from: hoveredDate,
        to: selected.to ?? selected.from
      };
    } else if (selected.to && hoveredDate > selected.from && hoveredDate < selected.to) {
      previewHighlight = {
        from: selected.from,
        to: hoveredDate
      };
      potentialNewRange = {
        from: selected.from,
        to: hoveredDate
      };
    } else if (hoveredDate > selected.from) {
      previewHighlight = {
        from: selected.to ?? selected.from,
        to: hoveredDate
      };
      potentialNewRange = {
        from: selected.from,
        to: hoveredDate
      };
    }
    if (min !== void 0 && min > 0 && potentialNewRange && (0, import_date_fns.differenceInCalendarDays)(potentialNewRange.to, potentialNewRange.from) < min) {
      previewHighlight = {
        from: hoveredDate,
        to: hoveredDate
      };
    }
    if (max !== void 0 && max > 0 && potentialNewRange && (0, import_date_fns.differenceInCalendarDays)(potentialNewRange.to, potentialNewRange.from) > max) {
      previewHighlight = {
        from: hoveredDate,
        to: hoveredDate
      };
    }
    if (excludeDisabled && disabled && potentialNewRange && (0, import_react_day_picker.rangeContainsModifiers)(potentialNewRange, disabled)) {
      previewHighlight = {
        from: hoveredDate,
        to: hoveredDate
      };
    }
    return previewHighlight;
  }, [selected, hoveredDate, excludeDisabled, min, max, disabled]);
}
var DateRangeCalendar = ({
  defaultSelected,
  selected: selectedProp,
  onSelect,
  numberOfMonths = 1,
  excludeDisabled,
  min,
  max,
  disabled,
  locale = import_locale.enUS,
  timeZone,
  ...props
}) => {
  const localizationProps = (0, import_use_localization_props.useLocalizationProps)({
    locale,
    timeZone,
    mode: "range"
  });
  const onChange = (0, import_element.useCallback)((selected2, triggerDate, modifiers2, e) => {
    onSelect?.(selected2 ?? void 0, triggerDate, modifiers2, e);
  }, [onSelect]);
  const [selected, setSelected] = (0, import_hooks.useControlledValue)({
    defaultValue: defaultSelected,
    value: selectedProp,
    onChange
  });
  const [hoveredDate, setHoveredDate] = (0, import_element.useState)(void 0);
  const previewRange = usePreviewRange({
    selected,
    hoveredDate,
    excludeDisabled,
    min,
    max,
    disabled
  });
  const modifiers = (0, import_element.useMemo)(() => {
    return {
      preview: previewRange,
      preview_start: previewRange?.from,
      preview_end: previewRange?.to
    };
  }, [previewRange]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_day_picker.DayPicker, {
    ...import_constants.COMMON_PROPS,
    ...localizationProps,
    ...props,
    mode: "range",
    numberOfMonths: (0, import_misc.clampNumberOfMonths)(numberOfMonths),
    disabled,
    excludeDisabled,
    min,
    max,
    selected: selected ?? void 0,
    onSelect: setSelected,
    onDayMouseEnter: (date) => setHoveredDate(date),
    onDayMouseLeave: () => setHoveredDate(void 0),
    modifiers,
    modifiersClassNames: import_constants.MODIFIER_CLASSNAMES
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DateRangeCalendar,
  usePreviewRange
});
//# sourceMappingURL=index.cjs.map
