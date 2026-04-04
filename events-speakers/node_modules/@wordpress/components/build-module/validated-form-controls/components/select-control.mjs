// packages/components/src/validated-form-controls/components/select-control.tsx
import { forwardRef, useRef } from "@wordpress/element";
import { useMergeRefs } from "@wordpress/compose";
import { ControlWithError } from "../control-with-error.mjs";
import SelectControl from "../../select-control/index.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
var UnforwardedValidatedSelectControl = ({
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
    children: /* @__PURE__ */ _jsx(SelectControl, {
      __next40pxDefaultSize: true,
      ref: mergedRefs,
      ...restProps
    })
  });
};
var ValidatedSelectControl = forwardRef(UnforwardedValidatedSelectControl);
ValidatedSelectControl.displayName = "ValidatedSelectControl";
export {
  ValidatedSelectControl
};
//# sourceMappingURL=select-control.mjs.map
