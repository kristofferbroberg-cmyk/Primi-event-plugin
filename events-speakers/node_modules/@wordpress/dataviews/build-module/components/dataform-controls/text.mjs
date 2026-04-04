// packages/dataviews/src/components/dataform-controls/text.tsx
import { createElement } from "@wordpress/element";
import ValidatedText from "./utils/validated-input.mjs";
import { jsx } from "react/jsx-runtime";
function Text({
  data,
  field,
  onChange,
  hideLabelFromVision,
  markWhenOptional,
  config,
  validity
}) {
  const { prefix, suffix } = config || {};
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
        prefix: prefix ? createElement(prefix) : void 0,
        suffix: suffix ? createElement(suffix) : void 0
      }
    }
  );
}
export {
  Text as default
};
//# sourceMappingURL=text.mjs.map
