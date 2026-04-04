// packages/dataviews/src/components/dataform-controls/radio.tsx
import { privateApis, Spinner } from "@wordpress/components";
import { useCallback } from "@wordpress/element";
import { unlock } from "../../lock-unlock.mjs";
import getCustomValidity from "./utils/get-custom-validity.mjs";
import useElements from "../../hooks/use-elements.mjs";
import { jsx } from "react/jsx-runtime";
var { ValidatedRadioControl } = unlock(privateApis);
function Radio({
  data,
  field,
  onChange,
  hideLabelFromVision,
  markWhenOptional,
  validity
}) {
  const { label, description, getValue, setValue, isValid } = field;
  const { elements, isLoading } = useElements({
    elements: field.elements,
    getElements: field.getElements
  });
  const value = getValue({ item: data });
  const onChangeControl = useCallback(
    (newValue) => onChange(setValue({ item: data, value: newValue })),
    [data, onChange, setValue]
  );
  if (isLoading) {
    return /* @__PURE__ */ jsx(Spinner, {});
  }
  return /* @__PURE__ */ jsx(
    ValidatedRadioControl,
    {
      required: !!field.isValid?.required,
      markWhenOptional,
      customValidity: getCustomValidity(isValid, validity),
      label,
      help: description,
      onChange: onChangeControl,
      options: elements,
      selected: value,
      hideLabelFromVision
    }
  );
}
export {
  Radio as default
};
//# sourceMappingURL=radio.mjs.map
