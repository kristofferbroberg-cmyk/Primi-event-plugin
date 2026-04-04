// packages/components/src/card/card-footer/hook.ts
import { useMemo } from "@wordpress/element";
import { useContextSystem } from "../../context/index.mjs";
import * as styles from "../styles.mjs";
import { useCx } from "../../utils/hooks/use-cx.mjs";
import { getPaddingBySize } from "../get-padding-by-size.mjs";
function useCardFooter(props) {
  const {
    className,
    justify,
    isBorderless = false,
    isShady = false,
    size = "medium",
    ...otherProps
  } = useContextSystem(props, "CardFooter");
  const cx = useCx();
  const classes = useMemo(() => cx(
    styles.Footer,
    styles.borderRadius,
    styles.borderColor,
    getPaddingBySize(size),
    isBorderless && styles.borderless,
    isShady && styles.shady,
    // This classname is added for legacy compatibility reasons.
    "components-card__footer",
    className
  ), [className, cx, isBorderless, isShady, size]);
  return {
    ...otherProps,
    className: classes,
    justify
  };
}
export {
  useCardFooter
};
//# sourceMappingURL=hook.mjs.map
