// packages/components/src/textarea-control/index.tsx
import clsx from "clsx";
import { useInstanceId } from "@wordpress/compose";
import { forwardRef } from "@wordpress/element";
import BaseControl from "../base-control/index.mjs";
import { StyledTextarea } from "./styles/textarea-control-styles.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
function UnforwardedTextareaControl(props, ref) {
  const {
    // Prevent passing this to `textarea`.
    __nextHasNoMarginBottom: _,
    label,
    hideLabelFromVision,
    value,
    help,
    onChange,
    rows = 4,
    className,
    ...additionalProps
  } = props;
  const instanceId = useInstanceId(TextareaControl);
  const id = `inspector-textarea-control-${instanceId}`;
  const onChangeValue = (event) => onChange(event.target.value);
  const classes = clsx("components-textarea-control", className);
  return /* @__PURE__ */ _jsx(BaseControl, {
    label,
    hideLabelFromVision,
    id,
    help,
    className: classes,
    children: /* @__PURE__ */ _jsx(StyledTextarea, {
      className: "components-textarea-control__input",
      id,
      rows,
      onChange: onChangeValue,
      "aria-describedby": !!help ? id + "__help" : void 0,
      value,
      ref,
      ...additionalProps
    })
  });
}
var TextareaControl = forwardRef(UnforwardedTextareaControl);
TextareaControl.displayName = "TextareaControl";
var textarea_control_default = TextareaControl;
export {
  TextareaControl,
  textarea_control_default as default
};
//# sourceMappingURL=index.mjs.map
