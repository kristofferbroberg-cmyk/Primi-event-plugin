// packages/components/src/scrollable/hook.ts
import { useMemo } from "@wordpress/element";
import { useContextSystem } from "../context/index.mjs";
import * as styles from "./styles.mjs";
import { useCx } from "../utils/hooks/use-cx.mjs";
function useScrollable(props) {
  const {
    className,
    scrollDirection = "y",
    smoothScroll: smoothScroll2 = false,
    ...otherProps
  } = useContextSystem(props, "Scrollable");
  const cx = useCx();
  const classes = useMemo(() => cx(styles.Scrollable, styles.scrollableScrollbar, smoothScroll2 && styles.smoothScroll, scrollDirection === "x" && styles.scrollX, scrollDirection === "y" && styles.scrollY, scrollDirection === "auto" && styles.scrollAuto, className), [className, cx, scrollDirection, smoothScroll2]);
  return {
    ...otherProps,
    className: classes
  };
}
export {
  useScrollable
};
//# sourceMappingURL=hook.mjs.map
