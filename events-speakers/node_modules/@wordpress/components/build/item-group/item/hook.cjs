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

// packages/components/src/item-group/item/hook.ts
var hook_exports = {};
__export(hook_exports, {
  useItem: () => useItem
});
module.exports = __toCommonJS(hook_exports);
var import_element = require("@wordpress/element");
var import_context = require("../../context/index.cjs");
var styles = __toESM(require("../styles.cjs"));
var import_context2 = require("../context.cjs");
var import_use_cx = require("../../utils/hooks/use-cx.cjs");
function useItem(props) {
  const {
    as: asProp,
    className,
    onClick,
    role = "listitem",
    size: sizeProp,
    ...otherProps
  } = (0, import_context.useContextSystem)(props, "Item");
  const {
    spacedAround: spacedAround2,
    size: contextSize
  } = (0, import_context2.useItemGroupContext)();
  const size = sizeProp || contextSize;
  const as = asProp || (typeof onClick !== "undefined" ? "button" : "div");
  const cx = (0, import_use_cx.useCx)();
  const classes = (0, import_element.useMemo)(() => cx((as === "button" || as === "a") && styles.unstyledButton(as), styles.itemSizes[size] || styles.itemSizes.medium, styles.item, spacedAround2 && styles.spacedAround, className), [as, className, cx, size, spacedAround2]);
  const wrapperClassName = cx(styles.itemWrapper);
  return {
    as,
    className: classes,
    onClick,
    wrapperClassName,
    role,
    ...otherProps
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useItem
});
//# sourceMappingURL=hook.cjs.map
