// packages/dataviews/src/components/dataform-controls/utils/relative-date-control.tsx
import clsx from "clsx";
import {
  BaseControl,
  SelectControl,
  __experimentalNumberControl as NumberControl
} from "@wordpress/components";
import { useCallback } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Stack } from "@wordpress/ui";
import { OPERATOR_IN_THE_PAST, OPERATOR_OVER } from "../../../constants.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
var TIME_UNITS_OPTIONS = {
  [OPERATOR_IN_THE_PAST]: [
    { value: "days", label: __("Days") },
    { value: "weeks", label: __("Weeks") },
    { value: "months", label: __("Months") },
    { value: "years", label: __("Years") }
  ],
  [OPERATOR_OVER]: [
    { value: "days", label: __("Days ago") },
    { value: "weeks", label: __("Weeks ago") },
    { value: "months", label: __("Months ago") },
    { value: "years", label: __("Years ago") }
  ]
};
function RelativeDateControl({
  className,
  data,
  field,
  onChange,
  hideLabelFromVision,
  operator
}) {
  const options = TIME_UNITS_OPTIONS[operator === OPERATOR_IN_THE_PAST ? "inThePast" : "over"];
  const { id, label, description, getValue, setValue } = field;
  const fieldValue = getValue({ item: data });
  const { value: relValue = "", unit = options[0].value } = fieldValue && typeof fieldValue === "object" ? fieldValue : {};
  const onChangeValue = useCallback(
    (newValue) => onChange(
      setValue({
        item: data,
        value: { value: Number(newValue), unit }
      })
    ),
    [onChange, setValue, data, unit]
  );
  const onChangeUnit = useCallback(
    (newUnit) => onChange(
      setValue({
        item: data,
        value: { value: relValue, unit: newUnit }
      })
    ),
    [onChange, setValue, data, relValue]
  );
  return /* @__PURE__ */ jsx(
    BaseControl,
    {
      id,
      className: clsx(className, "dataviews-controls__relative-date"),
      label,
      hideLabelFromVision,
      help: description,
      children: /* @__PURE__ */ jsxs(Stack, { direction: "row", gap: "sm", children: [
        /* @__PURE__ */ jsx(
          NumberControl,
          {
            __next40pxDefaultSize: true,
            className: "dataviews-controls__relative-date-number",
            spinControls: "none",
            min: 1,
            step: 1,
            value: relValue,
            onChange: onChangeValue
          }
        ),
        /* @__PURE__ */ jsx(
          SelectControl,
          {
            className: "dataviews-controls__relative-date-unit",
            __next40pxDefaultSize: true,
            label: __("Unit"),
            value: unit,
            options,
            onChange: onChangeUnit,
            hideLabelFromVision: true
          }
        )
      ] })
    }
  );
}
export {
  RelativeDateControl as default
};
//# sourceMappingURL=relative-date-control.mjs.map
