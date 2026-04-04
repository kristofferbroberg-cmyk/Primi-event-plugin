// packages/dataviews/src/dataform/index.tsx
import { useMemo } from "@wordpress/element";
import normalizeFields from "../field-types/index.mjs";
import { DataFormProvider } from "../components/dataform-context/index.mjs";
import { DataFormLayout } from "../components/dataform-layouts/data-form-layout.mjs";
import normalizeForm from "../components/dataform-layouts/normalize-form.mjs";
import { jsx } from "react/jsx-runtime";
function DataForm({
  data,
  form,
  fields,
  onChange,
  validity
}) {
  const normalizedForm = useMemo(() => normalizeForm(form), [form]);
  const normalizedFields = useMemo(
    () => normalizeFields(fields),
    [fields]
  );
  if (!form.fields) {
    return null;
  }
  return /* @__PURE__ */ jsx(DataFormProvider, { fields: normalizedFields, children: /* @__PURE__ */ jsx(
    DataFormLayout,
    {
      data,
      form: normalizedForm,
      onChange,
      validity
    }
  ) });
}
export {
  DataForm as default
};
//# sourceMappingURL=index.mjs.map
