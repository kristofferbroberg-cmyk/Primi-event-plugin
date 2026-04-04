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

// packages/components/src/border-box-control/border-box-control/hook.ts
var hook_exports = {};
__export(hook_exports, {
  useBorderBoxControl: () => useBorderBoxControl
});
module.exports = __toCommonJS(hook_exports);
var import_element = require("@wordpress/element");
var styles = __toESM(require("../styles.cjs"));
var import_utils = require("../utils.cjs");
var import_context = require("../../context/index.cjs");
var import_use_cx = require("../../utils/hooks/use-cx.cjs");
var import_deprecated_36px_size = require("../../utils/deprecated-36px-size.cjs");
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
  } = (0, import_context.useContextSystem)(props, "BorderBoxControl");
  (0, import_deprecated_36px_size.maybeWarnDeprecated36pxSize)({
    componentName: "BorderBoxControl",
    __next40pxDefaultSize,
    size
  });
  const computedSize = size === "default" && __next40pxDefaultSize ? "__unstable-large" : size;
  const mixedBorders = (0, import_utils.hasMixedBorders)(value);
  const splitBorders = (0, import_utils.hasSplitBorders)(value);
  const linkedValue = splitBorders ? (0, import_utils.getCommonBorder)(value) : value;
  const splitValue = splitBorders ? value : (0, import_utils.getSplitBorders)(value);
  const hasWidthValue = !isNaN(parseFloat(`${linkedValue?.width}`));
  const [isLinked, setIsLinked] = (0, import_element.useState)(!mixedBorders);
  const toggleLinked = () => setIsLinked(!isLinked);
  const onLinkedChange = (newBorder) => {
    if (!newBorder) {
      return onChange(void 0);
    }
    if (!mixedBorders || (0, import_utils.isCompleteBorder)(newBorder)) {
      return onChange((0, import_utils.isEmptyBorder)(newBorder) ? void 0 : newBorder);
    }
    const changes = (0, import_utils.getBorderDiff)(linkedValue, newBorder);
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
    if ((0, import_utils.hasMixedBorders)(updatedBorders)) {
      return onChange(updatedBorders);
    }
    const filteredResult = (0, import_utils.isEmptyBorder)(updatedBorders.top) ? void 0 : updatedBorders.top;
    onChange(filteredResult);
  };
  const onSplitChange = (newBorder, side) => {
    const updatedBorders = {
      ...splitValue,
      [side]: newBorder
    };
    if ((0, import_utils.hasMixedBorders)(updatedBorders)) {
      onChange(updatedBorders);
    } else {
      onChange(newBorder);
    }
  };
  const cx = (0, import_use_cx.useCx)();
  const classes = (0, import_element.useMemo)(() => {
    return cx(styles.borderBoxControl, className);
  }, [cx, className]);
  const linkedControlClassName = (0, import_element.useMemo)(() => {
    return cx(styles.linkedBorderControl());
  }, [cx]);
  const wrapperClassName = (0, import_element.useMemo)(() => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useBorderBoxControl
});
//# sourceMappingURL=hook.cjs.map
