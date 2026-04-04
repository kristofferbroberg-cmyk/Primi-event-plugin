// packages/dataviews/src/components/dataform-controls/textarea.tsx
import { privateApis } from "@wordpress/components";
import { useCallback } from "@wordpress/element";
import { unlock } from "../../lock-unlock.mjs";
import getCustomValidity from "./utils/get-custom-validity.mjs";
import { jsx } from "react/jsx-runtime";
var { ValidatedTextareaControl } = unlock(privateApis);
function Textarea({
  data,
  field,
  onChange,
  hideLabelFromVision,
  markWhenOptional,
  config,
  validity
}) {
  const { rows = 4 } = config || {};
  const { label, placeholder, description, setValue, isValid } = field;
  const value = field.getValue({ item: data });
  const onChangeControl = useCallback(
    (newValue) => onChange(setValue({ item: data, value: newValue })),
    [data, onChange, setValue]
  );
  return /* @__PURE__ */ jsx(
    ValidatedTextareaControl,
    {
      required: !!isValid.required,
      markWhenOptional,
      customValidity: getCustomValidity(isValid, validity),
      label,
      placeholder,
      value: value ?? "",
      help: description,
      onChange: onChangeControl,
      rows,
      minLength: isValid.minLength ? isValid.minLength.constraint : void 0,
      maxLength: isValid.maxLength ? isValid.maxLength.constraint : void 0,
      __next40pxDefaultSize: true,
      hideLabelFromVision
    }
  );
}
export {
  Textarea as default
};
//# sourceMappingURL=textarea.mjs.map
