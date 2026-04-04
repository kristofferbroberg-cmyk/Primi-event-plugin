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

// packages/components/src/border-box-control/border-box-control-split-controls/hook.ts
var hook_exports = {};
__export(hook_exports, {
  useBorderBoxControlSplitControls: () => useBorderBoxControlSplitControls
});
module.exports = __toCommonJS(hook_exports);
var import_element = require("@wordpress/element");
var styles = __toESM(require("../styles.cjs"));
var import_context = require("../../context/index.cjs");
var import_utils = require("../../utils/index.cjs");
function useBorderBoxControlSplitControls(props) {
  const {
    className,
    colors = [],
    enableAlpha = false,
    enableStyle = true,
    size = "default",
    __experimentalIsRenderedInSidebar = false,
    ...otherProps
  } = (0, import_context.useContextSystem)(props, "BorderBoxControlSplitControls");
  const cx = (0, import_utils.useCx)();
  const classes = (0, import_element.useMemo)(() => {
    return cx(styles.borderBoxControlSplitControls(size), className);
  }, [cx, className, size]);
  const centeredClassName = (0, import_element.useMemo)(() => {
    return cx(styles.centeredBorderControl, className);
  }, [cx, className]);
  const rightAlignedClassName = (0, import_element.useMemo)(() => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useBorderBoxControlSplitControls
});
//# sourceMappingURL=hook.cjs.map
