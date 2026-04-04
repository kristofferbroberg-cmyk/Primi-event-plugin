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

// packages/components/src/calendar/date-calendar/index.tsx
var date_calendar_exports = {};
__export(date_calendar_exports, {
  DateCalendar: () => DateCalendar
});
module.exports = __toCommonJS(date_calendar_exports);
var import_react_day_picker = require("react-day-picker");
var import_locale = require("react-day-picker/locale");
var import_element = require("@wordpress/element");
var import_constants = require("../utils/constants.cjs");
var import_misc = require("../utils/misc.cjs");
var import_hooks = require("../../utils/hooks/index.cjs");
var import_use_localization_props = require("../utils/use-localization-props.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
var DateCalendar = ({
  defaultSelected,
  selected: selectedProp,
  onSelect,
  numberOfMonths = 1,
  locale = import_locale.enUS,
  timeZone,
  ...props
}) => {
  const localizationProps = (0, import_use_localization_props.useLocalizationProps)({
    locale,
    timeZone,
    mode: "single"
  });
  const onChange = (0, import_element.useCallback)((selected2, triggerDate, modifiers, e) => {
    onSelect?.(selected2 ?? void 0, triggerDate, modifiers, e);
  }, [onSelect]);
  const [selected, setSelected] = (0, import_hooks.useControlledValue)({
    defaultValue: defaultSelected,
    value: selectedProp,
    onChange
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_day_picker.DayPicker, {
    ...import_constants.COMMON_PROPS,
    ...localizationProps,
    ...props,
    mode: "single",
    numberOfMonths: (0, import_misc.clampNumberOfMonths)(numberOfMonths),
    selected: selected ?? void 0,
    onSelect: setSelected
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DateCalendar
});
//# sourceMappingURL=index.cjs.map
