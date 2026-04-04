// packages/dataviews/src/components/dataform-controls/combobox.tsx
import { privateApis, Spinner } from "@wordpress/components";
import { useCallback } from "@wordpress/element";
import useElements from "../../hooks/use-elements.mjs";
import { unlock } from "../../lock-unlock.mjs";
import getCustomValidity from "./utils/get-custom-validity.mjs";
import { jsx } from "react/jsx-runtime";
var { ValidatedComboboxControl } = unlock(privateApis);
function Combobox({
  data,
  field,
  onChange,
  hideLabelFromVision,
  validity
}) {
  const { label, description, placeholder, getValue, setValue, isValid } = field;
  const value = getValue({ item: data }) ?? "";
  const onChangeControl = useCallback(
    (newValue) => onChange(setValue({ item: data, value: newValue ?? "" })),
    [data, onChange, setValue]
  );
  const { elements, isLoading } = useElements({
    elements: field.elements,
    getElements: field.getElements
  });
  if (isLoading) {
    return /* @__PURE__ */ jsx(Spinner, {});
  }
  return /* @__PURE__ */ jsx(
    ValidatedComboboxControl,
    {
      required: !!field.isValid?.required,
      customValidity: getCustomValidity(isValid, validity),
      label,
      value,
      help: description,
      placeholder,
      options: elements,
      onChange: onChangeControl,
      hideLabelFromVision,
      allowReset: true,
      expandOnFocus: true
    }
  );
}
export {
  Combobox as default
};
//# sourceMappingURL=combobox.mjs.map
