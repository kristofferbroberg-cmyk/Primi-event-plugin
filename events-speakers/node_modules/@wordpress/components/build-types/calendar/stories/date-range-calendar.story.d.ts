import type { Meta, StoryObj } from '@storybook/react-vite';
/**
 * Internal dependencies
 */
import { DateRangeCalendar } from '..';
declare const meta: Meta<typeof DateRangeCalendar>;
export default meta;
type Story = StoryObj<typeof DateRangeCalendar>;
export declare const Default: Story;
export declare const DisabledDates: Story;
export declare const WithSelectedRangeAndMonth: Story;
/**
 * Shows days from adjacent months in the grid. Outside days use a lighter style
 * and are still interactive. Use `fixedWeeks` to keep the grid height constant.
 */
export declare const WithOutsideDays: Story;
/**
 * When working with time zones, use the `TZDate` object exported by this package instead of the native `Date` object.
 */
export declare const WithTimeZone: Story;
//# sourceMappingURL=date-range-calendar.story.d.ts.map