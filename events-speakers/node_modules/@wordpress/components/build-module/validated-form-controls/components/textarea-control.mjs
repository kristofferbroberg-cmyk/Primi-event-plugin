// packages/components/src/validated-form-controls/components/textarea-control.tsx
import { forwardRef, useRef } from "@wordpress/element";
import { useMergeRefs } from "@wordpress/compose";
import { ControlWithError } from "../control-with-error.mjs";
import TextareaControl from "../../textarea-control/index.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
var UnforwardedValidatedTextareaControl = ({
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
    children: /* @__PURE__ */ _jsx(TextareaControl, {
      ref: mergedRefs,
      ...restProps
    })
  });
};
var ValidatedTextareaControl = forwardRef(UnforwardedValidatedTextareaControl);
ValidatedTextareaControl.displayName = "ValidatedTextareaControl";
export {
  ValidatedTextareaControl
};
//# sourceMappingURL=textarea-control.mjs.map
