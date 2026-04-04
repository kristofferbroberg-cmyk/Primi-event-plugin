// packages/dataviews/src/components/dataform-layouts/panel/utils/get-label-content.tsx
import { Icon, Tooltip } from "@wordpress/components";
import { error as errorIcon } from "@wordpress/icons";
import { jsx, jsxs } from "react/jsx-runtime";
function getLabelContent(showError, errorMessage, fieldLabel) {
  return showError ? /* @__PURE__ */ jsx(Tooltip, { text: errorMessage, placement: "top", children: /* @__PURE__ */ jsxs("span", { className: "dataforms-layouts-panel__field-label-error-content", children: [
    /* @__PURE__ */ jsx(Icon, { icon: errorIcon, size: 16 }),
    fieldLabel
  ] }) }) : fieldLabel;
}
var get_label_content_default = getLabelContent;
export {
  get_label_content_default as default
};
//# sourceMappingURL=get-label-content.mjs.map
