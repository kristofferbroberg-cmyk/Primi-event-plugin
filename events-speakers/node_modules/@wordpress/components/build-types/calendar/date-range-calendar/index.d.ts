import type { DateRangeCalendarProps, DateRange } from '../types';
export declare function usePreviewRange({ selected, hoveredDate, excludeDisabled, min, max, disabled, }: Pick<DateRangeCalendarProps, 'selected' | 'excludeDisabled' | 'min' | 'max' | 'disabled'> & {
    hoveredDate: Date | undefined;
}): DateRange | undefined;
/**
 * `DateRangeCalendar` is a React component that provides a customizable calendar
 * interface for **date range** selection.
 *
 * The component is built with accessibility in mind and follows ARIA best
 * practices for calendar widgets. It provides keyboard navigation, screen reader
 * support, and customizable labels for internationalization.
 */
export declare const DateRangeCalendar: ({ defaultSelected, selected: selectedProp, onSelect, numberOfMonths, excludeDisabled, min, max, disabled, locale, timeZone, ...props }: DateRangeCalendarProps) => import("react").JSX.Element;
//# sourceMappingURL=index.d.ts.map