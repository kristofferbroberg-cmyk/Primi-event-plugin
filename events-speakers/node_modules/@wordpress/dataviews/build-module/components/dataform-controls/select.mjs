// packages/dataviews/src/components/dataform-controls/select.tsx
import { privateApis, Spinner } from "@wordpress/components";
import { useCallback } from "@wordpress/element";
import useElements from "../../hooks/use-elements.mjs";
import { unlock } from "../../lock-unlock.mjs";
import getCustomValidity from "./utils/get-custom-validity.mjs";
import { jsx } from "react/jsx-runtime";
var { ValidatedSelectControl } = unlock(privateApis);
function Select({
  data,
  field,
  onChange,
  hideLabelFromVision,
  markWhenOptional,
  validity
}) {
  const { type, label, description, getValue, setValue, isValid } = field;
  const isMultiple = type === "array";
  const value = getValue({ item: data }) ?? (isMultiple ? [] : "");
  const onChangeControl = useCallback(
    (newValue) => onChange(setValue({ item: data, value: newValue })),
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
    ValidatedSelectControl,
    {
      required: !!field.isValid?.required,
      markWhenOptional,
      customValidity: getCustomValidity(isValid, validity),
      label,
      value,
      help: description,
      options: elements,
      onChange: onChangeControl,
      __next40pxDefaultSize: true,
      hideLabelFromVision,
      multiple: isMultiple
    }
  );
}
export {
  Select as default
};
//# sourceMappingURL=select.mjs.map
