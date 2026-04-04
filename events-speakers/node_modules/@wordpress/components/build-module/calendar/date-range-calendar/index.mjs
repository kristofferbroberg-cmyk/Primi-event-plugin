// packages/components/src/calendar/date-range-calendar/index.tsx
import { differenceInCalendarDays } from "date-fns";
import { DayPicker, rangeContainsModifiers } from "react-day-picker";
import { enUS } from "react-day-picker/locale";
import { useMemo, useState, useCallback } from "@wordpress/element";
import { COMMON_PROPS, MODIFIER_CLASSNAMES } from "../utils/constants.mjs";
import { clampNumberOfMonths } from "../utils/misc.mjs";
import { useControlledValue } from "../../utils/hooks/index.mjs";
import { useLocalizationProps } from "../utils/use-localization-props.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
function usePreviewRange({
  selected,
  hoveredDate,
  excludeDisabled,
  min,
  max,
  disabled
}) {
  return useMemo(() => {
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
    if (min !== void 0 && min > 0 && potentialNewRange && differenceInCalendarDays(potentialNewRange.to, potentialNewRange.from) < min) {
      previewHighlight = {
        from: hoveredDate,
        to: hoveredDate
      };
    }
    if (max !== void 0 && max > 0 && potentialNewRange && differenceInCalendarDays(potentialNewRange.to, potentialNewRange.from) > max) {
      previewHighlight = {
        from: hoveredDate,
        to: hoveredDate
      };
    }
    if (excludeDisabled && disabled && potentialNewRange && rangeContainsModifiers(potentialNewRange, disabled)) {
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
  locale = enUS,
  timeZone,
  ...props
}) => {
  const localizationProps = useLocalizationProps({
    locale,
    timeZone,
    mode: "range"
  });
  const onChange = useCallback((selected2, triggerDate, modifiers2, e) => {
    onSelect?.(selected2 ?? void 0, triggerDate, modifiers2, e);
  }, [onSelect]);
  const [selected, setSelected] = useControlledValue({
    defaultValue: defaultSelected,
    value: selectedProp,
    onChange
  });
  const [hoveredDate, setHoveredDate] = useState(void 0);
  const previewRange = usePreviewRange({
    selected,
    hoveredDate,
    excludeDisabled,
    min,
    max,
    disabled
  });
  const modifiers = useMemo(() => {
    return {
      preview: previewRange,
      preview_start: previewRange?.from,
      preview_end: previewRange?.to
    };
  }, [previewRange]);
  return /* @__PURE__ */ _jsx(DayPicker, {
    ...COMMON_PROPS,
    ...localizationProps,
    ...props,
    mode: "range",
    numberOfMonths: clampNumberOfMonths(numberOfMonths),
    disabled,
    excludeDisabled,
    min,
    max,
    selected: selected ?? void 0,
    onSelect: setSelected,
    onDayMouseEnter: (date) => setHoveredDate(date),
    onDayMouseLeave: () => setHoveredDate(void 0),
    modifiers,
    modifiersClassNames: MODIFIER_CLASSNAMES
  });
};
export {
  DateRangeCalendar,
  usePreviewRange
};
//# sourceMappingURL=index.mjs.map
