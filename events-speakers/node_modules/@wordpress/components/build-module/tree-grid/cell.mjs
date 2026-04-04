// packages/components/src/tree-grid/cell.tsx
import { forwardRef } from "@wordpress/element";
import TreeGridItem from "./item.mjs";
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
function UnforwardedTreeGridCell({
  children,
  withoutGridItem = false,
  ...props
}, ref) {
  return /* @__PURE__ */ _jsx("td", {
    ...props,
    role: "gridcell",
    children: withoutGridItem ? /* @__PURE__ */ _jsx(_Fragment, {
      children: typeof children === "function" ? children({
        ...props,
        ref
      }) : children
    }) : /* @__PURE__ */ _jsx(TreeGridItem, {
      ref,
      children
    })
  });
}
var TreeGridCell = forwardRef(UnforwardedTreeGridCell);
TreeGridCell.displayName = "TreeGridCell";
var cell_default = TreeGridCell;
export {
  TreeGridCell,
  cell_default as default
};
//# sourceMappingURL=cell.mjs.map
