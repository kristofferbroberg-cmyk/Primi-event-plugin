// packages/components/src/validated-form-controls/components/toggle-control.tsx
import { forwardRef, useRef } from "@wordpress/element";
import { useMergeRefs } from "@wordpress/compose";
import { ControlWithError } from "../control-with-error.mjs";
import ToggleControl from "../../toggle-control/index.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
var UnforwardedValidatedToggleControl = ({
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
    customValidity,
    getValidityTarget: () => validityTargetRef.current,
    children: /* @__PURE__ */ _jsx(ToggleControl, {
      ref: mergedRefs,
      required,
      ...restProps
    })
  });
};
var ValidatedToggleControl = forwardRef(UnforwardedValidatedToggleControl);
ValidatedToggleControl.displayName = "ValidatedToggleControl";
export {
  ValidatedToggleControl
};
//# sourceMappingURL=toggle-control.mjs.map
