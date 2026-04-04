// packages/components/src/circular-option-picker/circular-option-picker.tsx
import clsx from "clsx";
import { useInstanceId } from "@wordpress/compose";
import { isRTL } from "@wordpress/i18n";
import { useMemo, useState } from "@wordpress/element";
import { CircularOptionPickerContext } from "./circular-option-picker-context.mjs";
import { Composite } from "../composite/index.mjs";
import { Option } from "./circular-option-picker-option.mjs";
import { OptionGroup } from "./circular-option-picker-option-group.mjs";
import { ButtonAction, DropdownLinkAction } from "./circular-option-picker-actions.mjs";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function ListboxCircularOptionPicker(props) {
  const {
    actions,
    options,
    baseId,
    className,
    loop = true,
    children,
    ...additionalProps
  } = props;
  const [activeId, setActiveId] = useState(void 0);
  const contextValue = useMemo(() => ({
    baseId,
    activeId,
    setActiveId
  }), [baseId, activeId, setActiveId]);
  return /* @__PURE__ */ _jsx("div", {
    className,
    children: /* @__PURE__ */ _jsxs(CircularOptionPickerContext.Provider, {
      value: contextValue,
      children: [/* @__PURE__ */ _jsx(Composite, {
        ...additionalProps,
        id: baseId,
        focusLoop: loop,
        rtl: isRTL(),
        role: "listbox",
        activeId,
        setActiveId,
        children: options
      }), children, actions]
    })
  });
}
function ButtonsCircularOptionPicker(props) {
  const {
    actions,
    options,
    children,
    baseId,
    ...additionalProps
  } = props;
  const contextValue = useMemo(() => ({
    baseId
  }), [baseId]);
  return /* @__PURE__ */ _jsx("div", {
    ...additionalProps,
    role: "group",
    id: baseId,
    children: /* @__PURE__ */ _jsxs(CircularOptionPickerContext.Provider, {
      value: contextValue,
      children: [options, children, actions]
    })
  });
}
function CircularOptionPicker(props) {
  const {
    asButtons,
    actions: actionsProp,
    options: optionsProp,
    children,
    className,
    ...additionalProps
  } = props;
  const baseId = useInstanceId(CircularOptionPicker, "components-circular-option-picker", additionalProps.id);
  const OptionPickerImplementation = asButtons ? ButtonsCircularOptionPicker : ListboxCircularOptionPicker;
  const actions = actionsProp ? /* @__PURE__ */ _jsx("div", {
    className: "components-circular-option-picker__custom-clear-wrapper",
    children: actionsProp
  }) : void 0;
  const options = /* @__PURE__ */ _jsx("div", {
    className: "components-circular-option-picker__swatches",
    children: optionsProp
  });
  return /* @__PURE__ */ _jsx(OptionPickerImplementation, {
    ...additionalProps,
    baseId,
    className: clsx("components-circular-option-picker", className),
    actions,
    options,
    children
  });
}
CircularOptionPicker.Option = Option;
CircularOptionPicker.OptionGroup = OptionGroup;
CircularOptionPicker.ButtonAction = ButtonAction;
CircularOptionPicker.DropdownLinkAction = DropdownLinkAction;
CircularOptionPicker.displayName = "CircularOptionPicker";
var circular_option_picker_default = CircularOptionPicker;
export {
  circular_option_picker_default as default
};
//# sourceMappingURL=circular-option-picker.mjs.map
