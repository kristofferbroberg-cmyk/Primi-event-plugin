// packages/components/src/border-control/border-control/hook.ts
import { useCallback, useMemo, useState } from "@wordpress/element";
import * as styles from "../styles.mjs";
import { parseQuantityAndUnitFromRawValue } from "../../unit-control/utils.mjs";
import { useContextSystem } from "../../context/index.mjs";
import { useCx } from "../../utils/hooks/use-cx.mjs";
import { maybeWarnDeprecated36pxSize } from "../../utils/deprecated-36px-size.mjs";
var isValidBorder = (border) => {
  const hasWidth = border?.width !== void 0 && border.width !== "";
  const hasColor = border?.color !== void 0;
  return hasWidth || hasColor;
};
function useBorderControl(props) {
  const {
    className,
    colors = [],
    isCompact,
    onChange,
    enableAlpha = true,
    enableStyle = true,
    shouldSanitizeBorder = true,
    size = "default",
    value: border,
    width,
    __experimentalIsRenderedInSidebar = false,
    __next40pxDefaultSize,
    __shouldNotWarnDeprecated36pxSize,
    ...otherProps
  } = useContextSystem(props, "BorderControl");
  maybeWarnDeprecated36pxSize({
    componentName: "BorderControl",
    __next40pxDefaultSize,
    size,
    __shouldNotWarnDeprecated36pxSize
  });
  const computedSize = size === "default" && __next40pxDefaultSize ? "__unstable-large" : size;
  const [widthValue, originalWidthUnit] = parseQuantityAndUnitFromRawValue(border?.width);
  const widthUnit = originalWidthUnit || "px";
  const hadPreviousZeroWidth = widthValue === 0;
  const [colorSelection, setColorSelection] = useState();
  const [styleSelection, setStyleSelection] = useState();
  const isStyleSettable = shouldSanitizeBorder ? isValidBorder(border) : true;
  const onBorderChange = useCallback((newBorder) => {
    if (shouldSanitizeBorder && !isValidBorder(newBorder)) {
      onChange(void 0);
      return;
    }
    onChange(newBorder);
  }, [onChange, shouldSanitizeBorder]);
  const onWidthChange = useCallback((newWidth) => {
    const newWidthValue = newWidth === "" ? void 0 : newWidth;
    const [parsedValue] = parseQuantityAndUnitFromRawValue(newWidth);
    const hasZeroWidth = parsedValue === 0;
    const updatedBorder = {
      ...border,
      width: newWidthValue
    };
    if (hasZeroWidth && !hadPreviousZeroWidth) {
      setColorSelection(border?.color);
      setStyleSelection(border?.style);
      updatedBorder.color = void 0;
      updatedBorder.style = "none";
    }
    if (!hasZeroWidth && hadPreviousZeroWidth) {
      if (updatedBorder.color === void 0) {
        updatedBorder.color = colorSelection;
      }
      if (updatedBorder.style === "none") {
        updatedBorder.style = styleSelection;
      }
    }
    onBorderChange(updatedBorder);
  }, [border, hadPreviousZeroWidth, colorSelection, styleSelection, onBorderChange]);
  const onSliderChange = useCallback((value) => {
    onWidthChange(`${value}${widthUnit}`);
  }, [onWidthChange, widthUnit]);
  const cx = useCx();
  const classes = useMemo(() => {
    return cx(styles.borderControl, className);
  }, [className, cx]);
  let wrapperWidth2 = width;
  if (isCompact) {
    wrapperWidth2 = size === "__unstable-large" ? "116px" : "90px";
  }
  const innerWrapperClassName = useMemo(() => {
    const widthStyle = !!wrapperWidth2 && styles.wrapperWidth;
    const heightStyle = styles.wrapperHeight(computedSize);
    return cx(styles.innerWrapper(), widthStyle, heightStyle);
  }, [wrapperWidth2, cx, computedSize]);
  const sliderClassName = useMemo(() => {
    return cx(styles.borderSlider());
  }, [cx]);
  return {
    ...otherProps,
    className: classes,
    colors,
    enableAlpha,
    enableStyle,
    innerWrapperClassName,
    inputWidth: wrapperWidth2,
    isStyleSettable,
    onBorderChange,
    onSliderChange,
    onWidthChange,
    previousStyleSelection: styleSelection,
    sliderClassName,
    value: border,
    widthUnit,
    widthValue,
    size: computedSize,
    __experimentalIsRenderedInSidebar,
    __next40pxDefaultSize
  };
}
export {
  useBorderControl
};
//# sourceMappingURL=hook.mjs.map
