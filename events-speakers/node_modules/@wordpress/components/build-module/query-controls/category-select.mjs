// packages/components/src/query-controls/category-select.tsx
import { useMemo } from "@wordpress/element";
import { buildTermsTree } from "./terms.mjs";
import TreeSelect from "../tree-select/index.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
function CategorySelect({
  __next40pxDefaultSize,
  label,
  noOptionLabel,
  categoriesList,
  selectedCategoryId,
  onChange: onChangeProp,
  ...props
}) {
  const termsTree = useMemo(() => {
    return buildTermsTree(categoriesList);
  }, [categoriesList]);
  return /* @__PURE__ */ _jsx(TreeSelect, {
    label,
    noOptionLabel,
    onChange: onChangeProp,
    tree: termsTree,
    selectedId: selectedCategoryId !== void 0 ? String(selectedCategoryId) : void 0,
    ...props,
    __next40pxDefaultSize
  });
}
export {
  CategorySelect as default
};
//# sourceMappingURL=category-select.mjs.map
