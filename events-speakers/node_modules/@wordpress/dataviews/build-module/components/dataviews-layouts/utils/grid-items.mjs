// packages/dataviews/src/components/dataviews-layouts/utils/grid-items.tsx
import { forwardRef } from "@wordpress/element";
import clsx from "clsx";
import { jsx } from "react/jsx-runtime";
var GridItems = forwardRef(({ className, previewSize, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: clsx("dataviews-view-grid-items", className),
      style: {
        gridTemplateColumns: previewSize && `repeat(auto-fill, minmax(${previewSize}px, 1fr))`
      },
      ...props
    }
  );
});
export {
  GridItems
};
//# sourceMappingURL=grid-items.mjs.map
