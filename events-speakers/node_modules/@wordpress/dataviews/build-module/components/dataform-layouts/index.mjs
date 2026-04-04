// packages/dataviews/src/components/dataform-layouts/index.tsx
import { Stack } from "@wordpress/ui";
import FormRegularField from "./regular/index.mjs";
import FormPanelField from "./panel/index.mjs";
import FormCardField from "./card/index.mjs";
import FormRowField from "./row/index.mjs";
import FormDetailsField from "./details/index.mjs";
import { jsx } from "react/jsx-runtime";
var FORM_FIELD_LAYOUTS = [
  {
    type: "regular",
    component: FormRegularField,
    wrapper: ({ children }) => /* @__PURE__ */ jsx(
      Stack,
      {
        direction: "column",
        className: "dataforms-layouts__wrapper",
        gap: "lg",
        children
      }
    )
  },
  {
    type: "panel",
    component: FormPanelField,
    wrapper: ({ children }) => /* @__PURE__ */ jsx(
      Stack,
      {
        direction: "column",
        className: "dataforms-layouts__wrapper",
        gap: "md",
        children
      }
    )
  },
  {
    type: "card",
    component: FormCardField,
    wrapper: ({ children }) => /* @__PURE__ */ jsx(
      Stack,
      {
        direction: "column",
        className: "dataforms-layouts__wrapper",
        gap: "xl",
        children
      }
    )
  },
  {
    type: "row",
    component: FormRowField,
    wrapper: ({
      children,
      layout
    }) => /* @__PURE__ */ jsx(
      Stack,
      {
        direction: "column",
        className: "dataforms-layouts__wrapper",
        gap: "lg",
        children: /* @__PURE__ */ jsx("div", { className: "dataforms-layouts-row__field", children: /* @__PURE__ */ jsx(
          Stack,
          {
            direction: "row",
            gap: "lg",
            align: layout.alignment,
            children
          }
        ) })
      }
    )
  },
  {
    type: "details",
    component: FormDetailsField
  }
];
function getFormFieldLayout(type) {
  return FORM_FIELD_LAYOUTS.find((layout) => layout.type === type);
}
export {
  getFormFieldLayout
};
//# sourceMappingURL=index.mjs.map
