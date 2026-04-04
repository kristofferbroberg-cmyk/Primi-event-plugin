// packages/dataviews/src/components/dataform-controls/utils/validated-input.tsx
import { privateApis } from "@wordpress/components";
import { useCallback } from "@wordpress/element";
import { unlock } from "../../../lock-unlock.mjs";
import getCustomValidity from "./get-custom-validity.mjs";
import { jsx } from "react/jsx-runtime";
var { ValidatedInputControl } = unlock(privateApis);
function ValidatedText({
  data,
  field,
  onChange,
  hideLabelFromVision,
  markWhenOptional,
  type,
  prefix,
  suffix,
  validity
}) {
  const { label, placeholder, description, getValue, setValue, isValid } = field;
  const value = getValue({ item: data });
  const onChangeControl = useCallback(
    (newValue) => onChange(
      setValue({
        item: data,
        value: newValue
      })
    ),
    [data, setValue, onChange]
  );
  return /* @__PURE__ */ jsx(
    ValidatedInputControl,
    {
      required: !!isValid.required,
      markWhenOptional,
      customValidity: getCustomValidity(isValid, validity),
      label,
      placeholder,
      value: value ?? "",
      help: description,
      onChange: onChangeControl,
      hideLabelFromVision,
      type,
      prefix,
      suffix,
      pattern: isValid.pattern ? isValid.pattern.constraint : void 0,
      minLength: isValid.minLength ? isValid.minLength.constraint : void 0,
      maxLength: isValid.maxLength ? isValid.maxLength.constraint : void 0,
      __next40pxDefaultSize: true
    }
  );
}
export {
  ValidatedText as default
};
//# sourceMappingURL=validated-input.mjs.map
