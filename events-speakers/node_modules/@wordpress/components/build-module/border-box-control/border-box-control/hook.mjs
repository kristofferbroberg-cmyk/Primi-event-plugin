// packages/components/src/border-box-control/border-box-control/hook.ts
import { useMemo, useState } from "@wordpress/element";
import * as styles from "../styles.mjs";
import { getBorderDiff, getCommonBorder, getSplitBorders, hasMixedBorders, hasSplitBorders, isCompleteBorder, isEmptyBorder } from "../utils.mjs";
import { useContextSystem } from "../../context/index.mjs";
import { useCx } from "../../utils/hooks/use-cx.mjs";
import { maybeWarnDeprecated36pxSize } from "../../utils/deprecated-36px-size.mjs";
function useBorderBoxControl(props) {
  const {
    className,
    colors = [],
    onChange,
    enableAlpha = false,
    enableStyle = true,
    size = "default",
    value,
    __experimentalIsRenderedInSidebar = false,
    __next40pxDefaultSize,
    ...otherProps
  } = useContextSystem(props, "BorderBoxControl");
  maybeWarnDeprecated36pxSize({
    componentName: "BorderBoxControl",
    __next40pxDefaultSize,
    size
  });
  const computedSize = size === "default" && __next40pxDefaultSize ? "__unstable-large" : size;
  const mixedBorders = hasMixedBorders(value);
  const splitBorders = hasSplitBorders(value);
  const linkedValue = splitBorders ? getCommonBorder(value) : value;
  const splitValue = splitBorders ? value : getSplitBorders(value);
  const hasWidthValue = !isNaN(parseFloat(`${linkedValue?.width}`));
  const [isLinked, setIsLinked] = useState(!mixedBorders);
  const toggleLinked = () => setIsLinked(!isLinked);
  const onLinkedChange = (newBorder) => {
    if (!newBorder) {
      return onChange(void 0);
    }
    if (!mixedBorders || isCompleteBorder(newBorder)) {
      return onChange(isEmptyBorder(newBorder) ? void 0 : newBorder);
    }
    const changes = getBorderDiff(linkedValue, newBorder);
    const updatedBorders = {
      top: {
        ...value?.top,
        ...changes
      },
      right: {
        ...value?.right,
        ...changes
      },
      bottom: {
        ...value?.bottom,
        ...changes
      },
      left: {
        ...value?.left,
        ...changes
      }
    };
    if (hasMixedBorders(updatedBorders)) {
      return onChange(updatedBorders);
    }
    const filteredResult = isEmptyBorder(updatedBorders.top) ? void 0 : updatedBorders.top;
    onChange(filteredResult);
  };
  const onSplitChange = (newBorder, side) => {
    const updatedBorders = {
      ...splitValue,
      [side]: newBorder
    };
    if (hasMixedBorders(updatedBorders)) {
      onChange(updatedBorders);
    } else {
      onChange(newBorder);
    }
  };
  const cx = useCx();
  const classes = useMemo(() => {
    return cx(styles.borderBoxControl, className);
  }, [cx, className]);
  const linkedControlClassName = useMemo(() => {
    return cx(styles.linkedBorderControl());
  }, [cx]);
  const wrapperClassName = useMemo(() => {
    return cx(styles.wrapper);
  }, [cx]);
  return {
    ...otherProps,
    className: classes,
    colors,
    disableUnits: mixedBorders && !hasWidthValue,
    enableAlpha,
    enableStyle,
    hasMixedBorders: mixedBorders,
    isLinked,
    linkedControlClassName,
    onLinkedChange,
    onSplitChange,
    toggleLinked,
    linkedValue,
    size: computedSize,
    splitValue,
    wrapperClassName,
    __experimentalIsRenderedInSidebar
  };
}
export {
  useBorderBoxControl
};
//# sourceMappingURL=hook.mjs.map
