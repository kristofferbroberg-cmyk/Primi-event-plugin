// packages/components/src/validated-form-controls/components/form-token-field.tsx
import { forwardRef, useRef } from "@wordpress/element";
import { ControlWithError } from "../control-with-error.mjs";
import { FormTokenField } from "../../form-token-field/index.mjs";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var UnforwardedValidatedFormTokenField = ({
  required,
  customValidity,
  markWhenOptional,
  ...restProps
}, forwardedRef) => {
  const validityTargetRef = useRef(null);
  return /* @__PURE__ */ _jsxs("div", {
    className: "components-validated-control__wrapper-with-error-delegate",
    ref: forwardedRef,
    children: [/* @__PURE__ */ _jsx(ControlWithError, {
      required,
      markWhenOptional,
      customValidity,
      getValidityTarget: () => validityTargetRef.current,
      children: /* @__PURE__ */ _jsx(FormTokenField, {
        __next40pxDefaultSize: true,
        ...restProps
      })
    }), /* @__PURE__ */ _jsx("input", {
      className: "components-validated-control__error-delegate",
      type: "text",
      ref: validityTargetRef,
      required,
      value: restProps.value && restProps.value.length > 0 ? "hasvalue" : "",
      tabIndex: -1,
      onChange: () => {
      },
      onFocus: (e) => {
        e.target.previousElementSibling?.querySelector('input[type="text"]')?.focus();
      }
    })]
  });
};
var ValidatedFormTokenField = forwardRef(UnforwardedValidatedFormTokenField);
ValidatedFormTokenField.displayName = "ValidatedFormTokenField";
export {
  ValidatedFormTokenField
};
//# sourceMappingURL=form-token-field.mjs.map
