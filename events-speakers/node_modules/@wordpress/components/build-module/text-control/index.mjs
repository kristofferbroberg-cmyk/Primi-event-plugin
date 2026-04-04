// packages/components/src/text-control/index.tsx
import clsx from "clsx";
import { useInstanceId } from "@wordpress/compose";
import { forwardRef } from "@wordpress/element";
import BaseControl from "../base-control/index.mjs";
import { maybeWarnDeprecated36pxSize } from "../utils/deprecated-36px-size.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
function UnforwardedTextControl(props, ref) {
  const {
    // Prevent passing this to `input`.
    __nextHasNoMarginBottom: _,
    __next40pxDefaultSize = false,
    label,
    hideLabelFromVision,
    value,
    help,
    id: idProp,
    className,
    onChange,
    type = "text",
    ...additionalProps
  } = props;
  const id = useInstanceId(TextControl, "inspector-text-control", idProp);
  const onChangeValue = (event) => onChange(event.target.value);
  maybeWarnDeprecated36pxSize({
    componentName: "TextControl",
    size: void 0,
    __next40pxDefaultSize
  });
  return /* @__PURE__ */ _jsx(BaseControl, {
    label,
    hideLabelFromVision,
    id,
    help,
    className,
    children: /* @__PURE__ */ _jsx("input", {
      className: clsx("components-text-control__input", {
        "is-next-40px-default-size": __next40pxDefaultSize
      }),
      type,
      id,
      value,
      onChange: onChangeValue,
      "aria-describedby": !!help ? id + "__help" : void 0,
      ref,
      ...additionalProps
    })
  });
}
var TextControl = forwardRef(UnforwardedTextControl);
TextControl.displayName = "TextControl";
var text_control_default = TextControl;
export {
  TextControl,
  text_control_default as default
};
//# sourceMappingURL=index.mjs.map
