// packages/dataviews/src/components/dataform-controls/email.tsx
import {
  Icon,
  __experimentalInputControlPrefixWrapper as InputControlPrefixWrapper
} from "@wordpress/components";
import { envelope } from "@wordpress/icons";
import ValidatedText from "./utils/validated-input.mjs";
import { jsx } from "react/jsx-runtime";
function Email({
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
        type: "email",
        prefix: /* @__PURE__ */ jsx(InputControlPrefixWrapper, { variant: "icon", children: /* @__PURE__ */ jsx(Icon, { icon: envelope }) })
      }
    }
  );
}
export {
  Email as default
};
//# sourceMappingURL=email.mjs.map
