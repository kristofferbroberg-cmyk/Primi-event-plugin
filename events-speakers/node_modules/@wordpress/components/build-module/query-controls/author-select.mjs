// packages/components/src/query-controls/author-select.tsx
import { buildTermsTree } from "./terms.mjs";
import TreeSelect from "../tree-select/index.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
function AuthorSelect({
  __next40pxDefaultSize,
  label,
  noOptionLabel,
  authorList,
  selectedAuthorId,
  onChange: onChangeProp
}) {
  if (!authorList) {
    return null;
  }
  const termsTree = buildTermsTree(authorList);
  return /* @__PURE__ */ _jsx(TreeSelect, {
    label,
    noOptionLabel,
    onChange: onChangeProp,
    tree: termsTree,
    selectedId: selectedAuthorId !== void 0 ? String(selectedAuthorId) : void 0,
    __next40pxDefaultSize
  });
}
export {
  AuthorSelect as default
};
//# sourceMappingURL=author-select.mjs.map
