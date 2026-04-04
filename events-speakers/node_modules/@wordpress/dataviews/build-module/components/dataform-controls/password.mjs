// packages/dataviews/src/components/dataform-controls/password.tsx
import {
  __experimentalInputControlSuffixWrapper as InputControlSuffixWrapper,
  Button
} from "@wordpress/components";
import { useCallback, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { seen, unseen } from "@wordpress/icons";
import ValidatedText from "./utils/validated-input.mjs";
import { jsx } from "react/jsx-runtime";
function Password({
  data,
  field,
  onChange,
  hideLabelFromVision,
  markWhenOptional,
  validity
}) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);
  return /* @__PURE__ */ jsx(
    ValidatedText,
    {
      ...{
        data,
        field,
        onChange,
        hideLabelFromVision,
        markWhenOptional,
        validity,
        type: isVisible ? "text" : "password",
        suffix: /* @__PURE__ */ jsx(InputControlSuffixWrapper, { variant: "control", children: /* @__PURE__ */ jsx(
          Button,
          {
            icon: isVisible ? unseen : seen,
            onClick: toggleVisibility,
            size: "small",
            label: isVisible ? __("Hide password") : __("Show password")
          }
        ) })
      }
    }
  );
}
export {
  Password as default
};
//# sourceMappingURL=password.mjs.map
