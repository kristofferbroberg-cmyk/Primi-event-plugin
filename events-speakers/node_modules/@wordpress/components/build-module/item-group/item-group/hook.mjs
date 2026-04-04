// packages/components/src/item-group/item-group/hook.ts
import { useContextSystem } from "../../context/index.mjs";
import * as styles from "../styles.mjs";
import { useCx } from "../../utils/hooks/use-cx.mjs";
function useItemGroup(props) {
  const {
    className,
    isBordered = false,
    isRounded = true,
    isSeparated = false,
    role = "list",
    ...otherProps
  } = useContextSystem(props, "ItemGroup");
  const cx = useCx();
  const classes = cx(isBordered && styles.bordered, isSeparated && styles.separated, isRounded && styles.rounded, className);
  return {
    isBordered,
    className: classes,
    role,
    isSeparated,
    ...otherProps
  };
}
export {
  useItemGroup
};
//# sourceMappingURL=hook.mjs.map
