// packages/components/src/select-control/index.tsx
import clsx from "clsx";
import { useInstanceId } from "@wordpress/compose";
import { forwardRef } from "@wordpress/element";
import BaseControl from "../base-control/index.mjs";
import { Select, StyledInputBase } from "./styles/select-control-styles.mjs";
import SelectControlChevronDown from "./chevron-down.mjs";
import { useDeprecated36pxDefaultSizeProp } from "../utils/use-deprecated-props.mjs";
import { maybeWarnDeprecated36pxSize } from "../utils/deprecated-36px-size.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
function useUniqueId(idProp) {
  const instanceId = useInstanceId(SelectControl);
  const id = `inspector-select-control-${instanceId}`;
  return idProp || id;
}
function SelectOptions({
  options
}) {
  return options.map(({
    id,
    label,
    value,
    ...optionProps
  }, index) => {
    const key = id || `${label}-${value}-${index}`;
    return /* @__PURE__ */ _jsx("option", {
      value,
      ...optionProps,
      children: label
    }, key);
  });
}
function UnforwardedSelectControl(props, ref) {
  const {
    className,
    disabled = false,
    help,
    hideLabelFromVision,
    id: idProp,
    label,
    multiple = false,
    onChange,
    options = [],
    size = "default",
    value: valueProp,
    labelPosition = "top",
    children,
    prefix,
    suffix,
    variant = "default",
    __next40pxDefaultSize = false,
    __nextHasNoMarginBottom: _,
    // Prevent passing to internal component
    __shouldNotWarnDeprecated36pxSize,
    ...restProps
  } = useDeprecated36pxDefaultSizeProp(props);
  const id = useUniqueId(idProp);
  const helpId = help ? `${id}__help` : void 0;
  if (!options?.length && !children) {
    return null;
  }
  const handleOnChange = (event) => {
    if (props.multiple) {
      const selectedOptions = Array.from(event.target.options).filter(({
        selected
      }) => selected);
      const newValues = selectedOptions.map(({
        value
      }) => value);
      props.onChange?.(newValues, {
        event
      });
      return;
    }
    props.onChange?.(event.target.value, {
      event
    });
  };
  const classes = clsx("components-select-control", className);
  maybeWarnDeprecated36pxSize({
    componentName: "SelectControl",
    __next40pxDefaultSize,
    size,
    __shouldNotWarnDeprecated36pxSize
  });
  return /* @__PURE__ */ _jsx(BaseControl, {
    help,
    id,
    className: classes,
    children: /* @__PURE__ */ _jsx(StyledInputBase, {
      disabled,
      hideLabelFromVision,
      id,
      isBorderless: variant === "minimal",
      label,
      size,
      suffix: suffix || !multiple && /* @__PURE__ */ _jsx(SelectControlChevronDown, {}),
      prefix,
      labelPosition,
      __unstableInputWidth: variant === "minimal" ? "auto" : void 0,
      variant,
      __next40pxDefaultSize,
      children: /* @__PURE__ */ _jsx(Select, {
        ...restProps,
        __next40pxDefaultSize,
        "aria-describedby": helpId,
        className: "components-select-control__input",
        disabled,
        id,
        multiple,
        onChange: handleOnChange,
        ref,
        selectSize: size,
        value: valueProp,
        variant,
        children: children || /* @__PURE__ */ _jsx(SelectOptions, {
          options
        })
      })
    })
  });
}
var SelectControl = forwardRef(UnforwardedSelectControl);
SelectControl.displayName = "SelectControl";
var select_control_default = SelectControl;
export {
  SelectControl,
  select_control_default as default
};
//# sourceMappingURL=index.mjs.map
