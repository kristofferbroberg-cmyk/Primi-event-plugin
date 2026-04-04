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

// packages/components/src/calendar/utils/use-localization-props.ts
var use_localization_props_exports = {};
__export(use_localization_props_exports, {
  useLocalizationProps: () => useLocalizationProps
});
module.exports = __toCommonJS(use_localization_props_exports);
var import_i18n = require("@wordpress/i18n");
var import_element = require("@wordpress/element");
function isLocaleRTL(localeCode) {
  const localeObj = new Intl.Locale(localeCode);
  if ("getTextInfo" in localeObj) {
    return localeObj.getTextInfo().direction === "rtl";
  }
  return [
    "ar",
    // Arabic
    "he",
    // Hebrew
    "fa",
    // Persian (Farsi)
    "ur",
    // Urdu
    "ps",
    // Pashto
    "syr",
    // Syriac
    "dv",
    // Divehi
    "ku",
    // Kurdish (Sorani)
    "yi"
    // Yiddish
  ].includes(localeObj.language);
}
var useLocalizationProps = ({
  locale,
  timeZone,
  mode
}) => {
  return (0, import_element.useMemo)(() => {
    const monthNameFormatter = new Intl.DateTimeFormat(locale.code, {
      year: "numeric",
      month: "long",
      timeZone
    });
    const weekdayNarrowFormatter = new Intl.DateTimeFormat(locale.code, {
      weekday: "narrow",
      timeZone
    });
    const weekdayLongFormatter = new Intl.DateTimeFormat(locale.code, {
      weekday: "long",
      timeZone
    });
    const fullDateFormatter = new Intl.DateTimeFormat(locale.code, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone
    });
    return {
      "aria-label": mode === "single" ? (0, import_i18n.__)("Date calendar") : (0, import_i18n.__)("Date range calendar"),
      labels: {
        /**
         * The label for the month grid.
         * @param date
         */
        labelGrid: (date) => monthNameFormatter.format(date),
        /**
         * The label for the gridcell, when the calendar is not interactive.
         * @param date
         * @param modifiers
         */
        labelGridcell: (date, modifiers) => {
          const formattedDate = fullDateFormatter.format(date);
          let label = formattedDate;
          if (modifiers?.today) {
            label = (0, import_i18n.sprintf)(
              // translators: %s is the full date (e.g. "Monday, April 29, 2025")
              (0, import_i18n.__)("Today, %s"),
              formattedDate
            );
          }
          return label;
        },
        /** The label for the "next month" button. */
        labelNext: () => (0, import_i18n.__)("Go to the Next Month"),
        /** The label for the "previous month" button. */
        labelPrevious: () => (0, import_i18n.__)("Go to the Previous Month"),
        /**
         * The label for the day button.
         * @param date
         * @param modifiers
         */
        labelDayButton: (date, modifiers) => {
          const formattedDate = fullDateFormatter.format(date);
          let label = formattedDate;
          if (modifiers?.today) {
            label = (0, import_i18n.sprintf)(
              // translators: %s is the full date (e.g. "Monday, April 29, 2025")
              (0, import_i18n.__)("Today, %s"),
              formattedDate
            );
          }
          if (modifiers?.selected) {
            label = (0, import_i18n.sprintf)(
              // translators: %s is the full date (e.g. "Monday, April 29, 2025")
              (0, import_i18n.__)("%s, selected"),
              formattedDate
            );
          }
          return label;
        },
        /**
         * The label for the weekday.
         * @param date
         */
        labelWeekday: (date) => weekdayLongFormatter.format(date)
      },
      locale,
      dir: isLocaleRTL(locale.code) ? "rtl" : "ltr",
      formatters: {
        formatWeekdayName: (date) => {
          return weekdayNarrowFormatter.format(date);
        },
        formatCaption: (date) => {
          return monthNameFormatter.format(date);
        }
      },
      timeZone
    };
  }, [locale, timeZone, mode]);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useLocalizationProps
});
//# sourceMappingURL=use-localization-props.cjs.map
