// packages/ui/src/icon/icon.tsx
import { forwardRef } from "@wordpress/element";
import { SVG } from "@wordpress/primitives";
import { jsx } from "react/jsx-runtime";
var Icon = forwardRef(function Icon2({ icon, size = 24, ...restProps }, ref) {
  return /* @__PURE__ */ jsx(
    SVG,
    {
      ref,
      fill: "currentColor",
      ...icon.props,
      ...restProps,
      width: size,
      height: size
    }
  );
});
export {
  Icon
};
//# sourceMappingURL=icon.mjs.map
