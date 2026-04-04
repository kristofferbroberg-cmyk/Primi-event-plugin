// packages/components/src/tree-grid/row.tsx
import { forwardRef } from "@wordpress/element";
import { jsx as _jsx } from "react/jsx-runtime";
function UnforwardedTreeGridRow({
  children,
  level,
  positionInSet,
  setSize,
  isExpanded,
  ...props
}, ref) {
  return /* @__PURE__ */ _jsx("tr", {
    ...props,
    ref,
    role: "row",
    "aria-level": level,
    "aria-posinset": positionInSet,
    "aria-setsize": setSize,
    "aria-expanded": isExpanded,
    children
  });
}
var TreeGridRow = forwardRef(UnforwardedTreeGridRow);
TreeGridRow.displayName = "TreeGridRow";
var row_default = TreeGridRow;
export {
  TreeGridRow,
  row_default as default
};
//# sourceMappingURL=row.mjs.map
