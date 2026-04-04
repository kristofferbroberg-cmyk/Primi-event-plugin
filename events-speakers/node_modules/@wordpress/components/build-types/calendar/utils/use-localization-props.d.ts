/**
 * Internal dependencies
 */
import type { Modifiers, BaseProps } from '../types';
/**
 * Returns localization props for the calendar components.
 *
 * Notes:
 * - the following props should be intended as defaults, and should
 *   be overridden by consumer props if listed as public props.
 * - It is possible for the translated strings to use a different locale
 *   than the formatted dates and the computed `dir`. This is because the
 *   translation function doesn't expose the locale used for the translated
 *   strings, meaning that the dates are formatted using the `locale` prop.
 *   For a correct localized experience, consumers should make sure that
 *   translation context and `locale` prop are consistent.
 * @param props
 * @param props.locale
 * @param props.timeZone
 * @param props.mode
 */
export declare const useLocalizationProps: ({ locale, timeZone, mode, }: {
    locale: NonNullable<BaseProps["locale"]>;
    timeZone: BaseProps["timeZone"];
    mode: "single" | "range";
}) => {
    readonly 'aria-label': import("@wordpress/i18n").TranslatableText<"Date calendar"> | import("@wordpress/i18n").TranslatableText<"Date range calendar">;
    readonly labels: {
        /**
         * The label for the month grid.
         * @param date
         */
        readonly labelGrid: (date: Date) => string;
        /**
         * The label for the gridcell, when the calendar is not interactive.
         * @param date
         * @param modifiers
         */
        readonly labelGridcell: (date: Date, modifiers?: Modifiers) => string;
        /** The label for the "next month" button. */
        readonly labelNext: () => import("@wordpress/i18n").TranslatableText<"Go to the Next Month">;
        /** The label for the "previous month" button. */
        readonly labelPrevious: () => import("@wordpress/i18n").TranslatableText<"Go to the Previous Month">;
        /**
         * The label for the day button.
         * @param date
         * @param modifiers
         */
        readonly labelDayButton: (date: Date, modifiers?: Modifiers) => string;
        /**
         * The label for the weekday.
         * @param date
         */
        readonly labelWeekday: (date: Date) => string;
    };
    readonly locale: import("date-fns").Locale;
    readonly dir: "ltr" | "rtl";
    readonly formatters: {
        readonly formatWeekdayName: (date: Date) => string;
        readonly formatCaption: (date: Date) => string;
    };
    readonly timeZone: string | undefined;
};
//# sourceMappingURL=use-localization-props.d.ts.map