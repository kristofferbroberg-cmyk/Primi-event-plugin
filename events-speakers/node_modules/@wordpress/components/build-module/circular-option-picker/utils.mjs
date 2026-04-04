// packages/components/src/circular-option-picker/utils.tsx
import { __ } from "@wordpress/i18n";
function getComputeCircularOptionPickerCommonProps(asButtons, loop, ariaLabel, ariaLabelledby) {
  const metaProps = asButtons ? {
    asButtons: true
  } : {
    asButtons: false,
    loop
  };
  const labelProps = {
    "aria-labelledby": ariaLabelledby,
    "aria-label": ariaLabelledby ? void 0 : ariaLabel || __("Custom color picker")
  };
  return {
    metaProps,
    labelProps
  };
}
export {
  getComputeCircularOptionPickerCommonProps
};
//# sourceMappingURL=utils.mjs.map
