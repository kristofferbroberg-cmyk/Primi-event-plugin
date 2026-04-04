// packages/dataviews/src/field-types/utils/render-from-elements.tsx
import useElements from "../../hooks/use-elements.mjs";
function RenderFromElements({
  item,
  field
}) {
  const { elements, isLoading } = useElements({
    elements: field.elements,
    getElements: field.getElements
  });
  const value = field.getValue({ item });
  if (isLoading) {
    return value;
  }
  if (elements.length === 0) {
    return value;
  }
  return elements?.find((element) => element.value === value)?.label || field.getValue({ item });
}
export {
  RenderFromElements as default
};
//# sourceMappingURL=render-from-elements.mjs.map
