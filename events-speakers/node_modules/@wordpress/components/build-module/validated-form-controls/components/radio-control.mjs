// packages/components/src/validated-form-controls/components/radio-control.tsx
import { useMergeRefs } from "@wordpress/compose";
import { forwardRef, useRef } from "@wordpress/element";
import { ControlWithError } from "../control-with-error.mjs";
import RadioControl from "../../radio-control/index.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
var UnforwardedValidatedRadioControl = ({
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
    getValidityTarget: () => validityTargetRef.current?.querySelector('input[type="radio"]'),
    children: /* @__PURE__ */ _jsx(RadioControl, {
      ...restProps
    })
  });
};
var ValidatedRadioControl = forwardRef(UnforwardedValidatedRadioControl);
ValidatedRadioControl.displayName = "ValidatedRadioControl";
export {
  ValidatedRadioControl
};
//# sourceMappingURL=radio-control.mjs.map
