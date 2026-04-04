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

// packages/components/src/tools-panel/tools-panel-item/hook.ts
var hook_exports = {};
__export(hook_exports, {
  useToolsPanelItem: () => useToolsPanelItem
});
module.exports = __toCommonJS(hook_exports);
var import_compose = require("@wordpress/compose");
var import_element = require("@wordpress/element");
var styles = __toESM(require("../styles.cjs"));
var import_context = require("../context.cjs");
var import_context2 = require("../../context/index.cjs");
var import_use_cx = require("../../utils/hooks/use-cx.cjs");
var noop = () => {
};
function useToolsPanelItem(props) {
  const {
    className,
    hasValue,
    isShownByDefault = false,
    label,
    panelId,
    resetAllFilter = noop,
    onDeselect,
    onSelect,
    ...otherProps
  } = (0, import_context2.useContextSystem)(props, "ToolsPanelItem");
  const {
    panelId: currentPanelId,
    menuItems,
    registerResetAllFilter,
    deregisterResetAllFilter,
    registerPanelItem,
    deregisterPanelItem,
    flagItemCustomization,
    isResetting,
    shouldRenderPlaceholderItems: shouldRenderPlaceholder,
    firstDisplayedItem,
    lastDisplayedItem,
    __experimentalFirstVisibleItemClass,
    __experimentalLastVisibleItemClass
  } = (0, import_context.useToolsPanelContext)();
  const hasValueCallback = (0, import_element.useCallback)(hasValue, [panelId]);
  const resetAllFilterCallback = (0, import_element.useCallback)(resetAllFilter, [panelId]);
  const previousPanelId = (0, import_compose.usePrevious)(currentPanelId);
  const hasMatchingPanel = currentPanelId === panelId || currentPanelId === null;
  (0, import_element.useLayoutEffect)(() => {
    if (hasMatchingPanel && previousPanelId !== null) {
      registerPanelItem({
        hasValue: hasValueCallback,
        isShownByDefault,
        label,
        panelId
      });
    }
    return () => {
      if (previousPanelId === null && !!currentPanelId || currentPanelId === panelId) {
        deregisterPanelItem(label);
      }
    };
  }, [currentPanelId, hasMatchingPanel, isShownByDefault, label, hasValueCallback, panelId, previousPanelId, registerPanelItem, deregisterPanelItem]);
  (0, import_element.useEffect)(() => {
    if (hasMatchingPanel) {
      registerResetAllFilter(resetAllFilterCallback);
    }
    return () => {
      if (hasMatchingPanel) {
        deregisterResetAllFilter(resetAllFilterCallback);
      }
    };
  }, [registerResetAllFilter, deregisterResetAllFilter, resetAllFilterCallback, hasMatchingPanel]);
  const menuGroup = isShownByDefault ? "default" : "optional";
  const isMenuItemChecked = menuItems?.[menuGroup]?.[label];
  const wasMenuItemChecked = (0, import_compose.usePrevious)(isMenuItemChecked);
  const isRegistered = menuItems?.[menuGroup]?.[label] !== void 0;
  const isValueSet = hasValue();
  (0, import_element.useEffect)(() => {
    if (!isShownByDefault && !isValueSet) {
      return;
    }
    flagItemCustomization(isValueSet, label, menuGroup);
  }, [isValueSet, menuGroup, label, flagItemCustomization, isShownByDefault]);
  (0, import_element.useEffect)(() => {
    if (!isRegistered || isResetting || !hasMatchingPanel) {
      return;
    }
    if (isMenuItemChecked && !isValueSet && !wasMenuItemChecked) {
      onSelect?.();
    }
    if (!isMenuItemChecked && isValueSet && wasMenuItemChecked) {
      onDeselect?.();
    }
  }, [hasMatchingPanel, isMenuItemChecked, isRegistered, isResetting, isValueSet, wasMenuItemChecked, onSelect, onDeselect]);
  const isShown = isShownByDefault ? menuItems?.[menuGroup]?.[label] !== void 0 : isMenuItemChecked;
  const cx = (0, import_use_cx.useCx)();
  const classes = (0, import_element.useMemo)(() => {
    const shouldApplyPlaceholderStyles = shouldRenderPlaceholder && !isShown;
    const firstItemStyle = firstDisplayedItem === label && __experimentalFirstVisibleItemClass;
    const lastItemStyle = lastDisplayedItem === label && __experimentalLastVisibleItemClass;
    return cx(styles.ToolsPanelItem, shouldApplyPlaceholderStyles && styles.ToolsPanelItemPlaceholder, !shouldApplyPlaceholderStyles && className, firstItemStyle, lastItemStyle);
  }, [isShown, shouldRenderPlaceholder, className, cx, firstDisplayedItem, lastDisplayedItem, __experimentalFirstVisibleItemClass, __experimentalLastVisibleItemClass, label]);
  return {
    ...otherProps,
    isShown,
    shouldRenderPlaceholder,
    className: classes
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useToolsPanelItem
});
//# sourceMappingURL=hook.cjs.map
