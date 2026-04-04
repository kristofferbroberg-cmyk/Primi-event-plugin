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

// packages/components/src/tools-panel/tools-panel/hook.ts
var hook_exports = {};
__export(hook_exports, {
  useToolsPanel: () => useToolsPanel
});
module.exports = __toCommonJS(hook_exports);
var import_element = require("@wordpress/element");
var styles = __toESM(require("../styles.cjs"));
var import_context = require("../../context/index.cjs");
var import_use_cx = require("../../utils/hooks/use-cx.cjs");
var DEFAULT_COLUMNS = 2;
function emptyMenuItems() {
  return {
    default: {},
    optional: {}
  };
}
function emptyState() {
  return {
    panelItems: [],
    menuItemOrder: [],
    menuItems: emptyMenuItems()
  };
}
var generateMenuItems = ({
  panelItems,
  shouldReset,
  currentMenuItems,
  menuItemOrder
}) => {
  const newMenuItems = emptyMenuItems();
  const menuItems = emptyMenuItems();
  panelItems.forEach(({
    hasValue,
    isShownByDefault,
    label
  }) => {
    const group = isShownByDefault ? "default" : "optional";
    const existingItemValue = currentMenuItems?.[group]?.[label];
    const value = existingItemValue ? existingItemValue : hasValue();
    newMenuItems[group][label] = shouldReset ? false : value;
  });
  menuItemOrder.forEach((key) => {
    if (newMenuItems.default.hasOwnProperty(key)) {
      menuItems.default[key] = newMenuItems.default[key];
    }
    if (newMenuItems.optional.hasOwnProperty(key)) {
      menuItems.optional[key] = newMenuItems.optional[key];
    }
  });
  Object.keys(newMenuItems.default).forEach((key) => {
    if (!menuItems.default.hasOwnProperty(key)) {
      menuItems.default[key] = newMenuItems.default[key];
    }
  });
  Object.keys(newMenuItems.optional).forEach((key) => {
    if (!menuItems.optional.hasOwnProperty(key)) {
      menuItems.optional[key] = newMenuItems.optional[key];
    }
  });
  return menuItems;
};
function panelItemsReducer(panelItems, action) {
  switch (action.type) {
    case "REGISTER_PANEL": {
      const newItems = [...panelItems];
      const existingIndex = newItems.findIndex((oldItem) => oldItem.label === action.item.label);
      if (existingIndex !== -1) {
        newItems.splice(existingIndex, 1);
      }
      newItems.push(action.item);
      return newItems;
    }
    case "UNREGISTER_PANEL": {
      const index = panelItems.findIndex((item) => item.label === action.label);
      if (index !== -1) {
        const newItems = [...panelItems];
        newItems.splice(index, 1);
        return newItems;
      }
      return panelItems;
    }
    default:
      return panelItems;
  }
}
function menuItemOrderReducer(menuItemOrder, action) {
  switch (action.type) {
    case "REGISTER_PANEL": {
      if (menuItemOrder.includes(action.item.label)) {
        return menuItemOrder;
      }
      return [...menuItemOrder, action.item.label];
    }
    default:
      return menuItemOrder;
  }
}
function menuItemsReducer(state, action) {
  switch (action.type) {
    case "REGISTER_PANEL":
    case "UNREGISTER_PANEL":
      return generateMenuItems({
        currentMenuItems: state.menuItems,
        panelItems: state.panelItems,
        menuItemOrder: state.menuItemOrder,
        shouldReset: false
      });
    case "RESET_ALL":
      return generateMenuItems({
        panelItems: state.panelItems,
        menuItemOrder: state.menuItemOrder,
        shouldReset: true
      });
    case "UPDATE_VALUE": {
      const oldValue = state.menuItems[action.group][action.label];
      if (action.value === oldValue) {
        return state.menuItems;
      }
      return {
        ...state.menuItems,
        [action.group]: {
          ...state.menuItems[action.group],
          [action.label]: action.value
        }
      };
    }
    case "TOGGLE_VALUE": {
      const currentItem = state.panelItems.find((item) => item.label === action.label);
      if (!currentItem) {
        return state.menuItems;
      }
      const menuGroup = currentItem.isShownByDefault ? "default" : "optional";
      const newMenuItems = {
        ...state.menuItems,
        [menuGroup]: {
          ...state.menuItems[menuGroup],
          [action.label]: !state.menuItems[menuGroup][action.label]
        }
      };
      return newMenuItems;
    }
    default:
      return state.menuItems;
  }
}
function panelReducer(state, action) {
  const panelItems = panelItemsReducer(state.panelItems, action);
  const menuItemOrder = menuItemOrderReducer(state.menuItemOrder, action);
  const menuItems = menuItemsReducer({
    panelItems,
    menuItemOrder,
    menuItems: state.menuItems
  }, action);
  return {
    panelItems,
    menuItemOrder,
    menuItems
  };
}
function resetAllFiltersReducer(filters, action) {
  switch (action.type) {
    case "REGISTER":
      return [...filters, action.filter];
    case "UNREGISTER":
      return filters.filter((f) => f !== action.filter);
    default:
      return filters;
  }
}
var isMenuItemTypeEmpty = (obj) => Object.keys(obj).length === 0;
function useToolsPanel(props) {
  const {
    className,
    headingLevel = 2,
    resetAll,
    panelId,
    hasInnerWrapper = false,
    shouldRenderPlaceholderItems = false,
    __experimentalFirstVisibleItemClass,
    __experimentalLastVisibleItemClass,
    ...otherProps
  } = (0, import_context.useContextSystem)(props, "ToolsPanel");
  const isResettingRef = (0, import_element.useRef)(false);
  const wasResetting = isResettingRef.current;
  (0, import_element.useEffect)(() => {
    if (wasResetting) {
      isResettingRef.current = false;
    }
  }, [wasResetting]);
  const [{
    panelItems,
    menuItems
  }, panelDispatch] = (0, import_element.useReducer)(panelReducer, void 0, emptyState);
  const [resetAllFilters, dispatchResetAllFilters] = (0, import_element.useReducer)(resetAllFiltersReducer, []);
  const registerPanelItem = (0, import_element.useCallback)((item) => {
    panelDispatch({
      type: "REGISTER_PANEL",
      item
    });
  }, []);
  const deregisterPanelItem = (0, import_element.useCallback)((label) => {
    panelDispatch({
      type: "UNREGISTER_PANEL",
      label
    });
  }, []);
  const registerResetAllFilter = (0, import_element.useCallback)((filter) => {
    dispatchResetAllFilters({
      type: "REGISTER",
      filter
    });
  }, []);
  const deregisterResetAllFilter = (0, import_element.useCallback)((filter) => {
    dispatchResetAllFilters({
      type: "UNREGISTER",
      filter
    });
  }, []);
  const flagItemCustomization = (0, import_element.useCallback)((value, label, group = "default") => {
    panelDispatch({
      type: "UPDATE_VALUE",
      group,
      label,
      value
    });
  }, []);
  const areAllOptionalControlsHidden = (0, import_element.useMemo)(() => {
    return isMenuItemTypeEmpty(menuItems.default) && !isMenuItemTypeEmpty(menuItems.optional) && Object.values(menuItems.optional).every((isSelected) => !isSelected);
  }, [menuItems]);
  const cx = (0, import_use_cx.useCx)();
  const classes = (0, import_element.useMemo)(() => {
    const wrapperStyle = hasInnerWrapper && styles.ToolsPanelWithInnerWrapper(DEFAULT_COLUMNS);
    const emptyStyle = areAllOptionalControlsHidden && styles.ToolsPanelHiddenInnerWrapper;
    return cx(styles.ToolsPanel(DEFAULT_COLUMNS), wrapperStyle, emptyStyle, className);
  }, [areAllOptionalControlsHidden, className, cx, hasInnerWrapper]);
  const toggleItem = (0, import_element.useCallback)((label) => {
    panelDispatch({
      type: "TOGGLE_VALUE",
      label
    });
  }, []);
  const resetAllItems = (0, import_element.useCallback)(() => {
    if (typeof resetAll === "function") {
      isResettingRef.current = true;
      resetAll(resetAllFilters);
    }
    panelDispatch({
      type: "RESET_ALL"
    });
  }, [resetAllFilters, resetAll]);
  const getFirstVisibleItemLabel = (items) => {
    const optionalItems = menuItems.optional || {};
    const firstItem = items.find((item) => item.isShownByDefault || optionalItems[item.label]);
    return firstItem?.label;
  };
  const firstDisplayedItem = getFirstVisibleItemLabel(panelItems);
  const lastDisplayedItem = getFirstVisibleItemLabel([...panelItems].reverse());
  const hasMenuItems = panelItems.length > 0;
  const panelContext = (0, import_element.useMemo)(() => ({
    areAllOptionalControlsHidden,
    deregisterPanelItem,
    deregisterResetAllFilter,
    firstDisplayedItem,
    flagItemCustomization,
    hasMenuItems,
    isResetting: isResettingRef.current,
    lastDisplayedItem,
    menuItems,
    panelId,
    registerPanelItem,
    registerResetAllFilter,
    shouldRenderPlaceholderItems,
    __experimentalFirstVisibleItemClass,
    __experimentalLastVisibleItemClass
  }), [areAllOptionalControlsHidden, deregisterPanelItem, deregisterResetAllFilter, firstDisplayedItem, flagItemCustomization, lastDisplayedItem, menuItems, panelId, hasMenuItems, registerResetAllFilter, registerPanelItem, shouldRenderPlaceholderItems, __experimentalFirstVisibleItemClass, __experimentalLastVisibleItemClass]);
  return {
    ...otherProps,
    headingLevel,
    panelContext,
    resetAllItems,
    toggleItem,
    className: classes
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useToolsPanel
});
//# sourceMappingURL=hook.cjs.map
