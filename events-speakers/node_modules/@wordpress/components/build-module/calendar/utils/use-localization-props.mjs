// packages/components/src/calendar/utils/use-localization-props.ts
import { __, sprintf } from "@wordpress/i18n";
import { useMemo } from "@wordpress/element";
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
  return useMemo(() => {
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
      "aria-label": mode === "single" ? __("Date calendar") : __("Date range calendar"),
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
            label = sprintf(
              // translators: %s is the full date (e.g. "Monday, April 29, 2025")
              __("Today, %s"),
              formattedDate
            );
          }
          return label;
        },
        /** The label for the "next month" button. */
        labelNext: () => __("Go to the Next Month"),
        /** The label for the "previous month" button. */
        labelPrevious: () => __("Go to the Previous Month"),
        /**
         * The label for the day button.
         * @param date
         * @param modifiers
         */
        labelDayButton: (date, modifiers) => {
          const formattedDate = fullDateFormatter.format(date);
          let label = formattedDate;
          if (modifiers?.today) {
            label = sprintf(
              // translators: %s is the full date (e.g. "Monday, April 29, 2025")
              __("Today, %s"),
              formattedDate
            );
          }
          if (modifiers?.selected) {
            label = sprintf(
              // translators: %s is the full date (e.g. "Monday, April 29, 2025")
              __("%s, selected"),
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
export {
  useLocalizationProps
};
//# sourceMappingURL=use-localization-props.mjs.map
