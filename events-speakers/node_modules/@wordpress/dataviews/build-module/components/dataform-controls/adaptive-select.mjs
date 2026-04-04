// packages/dataviews/src/components/dataform-controls/adaptive-select.tsx
import useElements from "../../hooks/use-elements.mjs";
import Combobox from "./combobox.mjs";
import Select from "./select.mjs";
import { jsx } from "react/jsx-runtime";
var ELEMENTS_THRESHOLD = 10;
function AdaptiveSelect(props) {
  const { field } = props;
  const { elements } = useElements({
    elements: field.elements,
    getElements: field.getElements
  });
  if (elements.length >= ELEMENTS_THRESHOLD) {
    return /* @__PURE__ */ jsx(Combobox, { ...props });
  }
  return /* @__PURE__ */ jsx(Select, { ...props });
}
export {
  AdaptiveSelect as default
};
//# sourceMappingURL=adaptive-select.mjs.map
