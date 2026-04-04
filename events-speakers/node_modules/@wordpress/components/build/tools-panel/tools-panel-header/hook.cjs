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

// packages/components/src/tools-panel/tools-panel-header/hook.ts
var hook_exports = {};
__export(hook_exports, {
  useToolsPanelHeader: () => useToolsPanelHeader
});
module.exports = __toCommonJS(hook_exports);
var import_element = require("@wordpress/element");
var styles = __toESM(require("../styles.cjs"));
var import_context = require("../context.cjs");
var import_context2 = require("../../context/index.cjs");
var import_use_cx = require("../../utils/hooks/use-cx.cjs");
function useToolsPanelHeader(props) {
  const {
    className,
    headingLevel = 2,
    ...otherProps
  } = (0, import_context2.useContextSystem)(props, "ToolsPanelHeader");
  const cx = (0, import_use_cx.useCx)();
  const classes = (0, import_element.useMemo)(() => {
    return cx(styles.ToolsPanelHeader, className);
  }, [className, cx]);
  const dropdownMenuClassName = (0, import_element.useMemo)(() => {
    return cx(styles.DropdownMenu);
  }, [cx]);
  const headingClassName = (0, import_element.useMemo)(() => {
    return cx(styles.ToolsPanelHeading);
  }, [cx]);
  const defaultControlsItemClassName = (0, import_element.useMemo)(() => {
    return cx(styles.DefaultControlsItem);
  }, [cx]);
  const {
    menuItems,
    hasMenuItems,
    areAllOptionalControlsHidden
  } = (0, import_context.useToolsPanelContext)();
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useToolsPanelHeader
});
//# sourceMappingURL=hook.cjs.map
