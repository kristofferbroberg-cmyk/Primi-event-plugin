// packages/components/src/input-control/index.tsx
import clsx from "clsx";
import { useInstanceId } from "@wordpress/compose";
import { forwardRef } from "@wordpress/element";
import InputBase from "./input-base.mjs";
import InputField from "./input-field.mjs";
import { space } from "../utils/space.mjs";
import { useDraft } from "./utils.mjs";
import BaseControl from "../base-control/index.mjs";
import { useDeprecated36pxDefaultSizeProp } from "../utils/use-deprecated-props.mjs";
import { maybeWarnDeprecated36pxSize } from "../utils/deprecated-36px-size.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
var noop = () => {
};
function useUniqueId(idProp) {
  const instanceId = useInstanceId(InputControl);
  const id = `inspector-input-control-${instanceId}`;
  return idProp || id;
}
function UnforwardedInputControl(props, ref) {
  const {
    __next40pxDefaultSize,
    __shouldNotWarnDeprecated36pxSize,
    __unstableStateReducer: stateReducer = (state) => state,
    __unstableInputWidth,
    className,
    disabled = false,
    help,
    hideLabelFromVision = false,
    id: idProp,
    isPressEnterToChange = false,
    label,
    labelPosition = "top",
    onChange = noop,
    onValidate = noop,
    onKeyDown = noop,
    prefix,
    size = "default",
    style,
    suffix,
    value,
    ...restProps
  } = useDeprecated36pxDefaultSizeProp(props);
  const id = useUniqueId(idProp);
  const classes = clsx("components-input-control", className);
  const draftHookProps = useDraft({
    value,
    onBlur: restProps.onBlur,
    onChange
  });
  const helpProp = !!help ? {
    "aria-describedby": `${id}__help`
  } : {};
  maybeWarnDeprecated36pxSize({
    componentName: "InputControl",
    __next40pxDefaultSize,
    size,
    __shouldNotWarnDeprecated36pxSize
  });
  return /* @__PURE__ */ _jsx(BaseControl, {
    className: classes,
    help,
    id,
    children: /* @__PURE__ */ _jsx(InputBase, {
      __next40pxDefaultSize,
      __unstableInputWidth,
      disabled,
      gap: 3,
      hideLabelFromVision,
      id,
      justify: "left",
      label,
      labelPosition,
      prefix,
      size,
      style,
      suffix,
      children: /* @__PURE__ */ _jsx(InputField, {
        ...restProps,
        ...helpProp,
        __next40pxDefaultSize,
        className: "components-input-control__input",
        disabled,
        id,
        isPressEnterToChange,
        onKeyDown,
        onValidate,
        paddingInlineStart: prefix ? space(1) : void 0,
        paddingInlineEnd: suffix ? space(1) : void 0,
        ref,
        size,
        stateReducer,
        ...draftHookProps
      })
    })
  });
}
var InputControl = forwardRef(UnforwardedInputControl);
InputControl.displayName = "InputControl";
var input_control_default = InputControl;
export {
  InputControl,
  UnforwardedInputControl,
  input_control_default as default
};
//# sourceMappingURL=index.mjs.map
