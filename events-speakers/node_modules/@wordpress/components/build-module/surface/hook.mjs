// packages/components/src/surface/hook.ts
import { useMemo } from "@wordpress/element";
import { useContextSystem } from "../context/index.mjs";
import * as styles from "./styles.mjs";
import { useCx } from "../utils/hooks/use-cx.mjs";
function useSurface(props) {
  const {
    backgroundSize = 12,
    borderBottom = false,
    borderLeft = false,
    borderRight = false,
    borderTop = false,
    className,
    variant = "primary",
    ...otherProps
  } = useContextSystem(props, "Surface");
  const cx = useCx();
  const classes = useMemo(() => {
    const sx = {
      borders: styles.getBorders({
        borderBottom,
        borderLeft,
        borderRight,
        borderTop
      })
    };
    return cx(styles.Surface, sx.borders, styles.getVariant(variant, `${backgroundSize}px`, `${backgroundSize - 1}px`), className);
  }, [backgroundSize, borderBottom, borderLeft, borderRight, borderTop, className, cx, variant]);
  return {
    ...otherProps,
    className: classes
  };
}
export {
  useSurface
};
//# sourceMappingURL=hook.mjs.map
