// packages/components/src/validated-form-controls/components/number-control.tsx
import { forwardRef, useRef } from "@wordpress/element";
import { useMergeRefs } from "@wordpress/compose";
import { ControlWithError } from "../control-with-error.mjs";
import NumberControl from "../../number-control/index.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
var UnforwardedValidatedNumberControl = ({
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
    children: /* @__PURE__ */ _jsx(NumberControl, {
      __next40pxDefaultSize: true,
      ref: mergedRefs,
      ...restProps
    })
  });
};
var ValidatedNumberControl = forwardRef(UnforwardedValidatedNumberControl);
ValidatedNumberControl.displayName = "ValidatedNumberControl";
export {
  ValidatedNumberControl
};
//# sourceMappingURL=number-control.mjs.map
