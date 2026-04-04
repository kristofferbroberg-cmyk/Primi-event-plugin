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

// packages/components/src/border-control/border-control-dropdown/hook.ts
var hook_exports = {};
__export(hook_exports, {
  useBorderControlDropdown: () => useBorderControlDropdown
});
module.exports = __toCommonJS(hook_exports);
var import_element = require("@wordpress/element");
var styles = __toESM(require("../styles.cjs"));
var import_utils = require("../../unit-control/utils.cjs");
var import_context = require("../../context/index.cjs");
var import_use_cx = require("../../utils/hooks/use-cx.cjs");
function useBorderControlDropdown(props) {
  const {
    border,
    className,
    colors = [],
    enableAlpha = false,
    enableStyle = true,
    onChange,
    previousStyleSelection,
    size = "default",
    __experimentalIsRenderedInSidebar = false,
    ...otherProps
  } = (0, import_context.useContextSystem)(props, "BorderControlDropdown");
  const [widthValue] = (0, import_utils.parseQuantityAndUnitFromRawValue)(border?.width);
  const hasZeroWidth = widthValue === 0;
  const onColorChange = (color) => {
    const style = border?.style === "none" ? previousStyleSelection : border?.style;
    const width = hasZeroWidth && !!color ? "1px" : border?.width;
    onChange({
      color,
      style,
      width
    });
  };
  const onStyleChange = (style) => {
    const width = hasZeroWidth && !!style ? "1px" : border?.width;
    onChange({
      ...border,
      style,
      width
    });
  };
  const onReset = () => {
    onChange({
      ...border,
      color: void 0,
      style: void 0
    });
  };
  const cx = (0, import_use_cx.useCx)();
  const classes = (0, import_element.useMemo)(() => {
    return cx(styles.borderControlDropdown, className);
  }, [className, cx]);
  const indicatorClassName = (0, import_element.useMemo)(() => {
    return cx(styles.borderColorIndicator);
  }, [cx]);
  const indicatorWrapperClassName = (0, import_element.useMemo)(() => {
    return cx(styles.colorIndicatorWrapper(border, size));
  }, [border, cx, size]);
  const popoverControlsClassName = (0, import_element.useMemo)(() => {
    return cx(styles.borderControlPopoverControls);
  }, [cx]);
  const popoverContentClassName = (0, import_element.useMemo)(() => {
    return cx(styles.borderControlPopoverContent);
  }, [cx]);
  const resetButtonWrapperClassName = (0, import_element.useMemo)(() => {
    return cx(styles.resetButtonWrapper);
  }, [cx]);
  return {
    ...otherProps,
    border,
    className: classes,
    colors,
    enableAlpha,
    enableStyle,
    indicatorClassName,
    indicatorWrapperClassName,
    onColorChange,
    onStyleChange,
    onReset,
    popoverContentClassName,
    popoverControlsClassName,
    resetButtonWrapperClassName,
    size,
    __experimentalIsRenderedInSidebar
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useBorderControlDropdown
});
//# sourceMappingURL=hook.cjs.map
