// packages/components/src/progress-bar/index.tsx
import { __ } from "@wordpress/i18n";
import { forwardRef } from "@wordpress/element";
import * as ProgressBarStyled from "./styles.mjs";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function UnforwardedProgressBar(props, ref) {
  const {
    className,
    value,
    ...progressProps
  } = props;
  const isIndeterminate = !Number.isFinite(value);
  return /* @__PURE__ */ _jsxs(ProgressBarStyled.Track, {
    className,
    children: [/* @__PURE__ */ _jsx(ProgressBarStyled.Indicator, {
      style: {
        "--indicator-width": !isIndeterminate ? `${value}%` : void 0
      },
      isIndeterminate
    }), /* @__PURE__ */ _jsx(ProgressBarStyled.ProgressElement, {
      max: 100,
      value,
      "aria-label": __("Loading \u2026"),
      ref,
      ...progressProps
    })]
  });
}
var ProgressBar = forwardRef(UnforwardedProgressBar);
ProgressBar.displayName = "ProgressBar";
var progress_bar_default = ProgressBar;
export {
  ProgressBar,
  progress_bar_default as default
};
//# sourceMappingURL=index.mjs.map
