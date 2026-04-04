// packages/components/src/validated-form-controls/components/input-control.tsx
import { forwardRef, useRef } from "@wordpress/element";
import { useMergeRefs } from "@wordpress/compose";
import { ControlWithError } from "../control-with-error.mjs";
import InputControl from "../../input-control/index.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
var UnforwardedValidatedInputControl = ({
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
    children: /* @__PURE__ */ _jsx(InputControl, {
      __next40pxDefaultSize: true,
      ref: mergedRefs,
      ...restProps
    })
  });
};
var ValidatedInputControl = forwardRef(UnforwardedValidatedInputControl);
ValidatedInputControl.displayName = "ValidatedInputControl";
export {
  ValidatedInputControl
};
//# sourceMappingURL=input-control.mjs.map
