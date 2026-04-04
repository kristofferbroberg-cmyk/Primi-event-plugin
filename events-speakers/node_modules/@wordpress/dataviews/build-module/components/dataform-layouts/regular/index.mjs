// packages/dataviews/src/components/dataform-layouts/regular/index.tsx
import clsx from "clsx";
import { useContext, useMemo } from "@wordpress/element";
import {
  __experimentalHeading as Heading,
  BaseControl
} from "@wordpress/components";
import { Stack } from "@wordpress/ui";
import DataFormContext from "../../dataform-context/index.mjs";
import { DataFormLayout } from "../data-form-layout.mjs";
import { DEFAULT_LAYOUT } from "../normalize-form.mjs";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function Header({ title }) {
  return /* @__PURE__ */ jsx(
    Stack,
    {
      direction: "column",
      className: "dataforms-layouts-regular__header",
      gap: "lg",
      children: /* @__PURE__ */ jsx(Stack, { direction: "row", align: "center", children: /* @__PURE__ */ jsx(Heading, { level: 2, size: 13, children: title }) })
    }
  );
}
function FormRegularField({
  data,
  field,
  onChange,
  hideLabelFromVision,
  markWhenOptional,
  validity
}) {
  const { fields } = useContext(DataFormContext);
  const layout = field.layout;
  const form = useMemo(
    () => ({
      layout: DEFAULT_LAYOUT,
      fields: !!field.children ? field.children : []
    }),
    [field]
  );
  if (!!field.children) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      !hideLabelFromVision && field.label && /* @__PURE__ */ jsx(Header, { title: field.label }),
      /* @__PURE__ */ jsx(
        DataFormLayout,
        {
          data,
          form,
          onChange,
          validity: validity?.children
        }
      )
    ] });
  }
  const labelPosition = layout.labelPosition;
  const fieldDefinition = fields.find(
    (fieldDef) => fieldDef.id === field.id
  );
  if (!fieldDefinition || !fieldDefinition.Edit) {
    return null;
  }
  if (labelPosition === "side") {
    return /* @__PURE__ */ jsxs(
      Stack,
      {
        direction: "row",
        className: "dataforms-layouts-regular__field",
        gap: "sm",
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: clsx(
                "dataforms-layouts-regular__field-label",
                `dataforms-layouts-regular__field-label--label-position-${labelPosition}`
              ),
              children: /* @__PURE__ */ jsx(BaseControl.VisualLabel, { children: fieldDefinition.label })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "dataforms-layouts-regular__field-control", children: fieldDefinition.readOnly === true ? /* @__PURE__ */ jsx(
            fieldDefinition.render,
            {
              item: data,
              field: fieldDefinition
            }
          ) : /* @__PURE__ */ jsx(
            fieldDefinition.Edit,
            {
              data,
              field: fieldDefinition,
              onChange,
              hideLabelFromVision: true,
              markWhenOptional,
              validity
            },
            fieldDefinition.id
          ) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsx("div", { className: "dataforms-layouts-regular__field", children: fieldDefinition.readOnly === true ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Fragment, { children: [
    !hideLabelFromVision && labelPosition !== "none" && /* @__PURE__ */ jsx(BaseControl.VisualLabel, { children: fieldDefinition.label }),
    /* @__PURE__ */ jsx(
      fieldDefinition.render,
      {
        item: data,
        field: fieldDefinition
      }
    )
  ] }) }) : /* @__PURE__ */ jsx(
    fieldDefinition.Edit,
    {
      data,
      field: fieldDefinition,
      onChange,
      hideLabelFromVision: labelPosition === "none" ? true : hideLabelFromVision,
      markWhenOptional,
      validity
    }
  ) });
}
export {
  FormRegularField as default
};
//# sourceMappingURL=index.mjs.map
