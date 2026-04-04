// packages/components/src/color-picker/picker.tsx
import { HslColorPicker, HslaColorPicker } from "react-colorful";
import { jsx as _jsx } from "react/jsx-runtime";
var pointerCaptureProps = {
  onPointerDown({
    currentTarget,
    pointerId
  }) {
    currentTarget.setPointerCapture(pointerId);
  },
  onPointerUp({
    currentTarget,
    pointerId
  }) {
    currentTarget.releasePointerCapture(pointerId);
  }
};
var Picker = ({
  hsla,
  enableAlpha,
  onChange
}) => {
  if (enableAlpha) {
    return /* @__PURE__ */ _jsx(HslaColorPicker, {
      color: hsla,
      onChange,
      ...pointerCaptureProps
    });
  }
  return /* @__PURE__ */ _jsx(HslColorPicker, {
    color: hsla,
    onChange: (nextColor) => {
      onChange({
        ...nextColor,
        a: hsla.a
      });
    },
    ...pointerCaptureProps
  });
};
export {
  Picker
};
//# sourceMappingURL=picker.mjs.map
