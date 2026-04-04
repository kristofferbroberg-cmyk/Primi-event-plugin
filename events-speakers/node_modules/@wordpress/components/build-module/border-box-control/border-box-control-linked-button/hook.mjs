// packages/components/src/border-box-control/border-box-control-linked-button/hook.ts
import { useMemo } from "@wordpress/element";
import * as styles from "../styles.mjs";
import { useContextSystem } from "../../context/index.mjs";
import { useCx } from "../../utils/hooks/use-cx.mjs";
function useBorderBoxControlLinkedButton(props) {
  const {
    className,
    size = "default",
    ...otherProps
  } = useContextSystem(props, "BorderBoxControlLinkedButton");
  const cx = useCx();
  const classes = useMemo(() => {
    return cx(styles.borderBoxControlLinkedButton(size), className);
  }, [className, cx, size]);
  return {
    ...otherProps,
    className: classes
  };
}
export {
  useBorderBoxControlLinkedButton
};
//# sourceMappingURL=hook.mjs.map
