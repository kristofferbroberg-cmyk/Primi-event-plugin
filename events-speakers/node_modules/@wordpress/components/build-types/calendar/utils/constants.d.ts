/**
 * Internal dependencies
 */
import { Day } from './day-cell';
export declare const MODIFIER_CLASSNAMES: {
    preview: string;
    preview_start: string;
    preview_end: string;
};
export declare const COMMON_PROPS: {
    readonly animate: true;
    readonly showOutsideDays: false;
    readonly showWeekNumber: false;
    readonly hideWeekdays: false;
    readonly captionLayout: "label";
    readonly fixedWeeks: false;
    readonly hideNavigation: false;
    readonly classNames: {
        root: string;
        day: string;
        day_button: string;
        outside: string;
        caption_label: string;
        button_next: string;
        button_previous: string;
        chevron: string;
        nav: string;
        month_caption: string;
        months: string;
        month_grid: string;
        weekday: string;
        today: string;
        selected: string;
        disabled: string;
        hidden: string;
        range_start: string;
        range_end: string;
        range_middle: string;
        weeks_before_enter: string;
        weeks_before_exit: string;
        weeks_after_enter: string;
        weeks_after_exit: string;
        caption_after_enter: string;
        caption_after_exit: string;
        caption_before_enter: string;
        caption_before_exit: string;
    };
    readonly role: "application";
    readonly components: {
        readonly Day: typeof Day;
    };
};
//# sourceMappingURL=constants.d.ts.map