"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/components/src/toggle-group-control/toggle-group-control-option-base/component.tsx
var component_exports = {};
__export(component_exports, {
  default: () => component_default
});
module.exports = __toCommonJS(component_exports);
var Ariakit = __toESM(require("@ariakit/react"));
var import_compose = require("@wordpress/compose");
var import_element = require("@wordpress/element");
var import_context = require("../../context/index.cjs");
var import_context2 = require("../context.cjs");
var styles = __toESM(require("./styles.cjs"));
var import_hooks = require("../../utils/hooks/index.cjs");
var import_tooltip = __toESM(require("../../tooltip/index.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
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
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_tooltip.default, {
      text,
      placement: "top",
      children
    });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
    children
  });
};
function ToggleGroupControlOptionBase(props, forwardedRef) {
  const toggleGroupControlContext = (0, import_context2.useToggleGroupControlContext)();
  const id = (0, import_compose.useInstanceId)(ToggleGroupControlOptionBase, toggleGroupControlContext.baseId || "toggle-group-control-option-base");
  const buttonProps = (0, import_context.useContextSystem)({
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
  const cx = (0, import_hooks.useCx)();
  const labelViewClasses = (0, import_element.useMemo)(() => cx(isBlock && styles.labelBlock), [cx, isBlock]);
  const itemClasses = (0, import_element.useMemo)(() => cx(styles.buttonView({
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
  const labelRef = (0, import_element.useRef)(null);
  (0, import_element.useLayoutEffect)(() => {
    if (isPressed && labelRef.current) {
      toggleGroupControlContext.setSelectedElement(labelRef.current);
    }
  }, [isPressed, toggleGroupControlContext]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabelView, {
    ref: labelRef,
    className: labelViewClasses,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithToolTip, {
      showTooltip,
      text: otherButtonProps["aria-label"],
      children: isDeselectable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
        ...commonProps,
        disabled,
        "aria-pressed": isPressed,
        type: "button",
        onClick: buttonOnClick,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonContentView, {
          children
        })
      }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ariakit.Radio, {
        disabled,
        onFocusVisible: () => {
          const selectedValueIsEmpty = toggleGroupControlContext.value === null || toggleGroupControlContext.value === "";
          if (!selectedValueIsEmpty || toggleGroupControlContext.activeItemIsNotFirstItem?.()) {
            toggleGroupControlContext.setValue(value);
          }
        },
        render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
          type: "button",
          ...commonProps
        }),
        value,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ButtonContentView, {
          children
        })
      })
    })
  });
}
var ConnectedToggleGroupControlOptionBase = (0, import_context.contextConnect)(ToggleGroupControlOptionBase, "ToggleGroupControlOptionBase");
var component_default = ConnectedToggleGroupControlOptionBase;
//# sourceMappingURL=component.cjs.map
