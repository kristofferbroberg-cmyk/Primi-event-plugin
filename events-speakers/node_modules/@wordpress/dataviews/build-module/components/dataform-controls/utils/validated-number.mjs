// packages/dataviews/src/components/dataform-controls/utils/validated-number.tsx
import {
  Flex,
  BaseControl,
  __experimentalNumberControl as NumberControl,
  privateApis
} from "@wordpress/components";
import { useCallback } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { OPERATOR_BETWEEN } from "../../../constants.mjs";
import { unlock } from "../../../lock-unlock.mjs";
import getCustomValidity from "./get-custom-validity.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
var { ValidatedNumberControl } = unlock(privateApis);
function toNumberOrEmpty(value) {
  if (value === "" || value === void 0) {
    return "";
  }
  const number = Number(value);
  return Number.isFinite(number) ? number : "";
}
function BetweenControls({
  value,
  onChange,
  hideLabelFromVision,
  step
}) {
  const [min = "", max = ""] = value;
  const onChangeMin = useCallback(
    (newValue) => onChange([toNumberOrEmpty(newValue), max]),
    [onChange, max]
  );
  const onChangeMax = useCallback(
    (newValue) => onChange([min, toNumberOrEmpty(newValue)]),
    [onChange, min]
  );
  return /* @__PURE__ */ jsx(
    BaseControl,
    {
      help: __("The max. value must be greater than the min. value."),
      children: /* @__PURE__ */ jsxs(Flex, { direction: "row", gap: 4, children: [
        /* @__PURE__ */ jsx(
          NumberControl,
          {
            label: __("Min."),
            value: min,
            max: max ? Number(max) - step : void 0,
            onChange: onChangeMin,
            __next40pxDefaultSize: true,
            hideLabelFromVision,
            step
          }
        ),
        /* @__PURE__ */ jsx(
          NumberControl,
          {
            label: __("Max."),
            value: max,
            min: min ? Number(min) + step : void 0,
            onChange: onChangeMax,
            __next40pxDefaultSize: true,
            hideLabelFromVision,
            step
          }
        )
      ] })
    }
  );
}
function ValidatedNumber({
  data,
  field,
  onChange,
  hideLabelFromVision,
  markWhenOptional,
  operator,
  validity
}) {
  const decimals = field.format?.decimals ?? 0;
  const step = Math.pow(10, Math.abs(decimals) * -1);
  const { label, description, getValue, setValue, isValid } = field;
  const value = getValue({ item: data }) ?? "";
  const onChangeControl = useCallback(
    (newValue) => {
      onChange(
        setValue({
          item: data,
          // Do not convert an empty string or undefined to a number,
          // otherwise there's a mismatch between the UI control (empty)
          // and the data relied by onChange (0).
          value: ["", void 0].includes(newValue) ? void 0 : Number(newValue)
        })
      );
    },
    [data, onChange, setValue]
  );
  const onChangeBetweenControls = useCallback(
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
  if (operator === OPERATOR_BETWEEN) {
    let valueBetween = ["", ""];
    if (Array.isArray(value) && value.length === 2 && value.every(
      (element) => typeof element === "number" || element === ""
    )) {
      valueBetween = value;
    }
    return /* @__PURE__ */ jsx(
      BetweenControls,
      {
        value: valueBetween,
        onChange: onChangeBetweenControls,
        hideLabelFromVision,
        step
      }
    );
  }
  return /* @__PURE__ */ jsx(
    ValidatedNumberControl,
    {
      required: !!isValid.required,
      markWhenOptional,
      customValidity: getCustomValidity(isValid, validity),
      label,
      help: description,
      value,
      onChange: onChangeControl,
      __next40pxDefaultSize: true,
      hideLabelFromVision,
      step,
      min: isValid.min ? isValid.min.constraint : void 0,
      max: isValid.max ? isValid.max.constraint : void 0
    }
  );
}
export {
  ValidatedNumber as default
};
//# sourceMappingURL=validated-number.mjs.map
