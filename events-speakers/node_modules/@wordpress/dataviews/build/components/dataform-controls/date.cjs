"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/dataviews/src/components/dataform-controls/date.tsx
var date_exports = {};
__export(date_exports, {
  default: () => DateControl
});
module.exports = __toCommonJS(date_exports);
var import_clsx = __toESM(require("clsx"));
var import_date_fns = require("date-fns");
var import_components = require("@wordpress/components");
var import_element = require("@wordpress/element");
var import_i18n = require("@wordpress/i18n");
var import_date = require("@wordpress/date");
var import_icons = require("@wordpress/icons");
var import_ui = require("@wordpress/ui");
var import_relative_date_control = __toESM(require("./utils/relative-date-control.cjs"));
var import_constants = require("../../constants.cjs");
var import_lock_unlock = require("../../lock-unlock.cjs");
var import_get_custom_validity = __toESM(require("./utils/get-custom-validity.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
var { DateCalendar, DateRangeCalendar } = (0, import_lock_unlock.unlock)(import_components.privateApis);
var DATE_PRESETS = [
  {
    id: "today",
    label: (0, import_i18n.__)("Today"),
    getValue: () => (0, import_date.getDate)(null)
  },
  {
    id: "yesterday",
    label: (0, import_i18n.__)("Yesterday"),
    getValue: () => {
      const today = (0, import_date.getDate)(null);
      return (0, import_date_fns.subDays)(today, 1);
    }
  },
  {
    id: "past-week",
    label: (0, import_i18n.__)("Past week"),
    getValue: () => {
      const today = (0, import_date.getDate)(null);
      return (0, import_date_fns.subDays)(today, 7);
    }
  },
  {
    id: "past-month",
    label: (0, import_i18n.__)("Past month"),
    getValue: () => {
      const today = (0, import_date.getDate)(null);
      return (0, import_date_fns.subMonths)(today, 1);
    }
  }
];
var DATE_RANGE_PRESETS = [
  {
    id: "last-7-days",
    label: (0, import_i18n.__)("Last 7 days"),
    getValue: () => {
      const today = (0, import_date.getDate)(null);
      return [(0, import_date_fns.subDays)(today, 7), today];
    }
  },
  {
    id: "last-30-days",
    label: (0, import_i18n.__)("Last 30 days"),
    getValue: () => {
      const today = (0, import_date.getDate)(null);
      return [(0, import_date_fns.subDays)(today, 30), today];
    }
  },
  {
    id: "month-to-date",
    label: (0, import_i18n.__)("Month to date"),
    getValue: () => {
      const today = (0, import_date.getDate)(null);
      return [(0, import_date_fns.startOfMonth)(today), today];
    }
  },
  {
    id: "last-year",
    label: (0, import_i18n.__)("Last year"),
    getValue: () => {
      const today = (0, import_date.getDate)(null);
      return [(0, import_date_fns.subYears)(today, 1), today];
    }
  },
  {
    id: "year-to-date",
    label: (0, import_i18n.__)("Year to date"),
    getValue: () => {
      const today = (0, import_date.getDate)(null);
      return [(0, import_date_fns.startOfYear)(today), today];
    }
  }
];
var parseDate = (dateString) => {
  if (!dateString) {
    return null;
  }
  const parsed = (0, import_date.getDate)(dateString);
  return parsed && (0, import_date_fns.isValid)(parsed) ? parsed : null;
};
var formatDate = (date) => {
  if (!date) {
    return "";
  }
  return typeof date === "string" ? date : (0, import_date_fns.format)(date, "yyyy-MM-dd");
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
  const [customValidity, setCustomValidity] = (0, import_element.useState)(void 0);
  const validateRefs = (0, import_element.useCallback)(() => {
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
  (0, import_element.useEffect)(() => {
    const refs = Array.isArray(inputRefs) ? inputRefs : [inputRefs];
    const result = validity ? (0, import_get_custom_validity.default)(isValid, validity) : void 0;
    for (const ref of refs) {
      const input = ref.current;
      if (input) {
        input.setCustomValidity(
          result?.type === "invalid" && result.message ? result.message : ""
        );
      }
    }
  }, [inputRefs, isValid, validity]);
  (0, import_element.useEffect)(() => {
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
  (0, import_element.useEffect)(() => {
    if (!isTouched) {
      return;
    }
    const result = validity ? (0, import_get_custom_validity.default)(isValid, validity) : void 0;
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { onBlur, children: [
    children,
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "aria-live": "polite", children: customValidity && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "p",
      {
        className: (0, import_clsx.default)(
          "components-validated-control__indicator",
          customValidity.type === "invalid" ? "is-invalid" : void 0
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_components.Icon,
            {
              className: "components-validated-control__indicator-icon",
              icon: import_icons.error,
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
  const [selectedPresetId, setSelectedPresetId] = (0, import_element.useState)(
    null
  );
  const weekStartsOn = fieldFormat.weekStartsOn ?? (0, import_date.getSettings)().l10n.startOfWeek;
  const fieldValue = getValue({ item: data });
  const value = typeof fieldValue === "string" ? fieldValue : void 0;
  const [calendarMonth, setCalendarMonth] = (0, import_element.useState)(() => {
    const parsedDate = parseDate(value);
    return parsedDate || /* @__PURE__ */ new Date();
  });
  const [isTouched, setIsTouched] = (0, import_element.useState)(false);
  const validityTargetRef = (0, import_element.useRef)(null);
  const onChangeCallback = (0, import_element.useCallback)(
    (newValue) => onChange(setValue({ item: data, value: newValue })),
    [data, onChange, setValue]
  );
  const onSelectDate = (0, import_element.useCallback)(
    (newDate) => {
      const dateValue = newDate ? (0, import_date_fns.format)(newDate, "yyyy-MM-dd") : void 0;
      onChangeCallback(dateValue);
      setSelectedPresetId(null);
      setIsTouched(true);
    },
    [onChangeCallback]
  );
  const handlePresetClick = (0, import_element.useCallback)(
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
  const handleManualDateChange = (0, import_element.useCallback)(
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
  } = (0, import_date.getSettings)();
  let displayLabel = label;
  if (isValid?.required && !markWhenOptional) {
    displayLabel = `${label} (${(0, import_i18n.__)("Required")})`;
  } else if (!isValid?.required && markWhenOptional) {
    displayLabel = `${label} (${(0, import_i18n.__)("Optional")})`;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ValidatedDateControl,
    {
      field,
      validity,
      inputRefs: validityTargetRef,
      isTouched,
      setIsTouched,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_components.BaseControl,
        {
          id,
          className: "dataviews-controls__date",
          label: displayLabel,
          help: description,
          hideLabelFromVision,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Stack, { direction: "column", gap: "lg", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              import_ui.Stack,
              {
                direction: "row",
                gap: "sm",
                wrap: "wrap",
                justify: "flex-start",
                children: [
                  DATE_PRESETS.map((preset) => {
                    const isSelected = selectedPresetId === preset.id;
                    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      import_components.Button,
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
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    import_components.Button,
                    {
                      className: "dataviews-controls__date-preset",
                      variant: "tertiary",
                      isPressed: !selectedPresetId,
                      size: "small",
                      disabled: !!selectedPresetId,
                      accessibleWhenDisabled: false,
                      children: (0, import_i18n.__)("Custom")
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_components.__experimentalInputControl,
              {
                __next40pxDefaultSize: true,
                ref: validityTargetRef,
                type: "date",
                label: (0, import_i18n.__)("Date"),
                hideLabelFromVision: true,
                value,
                onChange: handleManualDateChange,
                required: !!field.isValid?.required
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  const weekStartsOn = fieldFormat.weekStartsOn ?? (0, import_date.getSettings)().l10n.startOfWeek;
  const onChangeCallback = (0, import_element.useCallback)(
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
  const [selectedPresetId, setSelectedPresetId] = (0, import_element.useState)(
    null
  );
  const selectedRange = (0, import_element.useMemo)(() => {
    if (!value) {
      return { from: void 0, to: void 0 };
    }
    const [from, to] = value;
    return {
      from: parseDate(from) || void 0,
      to: parseDate(to) || void 0
    };
  }, [value]);
  const [calendarMonth, setCalendarMonth] = (0, import_element.useState)(() => {
    return selectedRange.from || /* @__PURE__ */ new Date();
  });
  const [isTouched, setIsTouched] = (0, import_element.useState)(false);
  const fromInputRef = (0, import_element.useRef)(null);
  const toInputRef = (0, import_element.useRef)(null);
  const updateDateRange = (0, import_element.useCallback)(
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
  const onSelectCalendarRange = (0, import_element.useCallback)(
    (newRange) => {
      updateDateRange(newRange?.from, newRange?.to);
      setSelectedPresetId(null);
      setIsTouched(true);
    },
    [updateDateRange]
  );
  const handlePresetClick = (0, import_element.useCallback)(
    (preset) => {
      const [startDate, endDate] = preset.getValue();
      setCalendarMonth(startDate);
      updateDateRange(startDate, endDate);
      setSelectedPresetId(preset.id);
      setIsTouched(true);
    },
    [updateDateRange]
  );
  const handleManualDateChange = (0, import_element.useCallback)(
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
  const { timezone } = (0, import_date.getSettings)();
  let displayLabel = label;
  if (field.isValid?.required && !markWhenOptional) {
    displayLabel = `${label} (${(0, import_i18n.__)("Required")})`;
  } else if (!field.isValid?.required && markWhenOptional) {
    displayLabel = `${label} (${(0, import_i18n.__)("Optional")})`;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ValidatedDateControl,
    {
      field,
      validity,
      inputRefs: [fromInputRef, toInputRef],
      isTouched,
      setIsTouched,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_components.BaseControl,
        {
          id,
          className: "dataviews-controls__date",
          label: displayLabel,
          help: description,
          hideLabelFromVision,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Stack, { direction: "column", gap: "lg", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              import_ui.Stack,
              {
                direction: "row",
                gap: "sm",
                wrap: "wrap",
                justify: "flex-start",
                children: [
                  DATE_RANGE_PRESETS.map((preset) => {
                    const isSelected = selectedPresetId === preset.id;
                    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      import_components.Button,
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
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    import_components.Button,
                    {
                      className: "dataviews-controls__date-preset",
                      variant: "tertiary",
                      isPressed: !selectedPresetId,
                      size: "small",
                      accessibleWhenDisabled: false,
                      disabled: !!selectedPresetId,
                      children: (0, import_i18n.__)("Custom")
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              import_ui.Stack,
              {
                direction: "row",
                gap: "sm",
                justify: "space-between",
                className: "dataviews-controls__date-range-inputs",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    import_components.__experimentalInputControl,
                    {
                      __next40pxDefaultSize: true,
                      ref: fromInputRef,
                      type: "date",
                      label: (0, import_i18n.__)("From"),
                      hideLabelFromVision: true,
                      value: value?.[0],
                      onChange: (newValue) => handleManualDateChange("from", newValue),
                      required: !!field.isValid?.required
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    import_components.__experimentalInputControl,
                    {
                      __next40pxDefaultSize: true,
                      ref: toInputRef,
                      type: "date",
                      label: (0, import_i18n.__)("To"),
                      hideLabelFromVision: true,
                      value: value?.[1],
                      onChange: (newValue) => handleManualDateChange("to", newValue),
                      required: !!field.isValid?.required
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  if (operator === import_constants.OPERATOR_IN_THE_PAST || operator === import_constants.OPERATOR_OVER) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_relative_date_control.default,
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
  if (operator === import_constants.OPERATOR_BETWEEN) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
//# sourceMappingURL=date.cjs.map
