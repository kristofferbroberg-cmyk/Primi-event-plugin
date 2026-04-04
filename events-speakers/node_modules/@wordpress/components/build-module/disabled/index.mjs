// packages/components/src/disabled/index.tsx
import { disabledStyles } from "./styles/disabled-styles.mjs";
import { useCx } from "../utils/index.mjs";
import Context from "./context.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
var {
  Consumer,
  Provider
} = Context;
function Disabled({
  className,
  children,
  isDisabled = true,
  ...props
}) {
  const cx = useCx();
  return /* @__PURE__ */ _jsx(Provider, {
    value: isDisabled,
    children: /* @__PURE__ */ _jsx("div", {
      // @ts-ignore Reason: inert is a recent HTML attribute
      inert: isDisabled ? "true" : void 0,
      className: isDisabled ? cx(disabledStyles, className, "components-disabled") : void 0,
      ...props,
      children
    })
  });
}
Disabled.Context = Context;
Disabled.Consumer = Consumer;
var disabled_default = Disabled;
export {
  disabled_default as default
};
//# sourceMappingURL=index.mjs.map
