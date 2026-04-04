// packages/components/src/tools-panel/tools-panel-item/hook.ts
import { usePrevious } from "@wordpress/compose";
import { useCallback, useEffect, useLayoutEffect, useMemo } from "@wordpress/element";
import * as styles from "../styles.mjs";
import { useToolsPanelContext } from "../context.mjs";
import { useContextSystem } from "../../context/index.mjs";
import { useCx } from "../../utils/hooks/use-cx.mjs";
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
  } = useContextSystem(props, "ToolsPanelItem");
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
  } = useToolsPanelContext();
  const hasValueCallback = useCallback(hasValue, [panelId]);
  const resetAllFilterCallback = useCallback(resetAllFilter, [panelId]);
  const previousPanelId = usePrevious(currentPanelId);
  const hasMatchingPanel = currentPanelId === panelId || currentPanelId === null;
  useLayoutEffect(() => {
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
  useEffect(() => {
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
  const wasMenuItemChecked = usePrevious(isMenuItemChecked);
  const isRegistered = menuItems?.[menuGroup]?.[label] !== void 0;
  const isValueSet = hasValue();
  useEffect(() => {
    if (!isShownByDefault && !isValueSet) {
      return;
    }
    flagItemCustomization(isValueSet, label, menuGroup);
  }, [isValueSet, menuGroup, label, flagItemCustomization, isShownByDefault]);
  useEffect(() => {
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
  const cx = useCx();
  const classes = useMemo(() => {
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
export {
  useToolsPanelItem
};
//# sourceMappingURL=hook.mjs.map
