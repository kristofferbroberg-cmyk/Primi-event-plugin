// packages/components/src/border-box-control/border-box-control-split-controls/hook.ts
import { useMemo } from "@wordpress/element";
import * as styles from "../styles.mjs";
import { useContextSystem } from "../../context/index.mjs";
import { useCx } from "../../utils/index.mjs";
function useBorderBoxControlSplitControls(props) {
  const {
    className,
    colors = [],
    enableAlpha = false,
    enableStyle = true,
    size = "default",
    __experimentalIsRenderedInSidebar = false,
    ...otherProps
  } = useContextSystem(props, "BorderBoxControlSplitControls");
  const cx = useCx();
  const classes = useMemo(() => {
    return cx(styles.borderBoxControlSplitControls(size), className);
  }, [cx, className, size]);
  const centeredClassName = useMemo(() => {
    return cx(styles.centeredBorderControl, className);
  }, [cx, className]);
  const rightAlignedClassName = useMemo(() => {
    return cx(styles.rightBorderControl(), className);
  }, [cx, className]);
  return {
    ...otherProps,
    centeredClassName,
    className: classes,
    colors,
    enableAlpha,
    enableStyle,
    rightAlignedClassName,
    size,
    __experimentalIsRenderedInSidebar
  };
}
export {
  useBorderBoxControlSplitControls
};
//# sourceMappingURL=hook.mjs.map
