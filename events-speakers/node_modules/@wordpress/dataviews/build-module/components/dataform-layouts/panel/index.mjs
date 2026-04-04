// packages/dataviews/src/components/dataform-layouts/panel/index.tsx
import PanelModal from "./modal.mjs";
import PanelDropdown from "./dropdown.mjs";
import { jsx } from "react/jsx-runtime";
function FormPanelField({
  data,
  field,
  onChange,
  validity
}) {
  const layout = field.layout;
  if (layout.openAs.type === "modal") {
    return /* @__PURE__ */ jsx(
      PanelModal,
      {
        data,
        field,
        onChange,
        validity
      }
    );
  }
  return /* @__PURE__ */ jsx(
    PanelDropdown,
    {
      data,
      field,
      onChange,
      validity
    }
  );
}
export {
  FormPanelField as default
};
//# sourceMappingURL=index.mjs.map
