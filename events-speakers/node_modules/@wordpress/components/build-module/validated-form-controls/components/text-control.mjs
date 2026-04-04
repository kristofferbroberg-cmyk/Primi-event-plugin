// packages/components/src/validated-form-controls/components/text-control.tsx
import { useMergeRefs } from "@wordpress/compose";
import { forwardRef, useRef } from "@wordpress/element";
import { ControlWithError } from "../control-with-error.mjs";
import TextControl from "../../text-control/index.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
var UnforwardedValidatedTextControl = ({
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
    children: /* @__PURE__ */ _jsx(TextControl, {
      __next40pxDefaultSize: true,
      ref: mergedRefs,
      ...restProps
    })
  });
};
var ValidatedTextControl = forwardRef(UnforwardedValidatedTextControl);
ValidatedTextControl.displayName = "ValidatedTextControl";
export {
  ValidatedTextControl
};
//# sourceMappingURL=text-control.mjs.map
