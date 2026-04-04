// packages/icons/src/icon/index.ts
import { cloneElement, forwardRef } from "@wordpress/element";
var icon_default = forwardRef(
  ({ icon, size = 24, ...props }, ref) => {
    return cloneElement(icon, {
      width: size,
      height: size,
      ...props,
      ref
    });
  }
);
export {
  icon_default as default
};
//# sourceMappingURL=index.mjs.map
