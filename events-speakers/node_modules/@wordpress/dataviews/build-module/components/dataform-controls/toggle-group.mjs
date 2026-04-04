// packages/dataviews/src/components/dataform-controls/toggle-group.tsx
import {
  privateApis,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
  Spinner
} from "@wordpress/components";
import { useCallback } from "@wordpress/element";
import { unlock } from "../../lock-unlock.mjs";
import getCustomValidity from "./utils/get-custom-validity.mjs";
import useElements from "../../hooks/use-elements.mjs";
import { jsx } from "react/jsx-runtime";
var { ValidatedToggleGroupControl } = unlock(privateApis);
function ToggleGroup({
  data,
  field,
  onChange,
  hideLabelFromVision,
  markWhenOptional,
  validity
}) {
  const { getValue, setValue, isValid } = field;
  const value = getValue({ item: data });
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
  if (elements.length === 0) {
    return null;
  }
  const selectedOption = elements.find((el) => el.value === value);
  return /* @__PURE__ */ jsx(
    ValidatedToggleGroupControl,
    {
      required: !!field.isValid?.required,
      markWhenOptional,
      customValidity: getCustomValidity(isValid, validity),
      __next40pxDefaultSize: true,
      isBlock: true,
      label: field.label,
      help: selectedOption?.description || field.description,
      onChange: onChangeControl,
      value,
      hideLabelFromVision,
      children: elements.map((el) => /* @__PURE__ */ jsx(
        ToggleGroupControlOption,
        {
          label: el.label,
          value: el.value
        },
        el.value
      ))
    }
  );
}
export {
  ToggleGroup as default
};
//# sourceMappingURL=toggle-group.mjs.map
