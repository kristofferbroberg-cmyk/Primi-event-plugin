// packages/components/src/validated-form-controls/components/toggle-group-control.tsx
import { forwardRef, useId, useRef } from "@wordpress/element";
import { ControlWithError } from "../control-with-error.mjs";
import { ToggleGroupControl } from "../../toggle-group-control/index.mjs";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var UnforwardedValidatedToggleGroupControl = ({
  required,
  customValidity,
  markWhenOptional,
  ...restProps
}, forwardedRef) => {
  const validityTargetRef = useRef(null);
  const nameAttr = useId();
  return /* @__PURE__ */ _jsxs("div", {
    className: "components-validated-control__wrapper-with-error-delegate",
    children: [/* @__PURE__ */ _jsx(ControlWithError, {
      required,
      markWhenOptional,
      customValidity,
      getValidityTarget: () => validityTargetRef.current,
      children: /* @__PURE__ */ _jsx(ToggleGroupControl, {
        __next40pxDefaultSize: true,
        ref: forwardedRef,
        ...restProps
      })
    }), /* @__PURE__ */ _jsx("input", {
      className: "components-validated-control__error-delegate",
      type: "radio",
      ref: validityTargetRef,
      required,
      checked: restProps.value !== void 0,
      tabIndex: -1,
      name: nameAttr,
      onChange: () => {
      },
      onFocus: (e) => {
        e.target.previousElementSibling?.querySelector('[data-active-item="true"]')?.focus();
      }
    })]
  });
};
var ValidatedToggleGroupControl = forwardRef(UnforwardedValidatedToggleGroupControl);
ValidatedToggleGroupControl.displayName = "ValidatedToggleGroupControl";
export {
  ValidatedToggleGroupControl
};
//# sourceMappingURL=toggle-group-control.mjs.map
