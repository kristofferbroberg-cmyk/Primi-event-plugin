"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/components/src/border-control/border-control/hook.ts
var hook_exports = {};
__export(hook_exports, {
  useBorderControl: () => useBorderControl
});
module.exports = __toCommonJS(hook_exports);
var import_element = require("@wordpress/element");
var styles = __toESM(require("../styles.cjs"));
var import_utils = require("../../unit-control/utils.cjs");
var import_context = require("../../context/index.cjs");
var import_use_cx = require("../../utils/hooks/use-cx.cjs");
var import_deprecated_36px_size = require("../../utils/deprecated-36px-size.cjs");
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
  } = (0, import_context.useContextSystem)(props, "BorderControl");
  (0, import_deprecated_36px_size.maybeWarnDeprecated36pxSize)({
    componentName: "BorderControl",
    __next40pxDefaultSize,
    size,
    __shouldNotWarnDeprecated36pxSize
  });
  const computedSize = size === "default" && __next40pxDefaultSize ? "__unstable-large" : size;
  const [widthValue, originalWidthUnit] = (0, import_utils.parseQuantityAndUnitFromRawValue)(border?.width);
  const widthUnit = originalWidthUnit || "px";
  const hadPreviousZeroWidth = widthValue === 0;
  const [colorSelection, setColorSelection] = (0, import_element.useState)();
  const [styleSelection, setStyleSelection] = (0, import_element.useState)();
  const isStyleSettable = shouldSanitizeBorder ? isValidBorder(border) : true;
  const onBorderChange = (0, import_element.useCallback)((newBorder) => {
    if (shouldSanitizeBorder && !isValidBorder(newBorder)) {
      onChange(void 0);
      return;
    }
    onChange(newBorder);
  }, [onChange, shouldSanitizeBorder]);
  const onWidthChange = (0, import_element.useCallback)((newWidth) => {
    const newWidthValue = newWidth === "" ? void 0 : newWidth;
    const [parsedValue] = (0, import_utils.parseQuantityAndUnitFromRawValue)(newWidth);
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
  const onSliderChange = (0, import_element.useCallback)((value) => {
    onWidthChange(`${value}${widthUnit}`);
  }, [onWidthChange, widthUnit]);
  const cx = (0, import_use_cx.useCx)();
  const classes = (0, import_element.useMemo)(() => {
    return cx(styles.borderControl, className);
  }, [className, cx]);
  let wrapperWidth2 = width;
  if (isCompact) {
    wrapperWidth2 = size === "__unstable-large" ? "116px" : "90px";
  }
  const innerWrapperClassName = (0, import_element.useMemo)(() => {
    const widthStyle = !!wrapperWidth2 && styles.wrapperWidth;
    const heightStyle = styles.wrapperHeight(computedSize);
    return cx(styles.innerWrapper(), widthStyle, heightStyle);
  }, [wrapperWidth2, cx, computedSize]);
  const sliderClassName = (0, import_element.useMemo)(() => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useBorderControl
});
//# sourceMappingURL=hook.cjs.map
