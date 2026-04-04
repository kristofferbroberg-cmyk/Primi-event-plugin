// packages/components/src/theme/index.tsx
import { useMemo } from "@wordpress/element";
import { colorVariables, Wrapper } from "./styles.mjs";
import { generateThemeVariables } from "./color-algorithms.mjs";
import { useCx } from "../utils/index.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
function Theme({
  accent,
  background,
  className,
  ...props
}) {
  const cx = useCx();
  const classes = useMemo(() => cx(...colorVariables(generateThemeVariables({
    accent,
    background
  })), className), [accent, background, className, cx]);
  return /* @__PURE__ */ _jsx(Wrapper, {
    className: classes,
    ...props
  });
}
var theme_default = Theme;
export {
  theme_default as default
};
//# sourceMappingURL=index.mjs.map
