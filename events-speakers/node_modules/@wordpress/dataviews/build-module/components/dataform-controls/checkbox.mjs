// packages/dataviews/src/components/dataform-controls/checkbox.tsx
import { privateApis } from "@wordpress/components";
import { useCallback } from "@wordpress/element";
import { unlock } from "../../lock-unlock.mjs";
import getCustomValidity from "./utils/get-custom-validity.mjs";
import { jsx } from "react/jsx-runtime";
var { ValidatedCheckboxControl } = unlock(privateApis);
function Checkbox({
  field,
  onChange,
  data,
  hideLabelFromVision,
  markWhenOptional,
  validity
}) {
  const { getValue, setValue, label, description, isValid } = field;
  const onChangeControl = useCallback(() => {
    onChange(
      setValue({ item: data, value: !getValue({ item: data }) })
    );
  }, [data, getValue, onChange, setValue]);
  return /* @__PURE__ */ jsx(
    ValidatedCheckboxControl,
    {
      required: !!field.isValid?.required,
      markWhenOptional,
      customValidity: getCustomValidity(isValid, validity),
      hidden: hideLabelFromVision,
      label,
      help: description,
      checked: getValue({ item: data }),
      onChange: onChangeControl
    }
  );
}
export {
  Checkbox as default
};
//# sourceMappingURL=checkbox.mjs.map
