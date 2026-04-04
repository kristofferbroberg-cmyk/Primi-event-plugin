// packages/components/src/radio-group/radio.tsx
import { forwardRef, useContext } from "@wordpress/element";
import * as Ariakit from "@ariakit/react";
import Button from "../button/index.mjs";
import { RadioGroupContext } from "./context.mjs";
import { maybeWarnDeprecated36pxSize } from "../utils/deprecated-36px-size.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
function UnforwardedRadio({
  value,
  children,
  ...props
}, ref) {
  const {
    store,
    disabled
  } = useContext(RadioGroupContext);
  const selectedValue = Ariakit.useStoreState(store, "value");
  const isChecked = selectedValue !== void 0 && selectedValue === value;
  maybeWarnDeprecated36pxSize({
    componentName: "Radio",
    size: void 0,
    __next40pxDefaultSize: props.__next40pxDefaultSize
  });
  return /* @__PURE__ */ _jsx(Ariakit.Radio, {
    disabled,
    store,
    ref,
    value,
    render: (
      // Disable: the parent component already takes care of the `__next40pxDefaultSize` prop.
      // eslint-disable-next-line @wordpress/components-no-missing-40px-size-prop
      /* @__PURE__ */ _jsx(Button, {
        variant: isChecked ? "primary" : "secondary",
        ...props
      })
    ),
    children: children || value
  });
}
var Radio2 = forwardRef(UnforwardedRadio);
Radio2.displayName = "Radio";
var radio_default = Radio2;
export {
  Radio2 as Radio,
  radio_default as default
};
//# sourceMappingURL=radio.mjs.map
