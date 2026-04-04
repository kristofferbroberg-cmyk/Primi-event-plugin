// packages/components/src/item-group/item/hook.ts
import { useMemo } from "@wordpress/element";
import { useContextSystem } from "../../context/index.mjs";
import * as styles from "../styles.mjs";
import { useItemGroupContext } from "../context.mjs";
import { useCx } from "../../utils/hooks/use-cx.mjs";
function useItem(props) {
  const {
    as: asProp,
    className,
    onClick,
    role = "listitem",
    size: sizeProp,
    ...otherProps
  } = useContextSystem(props, "Item");
  const {
    spacedAround: spacedAround2,
    size: contextSize
  } = useItemGroupContext();
  const size = sizeProp || contextSize;
  const as = asProp || (typeof onClick !== "undefined" ? "button" : "div");
  const cx = useCx();
  const classes = useMemo(() => cx((as === "button" || as === "a") && styles.unstyledButton(as), styles.itemSizes[size] || styles.itemSizes.medium, styles.item, spacedAround2 && styles.spacedAround, className), [as, className, cx, size, spacedAround2]);
  const wrapperClassName = cx(styles.itemWrapper);
  return {
    as,
    className: classes,
    onClick,
    wrapperClassName,
    role,
    ...otherProps
  };
}
export {
  useItem
};
//# sourceMappingURL=hook.mjs.map
