// packages/dataviews/src/components/dataform-controls/toggle.tsx
import { privateApis } from "@wordpress/components";
import { useCallback } from "@wordpress/element";
import { unlock } from "../../lock-unlock.mjs";
import getCustomValidity from "./utils/get-custom-validity.mjs";
import { jsx } from "react/jsx-runtime";
var { ValidatedToggleControl } = unlock(privateApis);
function Toggle({
  field,
  onChange,
  data,
  hideLabelFromVision,
  markWhenOptional,
  validity
}) {
  const { label, description, getValue, setValue, isValid } = field;
  const onChangeControl = useCallback(() => {
    onChange(
      setValue({ item: data, value: !getValue({ item: data }) })
    );
  }, [onChange, setValue, data, getValue]);
  return /* @__PURE__ */ jsx(
    ValidatedToggleControl,
    {
      required: !!isValid.required,
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
  Toggle as default
};
//# sourceMappingURL=toggle.mjs.map
