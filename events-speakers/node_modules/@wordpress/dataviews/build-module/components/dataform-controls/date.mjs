// packages/dataviews/src/components/dataform-controls/date.tsx
import clsx from "clsx";
import {
  format,
  isValid as isValidDate,
  subMonths,
  subDays,
  subYears,
  startOfMonth,
  startOfYear
} from "date-fns";
import {
  BaseControl,
  Button,
  Icon,
  privateApis as componentsPrivateApis,
  __experimentalInputControl as InputControl
} from "@wordpress/components";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { getDate, getSettings } from "@wordpress/date";
import { error as errorIcon } from "@wordpress/icons";
import { Stack } from "@wordpress/ui";
import RelativeDateControl from "./utils/relative-date-control.mjs";
import {
  OPERATOR_IN_THE_PAST,
  OPERATOR_OVER,
  OPERATOR_BETWEEN
} from "../../constants.mjs";
import { unlock } from "../../lock-unlock.mjs";
import getCustomValidity from "./utils/get-custom-validity.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
var { DateCalendar, DateRangeCalendar } = unlock(componentsPrivateApis);
var DATE_PRESETS = [
  {
    id: "today",
    label: __("Today"),
    getValue: () => getDate(null)
  },
  {
    id: "yesterday",
    label: __("Yesterday"),
    getValue: () => {
      const today = getDate(null);
      return subDays(today, 1);
    }
  },
  {
    id: "past-week",
    label: __("Past week"),
    getValue: () => {
      const today = getDate(null);
      return subDays(today, 7);
    }
  },
  {
    id: "past-month",
    label: __("Past month"),
    getValue: () => {
      const today = getDate(null);
      return subMonths(today, 1);
    }
  }
];
var DATE_RANGE_PRESETS = [
  {
    id: "last-7-days",
    label: __("Last 7 days"),
    getValue: () => {
      const today = getDate(null);
      return [subDays(today, 7), today];
    }
  },
  {
    id: "last-30-days",
    label: __("Last 30 days"),
    getValue: () => {
      const today = getDate(null);
      return [subDays(today, 30), today];
    }
  },
  {
    id: "month-to-date",
    label: __("Month to date"),
    getValue: () => {
      const today = getDate(null);
      return [startOfMonth(today), today];
    }
  },
  {
    id: "last-year",
    label: __("Last year"),
    getValue: () => {
      const today = getDate(null);
      return [subYears(today, 1), today];
    }
  },
  {
    id: "year-to-date",
    label: __("Year to date"),
    getValue: () => {
      const today = getDate(null);
      return [startOfYear(today), today];
    }
  }
];
var parseDate = (dateString) => {
  if (!dateString) {
    return null;
  }
  const parsed = getDate(dateString);
  return parsed && isValidDate(parsed) ? parsed : null;
};
var formatDate = (date) => {
  if (!date) {
    return "";
  }
  return typeof date === "string" ? date : format(date, "yyyy-MM-dd");
};
function ValidatedDateControl({
  field,
  validity,
  inputRefs,
  isTouched,
  setIsTouched,
  children
}) {
  const { isValid } = field;
  const [customValidity, setCustomValidity] = useState(void 0);
  const validateRefs = useCallback(() => {
    const refs = Array.isArray(inputRefs) ? inputRefs : [inputRefs];
    for (const ref of refs) {
      const input = ref.current;
      if (input && !input.validity.valid) {
        setCustomValidity({
          type: "invalid",
          message: input.validationMessage
        });
        return;
      }
    }
    setCustomValidity(void 0);
  }, [inputRefs]);
  useEffect(() => {
    const refs = Array.isArray(inputRefs) ? inputRefs : [inputRefs];
    const result = validity ? getCustomValidity(isValid, validity) : void 0;
    for (const ref of refs) {
      const input = ref.current;
      if (input) {
        input.setCustomValidity(
          result?.type === "invalid" && result.message ? result.message : ""
        );
      }
    }
  }, [inputRefs, isValid, validity]);
  useEffect(() => {
    const refs = Array.isArray(inputRefs) ? inputRefs : [inputRefs];
    const handleInvalid = (event) => {
      event.preventDefault();
      setIsTouched(true);
    };
    for (const ref of refs) {
      ref.current?.addEventListener("invalid", handleInvalid);
    }
    return () => {
      for (const ref of refs) {
        ref.current?.removeEventListener("invalid", handleInvalid);
      }
    };
  }, [inputRefs, setIsTouched]);
  useEffect(() => {
    if (!isTouched) {
      return;
    }
    const result = validity ? getCustomValidity(isValid, validity) : void 0;
    if (result) {
      setCustomValidity(result);
    } else {
      validateRefs();
    }
  }, [isTouched, isValid, validity, validateRefs]);
  const onBlur = (event) => {
    if (isTouched) {
      return;
    }
    if (!event.relatedTarget || !event.currentTarget.contains(event.relatedTarget)) {
      setIsTouched(true);
    }
  };
  return /* @__PURE__ */ jsxs("div", { onBlur, children: [
    children,
    /* @__PURE__ */ jsx("div", { "aria-live": "polite", children: customValidity && /* @__PURE__ */ jsxs(
      "p",
      {
        className: clsx(
          "components-validated-control__indicator",
          customValidity.type === "invalid" ? "is-invalid" : void 0
        ),
        children: [
          /* @__PURE__ */ jsx(
            Icon,
            {
              className: "components-validated-control__indicator-icon",
              icon: errorIcon,
              size: 16,
              fill: "currentColor"
            }
          ),
          customValidity.message
        ]
      }
    ) })
  ] });
}
function CalendarDateControl({
  data,
  field,
  onChange,
  hideLabelFromVision,
  markWhenOptional,
  validity
}) {
  const {
    id,
    label,
    description,
    setValue,
    getValue,
    isValid,
    format: fieldFormat
  } = field;
  const [selectedPresetId, setSelectedPresetId] = useState(
    null
  );
  const weekStartsOn = fieldFormat.weekStartsOn ?? getSettings().l10n.startOfWeek;
  const fieldValue = getValue({ item: data });
  const value = typeof fieldValue === "string" ? fieldValue : void 0;
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const parsedDate = parseDate(value);
    return parsedDate || /* @__PURE__ */ new Date();
  });
  const [isTouched, setIsTouched] = useState(false);
  const validityTargetRef = useRef(null);
  const onChangeCallback = useCallback(
    (newValue) => onChange(setValue({ item: data, value: newValue })),
    [data, onChange, setValue]
  );
  const onSelectDate = useCallback(
    (newDate) => {
      const dateValue = newDate ? format(newDate, "yyyy-MM-dd") : void 0;
      onChangeCallback(dateValue);
      setSelectedPresetId(null);
      setIsTouched(true);
    },
    [onChangeCallback]
  );
  const handlePresetClick = useCallback(
    (preset) => {
      const presetDate = preset.getValue();
      const dateValue = formatDate(presetDate);
      setCalendarMonth(presetDate);
      onChangeCallback(dateValue);
      setSelectedPresetId(preset.id);
      setIsTouched(true);
    },
    [onChangeCallback]
  );
  const handleManualDateChange = useCallback(
    (newValue) => {
      onChangeCallback(newValue);
      if (newValue) {
        const parsedDate = parseDate(newValue);
        if (parsedDate) {
          setCalendarMonth(parsedDate);
        }
      }
      setSelectedPresetId(null);
      setIsTouched(true);
    },
    [onChangeCallback]
  );
  const {
    timezone: { string: timezoneString }
  } = getSettings();
  let displayLabel = label;
  if (isValid?.required && !markWhenOptional) {
    displayLabel = `${label} (${__("Required")})`;
  } else if (!isValid?.required && markWhenOptional) {
    displayLabel = `${label} (${__("Optional")})`;
  }
  return /* @__PURE__ */ jsx(
    ValidatedDateControl,
    {
      field,
      validity,
      inputRefs: validityTargetRef,
      isTouched,
      setIsTouched,
      children: /* @__PURE__ */ jsx(
        BaseControl,
        {
          id,
          className: "dataviews-controls__date",
          label: displayLabel,
          help: description,
          hideLabelFromVision,
          children: /* @__PURE__ */ jsxs(Stack, { direction: "column", gap: "lg", children: [
            /* @__PURE__ */ jsxs(
              Stack,
              {
                direction: "row",
                gap: "sm",
                wrap: "wrap",
                justify: "flex-start",
                children: [
                  DATE_PRESETS.map((preset) => {
                    const isSelected = selectedPresetId === preset.id;
                    return /* @__PURE__ */ jsx(
                      Button,
                      {
                        className: "dataviews-controls__date-preset",
                        variant: "tertiary",
                        isPressed: isSelected,
                        size: "small",
                        onClick: () => handlePresetClick(preset),
                        children: preset.label
                      },
                      preset.id
                    );
                  }),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      className: "dataviews-controls__date-preset",
                      variant: "tertiary",
                      isPressed: !selectedPresetId,
                      size: "small",
                      disabled: !!selectedPresetId,
                      accessibleWhenDisabled: false,
                      children: __("Custom")
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              InputControl,
              {
                __next40pxDefaultSize: true,
                ref: validityTargetRef,
                type: "date",
                label: __("Date"),
                hideLabelFromVision: true,
                value,
                onChange: handleManualDateChange,
                required: !!field.isValid?.required
              }
            ),
            /* @__PURE__ */ jsx(
              DateCalendar,
              {
                style: { width: "100%" },
                selected: value ? parseDate(value) || void 0 : void 0,
                onSelect: onSelectDate,
                month: calendarMonth,
                onMonthChange: setCalendarMonth,
                timeZone: timezoneString || void 0,
                weekStartsOn
              }
            )
          ] })
        }
      )
    }
  );
}
function CalendarDateRangeControl({
  data,
  field,
  onChange,
  hideLabelFromVision,
  markWhenOptional,
  validity
}) {
  const {
    id,
    label,
    description,
    getValue,
    setValue,
    format: fieldFormat
  } = field;
  let value;
  const fieldValue = getValue({ item: data });
  if (Array.isArray(fieldValue) && fieldValue.length === 2 && fieldValue.every((date) => typeof date === "string")) {
    value = fieldValue;
  }
  const weekStartsOn = fieldFormat.weekStartsOn ?? getSettings().l10n.startOfWeek;
  const onChangeCallback = useCallback(
    (newValue) => {
      onChange(
        setValue({
          item: data,
          value: newValue
        })
      );
    },
    [data, onChange, setValue]
  );
  const [selectedPresetId, setSelectedPresetId] = useState(
    null
  );
  const selectedRange = useMemo(() => {
    if (!value) {
      return { from: void 0, to: void 0 };
    }
    const [from, to] = value;
    return {
      from: parseDate(from) || void 0,
      to: parseDate(to) || void 0
    };
  }, [value]);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    return selectedRange.from || /* @__PURE__ */ new Date();
  });
  const [isTouched, setIsTouched] = useState(false);
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  const updateDateRange = useCallback(
    (fromDate, toDate) => {
      if (fromDate && toDate) {
        onChangeCallback([
          formatDate(fromDate),
          formatDate(toDate)
        ]);
      } else if (!fromDate && !toDate) {
        onChangeCallback(void 0);
      }
    },
    [onChangeCallback]
  );
  const onSelectCalendarRange = useCallback(
    (newRange) => {
      updateDateRange(newRange?.from, newRange?.to);
      setSelectedPresetId(null);
      setIsTouched(true);
    },
    [updateDateRange]
  );
  const handlePresetClick = useCallback(
    (preset) => {
      const [startDate, endDate] = preset.getValue();
      setCalendarMonth(startDate);
      updateDateRange(startDate, endDate);
      setSelectedPresetId(preset.id);
      setIsTouched(true);
    },
    [updateDateRange]
  );
  const handleManualDateChange = useCallback(
    (fromOrTo, newValue) => {
      const [currentFrom, currentTo] = value || [
        void 0,
        void 0
      ];
      const updatedFrom = fromOrTo === "from" ? newValue : currentFrom;
      const updatedTo = fromOrTo === "to" ? newValue : currentTo;
      updateDateRange(updatedFrom, updatedTo);
      if (newValue) {
        const parsedDate = parseDate(newValue);
        if (parsedDate) {
          setCalendarMonth(parsedDate);
        }
      }
      setSelectedPresetId(null);
      setIsTouched(true);
    },
    [value, updateDateRange]
  );
  const { timezone } = getSettings();
  let displayLabel = label;
  if (field.isValid?.required && !markWhenOptional) {
    displayLabel = `${label} (${__("Required")})`;
  } else if (!field.isValid?.required && markWhenOptional) {
    displayLabel = `${label} (${__("Optional")})`;
  }
  return /* @__PURE__ */ jsx(
    ValidatedDateControl,
    {
      field,
      validity,
      inputRefs: [fromInputRef, toInputRef],
      isTouched,
      setIsTouched,
      children: /* @__PURE__ */ jsx(
        BaseControl,
        {
          id,
          className: "dataviews-controls__date",
          label: displayLabel,
          help: description,
          hideLabelFromVision,
          children: /* @__PURE__ */ jsxs(Stack, { direction: "column", gap: "lg", children: [
            /* @__PURE__ */ jsxs(
              Stack,
              {
                direction: "row",
                gap: "sm",
                wrap: "wrap",
                justify: "flex-start",
                children: [
                  DATE_RANGE_PRESETS.map((preset) => {
                    const isSelected = selectedPresetId === preset.id;
                    return /* @__PURE__ */ jsx(
                      Button,
                      {
                        className: "dataviews-controls__date-preset",
                        variant: "tertiary",
                        isPressed: isSelected,
                        size: "small",
                        onClick: () => handlePresetClick(preset),
                        children: preset.label
                      },
                      preset.id
                    );
                  }),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      className: "dataviews-controls__date-preset",
                      variant: "tertiary",
                      isPressed: !selectedPresetId,
                      size: "small",
                      accessibleWhenDisabled: false,
                      disabled: !!selectedPresetId,
                      children: __("Custom")
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Stack,
              {
                direction: "row",
                gap: "sm",
                justify: "space-between",
                className: "dataviews-controls__date-range-inputs",
                children: [
                  /* @__PURE__ */ jsx(
                    InputControl,
                    {
                      __next40pxDefaultSize: true,
                      ref: fromInputRef,
                      type: "date",
                      label: __("From"),
                      hideLabelFromVision: true,
                      value: value?.[0],
                      onChange: (newValue) => handleManualDateChange("from", newValue),
                      required: !!field.isValid?.required
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    InputControl,
                    {
                      __next40pxDefaultSize: true,
                      ref: toInputRef,
                      type: "date",
                      label: __("To"),
                      hideLabelFromVision: true,
                      value: value?.[1],
                      onChange: (newValue) => handleManualDateChange("to", newValue),
                      required: !!field.isValid?.required
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              DateRangeCalendar,
              {
                style: { width: "100%" },
                selected: selectedRange,
                onSelect: onSelectCalendarRange,
                month: calendarMonth,
                onMonthChange: setCalendarMonth,
                timeZone: timezone.string || void 0,
                weekStartsOn
              }
            )
          ] })
        }
      )
    }
  );
}
function DateControl({
  data,
  field,
  onChange,
  hideLabelFromVision,
  markWhenOptional,
  operator,
  validity
}) {
  if (operator === OPERATOR_IN_THE_PAST || operator === OPERATOR_OVER) {
    return /* @__PURE__ */ jsx(
      RelativeDateControl,
      {
        className: "dataviews-controls__date",
        data,
        field,
        onChange,
        hideLabelFromVision,
        operator
      }
    );
  }
  if (operator === OPERATOR_BETWEEN) {
    return /* @__PURE__ */ jsx(
      CalendarDateRangeControl,
      {
        data,
        field,
        onChange,
        hideLabelFromVision,
        markWhenOptional,
        validity
      }
    );
  }
  return /* @__PURE__ */ jsx(
    CalendarDateControl,
    {
      data,
      field,
      onChange,
      hideLabelFromVision,
      markWhenOptional,
      validity
    }
  );
}
export {
  DateControl as default
};
//# sourceMappingURL=date.mjs.map
