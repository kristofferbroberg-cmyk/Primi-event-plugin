// packages/dataviews/src/components/dataform-controls/telephone.tsx
import {
  Icon,
  __experimentalInputControlPrefixWrapper as InputControlPrefixWrapper
} from "@wordpress/components";
import { mobile } from "@wordpress/icons";
import ValidatedText from "./utils/validated-input.mjs";
import { jsx } from "react/jsx-runtime";
function Telephone({
  data,
  field,
  onChange,
  hideLabelFromVision,
  markWhenOptional,
  validity
}) {
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
        type: "tel",
        prefix: /* @__PURE__ */ jsx(InputControlPrefixWrapper, { variant: "icon", children: /* @__PURE__ */ jsx(Icon, { icon: mobile }) })
      }
    }
  );
}
export {
  Telephone as default
};
//# sourceMappingURL=telephone.mjs.map
