// packages/dataviews/src/components/dataform-layouts/row/index.tsx
import { __experimentalHeading as Heading } from "@wordpress/components";
import { Stack } from "@wordpress/ui";
import { DataFormLayout } from "../data-form-layout.mjs";
import { DEFAULT_LAYOUT } from "../normalize-form.mjs";
import { getFormFieldLayout } from "../index.mjs";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function Header({ title }) {
  return /* @__PURE__ */ jsx(
    Stack,
    {
      direction: "column",
      className: "dataforms-layouts-row__header",
      gap: "lg",
      children: /* @__PURE__ */ jsx(Stack, { direction: "row", align: "center", children: /* @__PURE__ */ jsx(Heading, { level: 2, size: 13, children: title }) })
    }
  );
}
var EMPTY_WRAPPER = ({ children }) => /* @__PURE__ */ jsx(Fragment, { children });
function FormRowField({
  data,
  field,
  onChange,
  hideLabelFromVision,
  markWhenOptional,
  validity
}) {
  const layout = field.layout;
  if (!!field.children) {
    const form = {
      layout: DEFAULT_LAYOUT,
      fields: field.children
    };
    return /* @__PURE__ */ jsxs("div", { className: "dataforms-layouts-row__field", children: [
      !hideLabelFromVision && field.label && /* @__PURE__ */ jsx(Header, { title: field.label }),
      /* @__PURE__ */ jsx(Stack, { direction: "row", align: layout.alignment, gap: "lg", children: /* @__PURE__ */ jsx(
        DataFormLayout,
        {
          data,
          form,
          onChange,
          validity: validity?.children,
          as: EMPTY_WRAPPER,
          children: (FieldLayout, childField, childFieldValidity) => /* @__PURE__ */ jsx(
            "div",
            {
              className: "dataforms-layouts-row__field-control",
              style: layout.styles[childField.id],
              children: /* @__PURE__ */ jsx(
                FieldLayout,
                {
                  data,
                  field: childField,
                  onChange,
                  hideLabelFromVision,
                  markWhenOptional,
                  validity: childFieldValidity
                }
              )
            },
            childField.id
          )
        }
      ) })
    ] });
  }
  const RegularLayout = getFormFieldLayout("regular")?.component;
  if (!RegularLayout) {
    return null;
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "dataforms-layouts-row__field-control", children: /* @__PURE__ */ jsx(
    RegularLayout,
    {
      data,
      field,
      onChange,
      markWhenOptional,
      validity
    }
  ) }) });
}
export {
  FormRowField as default
};
//# sourceMappingURL=index.mjs.map
