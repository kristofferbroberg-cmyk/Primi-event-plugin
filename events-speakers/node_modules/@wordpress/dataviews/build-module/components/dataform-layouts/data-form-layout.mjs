// packages/dataviews/src/components/dataform-layouts/data-form-layout.tsx
import { useContext, useMemo } from "@wordpress/element";
import { Stack } from "@wordpress/ui";
import { getFormFieldLayout } from "./index.mjs";
import DataFormContext from "../dataform-context/index.mjs";
import { jsx } from "react/jsx-runtime";
var DEFAULT_WRAPPER = ({ children }) => /* @__PURE__ */ jsx(Stack, { direction: "column", className: "dataforms-layouts__wrapper", gap: "lg", children });
function DataFormLayout({
  data,
  form,
  onChange,
  validity,
  children,
  as
}) {
  const { fields: fieldDefinitions } = useContext(DataFormContext);
  const markWhenOptional = useMemo(() => {
    const requiredCount = fieldDefinitions.filter(
      (f) => !!f.isValid?.required
    ).length;
    const optionalCount = fieldDefinitions.length - requiredCount;
    return requiredCount > optionalCount;
  }, [fieldDefinitions]);
  function getFieldDefinition(field) {
    return fieldDefinitions.find(
      (fieldDefinition) => fieldDefinition.id === field.id
    );
  }
  const Wrapper = as ?? getFormFieldLayout(form.layout.type)?.wrapper ?? DEFAULT_WRAPPER;
  return /* @__PURE__ */ jsx(Wrapper, { layout: form.layout, children: form.fields.map((formField) => {
    const FieldLayout = getFormFieldLayout(formField.layout.type)?.component;
    if (!FieldLayout) {
      return null;
    }
    const fieldDefinition = !formField.children ? getFieldDefinition(formField) : void 0;
    if (fieldDefinition && fieldDefinition.isVisible && !fieldDefinition.isVisible(data)) {
      return null;
    }
    if (children) {
      return children(
        FieldLayout,
        formField,
        validity?.[formField.id],
        markWhenOptional
      );
    }
    return /* @__PURE__ */ jsx(
      FieldLayout,
      {
        data,
        field: formField,
        onChange,
        markWhenOptional,
        validity: validity?.[formField.id]
      },
      formField.id
    );
  }) });
}
export {
  DataFormLayout
};
//# sourceMappingURL=data-form-layout.mjs.map
