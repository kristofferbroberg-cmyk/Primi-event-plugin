// packages/components/src/toggle-group-control/toggle-group-control-option-base/component.tsx
import * as Ariakit from "@ariakit/react";
import { useInstanceId } from "@wordpress/compose";
import { useLayoutEffect, useMemo, useRef } from "@wordpress/element";
import { contextConnect, useContextSystem } from "../../context/index.mjs";
import { useToggleGroupControlContext } from "../context.mjs";
import * as styles from "./styles.mjs";
import { useCx } from "../../utils/hooks/index.mjs";
import Tooltip from "../../tooltip/index.mjs";
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
var {
  ButtonContentView,
  LabelView
} = styles;
var WithToolTip = ({
  showTooltip,
  text,
  children
}) => {
  if (showTooltip && text) {
    return /* @__PURE__ */ _jsx(Tooltip, {
      text,
      placement: "top",
      children
    });
  }
  return /* @__PURE__ */ _jsx(_Fragment, {
    children
  });
};
function ToggleGroupControlOptionBase(props, forwardedRef) {
  const toggleGroupControlContext = useToggleGroupControlContext();
  const id = useInstanceId(ToggleGroupControlOptionBase, toggleGroupControlContext.baseId || "toggle-group-control-option-base");
  const buttonProps = useContextSystem({
    ...props,
    id
  }, "ToggleGroupControlOptionBase");
  const {
    isBlock = false,
    isDeselectable = false,
    size = "default"
  } = toggleGroupControlContext;
  const {
    className,
    isIcon = false,
    value,
    children,
    showTooltip = false,
    disabled,
    ...otherButtonProps
  } = buttonProps;
  const isPressed = toggleGroupControlContext.value === value;
  const cx = useCx();
  const labelViewClasses = useMemo(() => cx(isBlock && styles.labelBlock), [cx, isBlock]);
  const itemClasses = useMemo(() => cx(styles.buttonView({
    isDeselectable,
    isIcon,
    isPressed,
    size
  }), className), [cx, isDeselectable, isIcon, isPressed, size, className]);
  const buttonOnClick = () => {
    if (isDeselectable && isPressed) {
      toggleGroupControlContext.setValue(void 0);
    } else {
      toggleGroupControlContext.setValue(value);
    }
  };
  const commonProps = {
    ...otherButtonProps,
    className: itemClasses,
    "data-value": value,
    ref: forwardedRef
  };
  const labelRef = useRef(null);
  useLayoutEffect(() => {
    if (isPressed && labelRef.current) {
      toggleGroupControlContext.setSelectedElement(labelRef.current);
    }
  }, [isPressed, toggleGroupControlContext]);
  return /* @__PURE__ */ _jsx(LabelView, {
    ref: labelRef,
    className: labelViewClasses,
    children: /* @__PURE__ */ _jsx(WithToolTip, {
      showTooltip,
      text: otherButtonProps["aria-label"],
      children: isDeselectable ? /* @__PURE__ */ _jsx("button", {
        ...commonProps,
        disabled,
        "aria-pressed": isPressed,
        type: "button",
        onClick: buttonOnClick,
        children: /* @__PURE__ */ _jsx(ButtonContentView, {
          children
        })
      }) : /* @__PURE__ */ _jsx(Ariakit.Radio, {
        disabled,
        onFocusVisible: () => {
          const selectedValueIsEmpty = toggleGroupControlContext.value === null || toggleGroupControlContext.value === "";
          if (!selectedValueIsEmpty || toggleGroupControlContext.activeItemIsNotFirstItem?.()) {
            toggleGroupControlContext.setValue(value);
          }
        },
        render: /* @__PURE__ */ _jsx("button", {
          type: "button",
          ...commonProps
        }),
        value,
        children: /* @__PURE__ */ _jsx(ButtonContentView, {
          children
        })
      })
    })
  });
}
var ConnectedToggleGroupControlOptionBase = contextConnect(ToggleGroupControlOptionBase, "ToggleGroupControlOptionBase");
var component_default = ConnectedToggleGroupControlOptionBase;
export {
  component_default as default
};
//# sourceMappingURL=component.mjs.map
