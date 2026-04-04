// packages/ui/src/button/icon.tsx
import { forwardRef } from "@wordpress/element";
import { Icon } from "../icon/index.mjs";
import { jsx } from "react/jsx-runtime";
var ButtonIcon = forwardRef(
  function ButtonIcon2({ icon, ...props }, ref) {
    return /* @__PURE__ */ jsx(
      Icon,
      {
        ref,
        icon,
        viewBox: "4 4 16 16",
        size: 16,
        ...props
      }
    );
  }
);
export {
  ButtonIcon
};
//# sourceMappingURL=icon.mjs.map
