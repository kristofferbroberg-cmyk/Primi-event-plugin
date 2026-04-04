// packages/components/src/validated-form-controls/components/combobox-control.tsx
import { useMergeRefs } from "@wordpress/compose";
import { forwardRef, useEffect, useRef } from "@wordpress/element";
import { ControlWithError } from "../control-with-error.mjs";
import ComboboxControl from "../../combobox-control/index.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
var UnforwardedValidatedComboboxControl = ({
  required,
  customValidity,
  markWhenOptional,
  ...restProps
}, forwardedRef) => {
  const validityTargetRef = useRef(null);
  const mergedRefs = useMergeRefs([forwardedRef, validityTargetRef]);
  useEffect(() => {
    const input = validityTargetRef.current?.querySelector('input[role="combobox"]');
    if (input) {
      input.required = required ?? false;
    }
  }, [required]);
  return (
    // TODO: Bug - Missing value error is not cleared immediately on change, waits for blur.
    /* @__PURE__ */ _jsx(ControlWithError, {
      required,
      markWhenOptional,
      ref: mergedRefs,
      customValidity,
      getValidityTarget: () => validityTargetRef.current?.querySelector('input[role="combobox"]'),
      children: /* @__PURE__ */ _jsx(ComboboxControl, {
        __next40pxDefaultSize: true,
        ...restProps
      })
    })
  );
};
var ValidatedComboboxControl = forwardRef(UnforwardedValidatedComboboxControl);
ValidatedComboboxControl.displayName = "ValidatedComboboxControl";
export {
  ValidatedComboboxControl
};
//# sourceMappingURL=combobox-control.mjs.map
