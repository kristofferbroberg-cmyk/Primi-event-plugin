// packages/components/src/validated-form-controls/components/checkbox-control.tsx
import { useMergeRefs } from "@wordpress/compose";
import { forwardRef, useRef } from "@wordpress/element";
import { ControlWithError } from "../control-with-error.mjs";
import CheckboxControl from "../../checkbox-control/index.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
var UnforwardedValidatedCheckboxControl = ({
  required,
  customValidity,
  markWhenOptional,
  ...restProps
}, forwardedRef) => {
  const validityTargetRef = useRef(null);
  const mergedRefs = useMergeRefs([forwardedRef, validityTargetRef]);
  return /* @__PURE__ */ _jsx(ControlWithError, {
    required,
    markWhenOptional,
    ref: mergedRefs,
    customValidity,
    getValidityTarget: () => validityTargetRef.current?.querySelector('input[type="checkbox"]'),
    children: /* @__PURE__ */ _jsx(
      CheckboxControl,
      {
        ...restProps
      }
    )
  });
};
var ValidatedCheckboxControl = forwardRef(UnforwardedValidatedCheckboxControl);
ValidatedCheckboxControl.displayName = "ValidatedCheckboxControl";
export {
  ValidatedCheckboxControl
};
//# sourceMappingURL=checkbox-control.mjs.map
