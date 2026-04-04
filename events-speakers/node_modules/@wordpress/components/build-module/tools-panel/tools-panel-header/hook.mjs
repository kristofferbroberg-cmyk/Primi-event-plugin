// packages/components/src/tools-panel/tools-panel-header/hook.ts
import { useMemo } from "@wordpress/element";
import * as styles from "../styles.mjs";
import { useToolsPanelContext } from "../context.mjs";
import { useContextSystem } from "../../context/index.mjs";
import { useCx } from "../../utils/hooks/use-cx.mjs";
function useToolsPanelHeader(props) {
  const {
    className,
    headingLevel = 2,
    ...otherProps
  } = useContextSystem(props, "ToolsPanelHeader");
  const cx = useCx();
  const classes = useMemo(() => {
    return cx(styles.ToolsPanelHeader, className);
  }, [className, cx]);
  const dropdownMenuClassName = useMemo(() => {
    return cx(styles.DropdownMenu);
  }, [cx]);
  const headingClassName = useMemo(() => {
    return cx(styles.ToolsPanelHeading);
  }, [cx]);
  const defaultControlsItemClassName = useMemo(() => {
    return cx(styles.DefaultControlsItem);
  }, [cx]);
  const {
    menuItems,
    hasMenuItems,
    areAllOptionalControlsHidden
  } = useToolsPanelContext();
  return {
    ...otherProps,
    areAllOptionalControlsHidden,
    defaultControlsItemClassName,
    dropdownMenuClassName,
    hasMenuItems,
    headingClassName,
    headingLevel,
    menuItems,
    className: classes
  };
}
export {
  useToolsPanelHeader
};
//# sourceMappingURL=hook.mjs.map
