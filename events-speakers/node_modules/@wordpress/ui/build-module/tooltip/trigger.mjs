// packages/ui/src/tooltip/trigger.tsx
import { Tooltip } from "@base-ui/react/tooltip";
import { forwardRef } from "@wordpress/element";
import { jsx } from "react/jsx-runtime";
var Trigger = forwardRef(
  function TooltipTrigger({ children, ...props }, ref) {
    return /* @__PURE__ */ jsx(Tooltip.Trigger, { ref, ...props, children });
  }
);
export {
  Trigger
};
//# sourceMappingURL=trigger.mjs.map
