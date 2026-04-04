// packages/dataviews/src/field-types/utils/render-default.tsx
import RenderFromElements from "./render-from-elements.mjs";
import { jsx } from "react/jsx-runtime";
function render({
  item,
  field
}) {
  if (field.hasElements) {
    return /* @__PURE__ */ jsx(RenderFromElements, { item, field });
  }
  return field.getValueFormatted({ item, field });
}
export {
  render as default
};
//# sourceMappingURL=render-default.mjs.map
