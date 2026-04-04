// packages/components/src/calendar/date-calendar/index.tsx
import { DayPicker } from "react-day-picker";
import { enUS } from "react-day-picker/locale";
import { useCallback } from "@wordpress/element";
import { COMMON_PROPS } from "../utils/constants.mjs";
import { clampNumberOfMonths } from "../utils/misc.mjs";
import { useControlledValue } from "../../utils/hooks/index.mjs";
import { useLocalizationProps } from "../utils/use-localization-props.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
var DateCalendar = ({
  defaultSelected,
  selected: selectedProp,
  onSelect,
  numberOfMonths = 1,
  locale = enUS,
  timeZone,
  ...props
}) => {
  const localizationProps = useLocalizationProps({
    locale,
    timeZone,
    mode: "single"
  });
  const onChange = useCallback((selected2, triggerDate, modifiers, e) => {
    onSelect?.(selected2 ?? void 0, triggerDate, modifiers, e);
  }, [onSelect]);
  const [selected, setSelected] = useControlledValue({
    defaultValue: defaultSelected,
    value: selectedProp,
    onChange
  });
  return /* @__PURE__ */ _jsx(DayPicker, {
    ...COMMON_PROPS,
    ...localizationProps,
    ...props,
    mode: "single",
    numberOfMonths: clampNumberOfMonths(numberOfMonths),
    selected: selected ?? void 0,
    onSelect: setSelected
  });
};
export {
  DateCalendar
};
//# sourceMappingURL=index.mjs.map
