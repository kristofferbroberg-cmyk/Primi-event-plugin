// packages/dataviews/src/components/dataform-controls/url.tsx
import {
  Icon,
  __experimentalInputControlPrefixWrapper as InputControlPrefixWrapper
} from "@wordpress/components";
import { link } from "@wordpress/icons";
import ValidatedText from "./utils/validated-input.mjs";
import { jsx } from "react/jsx-runtime";
function Url({
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
        type: "url",
        prefix: /* @__PURE__ */ jsx(InputControlPrefixWrapper, { variant: "icon", children: /* @__PURE__ */ jsx(Icon, { icon: link }) })
      }
    }
  );
}
export {
  Url as default
};
//# sourceMappingURL=url.mjs.map
