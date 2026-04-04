/**
 * External dependencies
 */
import type { CalendarDay } from 'react-day-picker';
/**
 * Internal dependencies
 */
import type { Modifiers } from '../types';
/**
 * Render a grid cell for a specific day in the calendar.
 *
 * Handles interaction and focus for the day.
 * @see https://daypicker.dev/guides/custom-components
 */
export declare function Day(props: {
    /** The day to render. */
    day: CalendarDay;
    /** The modifiers to apply to the day. */
    modifiers: Modifiers;
} & React.HTMLAttributes<HTMLDivElement>): import("react").JSX.Element;
//# sourceMappingURL=day-cell.d.ts.map