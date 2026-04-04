// packages/components/src/border-box-control/border-box-control-visualizer/hook.ts
import { useMemo } from "@wordpress/element";
import * as styles from "../styles.mjs";
import { useContextSystem } from "../../context/index.mjs";
import { useCx } from "../../utils/index.mjs";
function useBorderBoxControlVisualizer(props) {
  const {
    className,
    value,
    size = "default",
    ...otherProps
  } = useContextSystem(props, "BorderBoxControlVisualizer");
  const cx = useCx();
  const classes = useMemo(() => {
    return cx(styles.borderBoxControlVisualizer(value, size), className);
  }, [cx, className, value, size]);
  return {
    ...otherProps,
    className: classes,
    value
  };
}
export {
  useBorderBoxControlVisualizer
};
//# sourceMappingURL=hook.mjs.map
