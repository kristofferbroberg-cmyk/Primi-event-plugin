"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/compose/src/hooks/use-fixed-window-list/index.js
var use_fixed_window_list_exports = {};
__export(use_fixed_window_list_exports, {
  default: () => useFixedWindowList
});
module.exports = __toCommonJS(use_fixed_window_list_exports);
var import_element = require("@wordpress/element");
var import_dom = require("@wordpress/dom");
var import_keycodes = require("@wordpress/keycodes");
var import_debounce = require("../../utils/debounce/index.cjs");
var DEFAULT_INIT_WINDOW_SIZE = 30;
function useFixedWindowList(elementRef, itemHeight, totalItems, options) {
  const initWindowSize = options?.initWindowSize ?? DEFAULT_INIT_WINDOW_SIZE;
  const useWindowing = options?.useWindowing ?? true;
  const [fixedListWindow, setFixedListWindow] = (0, import_element.useState)({
    visibleItems: initWindowSize,
    start: 0,
    end: initWindowSize,
    itemInView: (index) => {
      return index >= 0 && index <= initWindowSize;
    }
  });
  (0, import_element.useLayoutEffect)(() => {
    if (!useWindowing) {
      return;
    }
    const scrollContainer = (0, import_dom.getScrollContainer)(elementRef.current);
    const measureWindow = (initRender) => {
      if (!scrollContainer) {
        return;
      }
      const visibleItems = Math.ceil(
        scrollContainer.clientHeight / itemHeight
      );
      const windowOverscan = initRender ? visibleItems : options?.windowOverscan ?? visibleItems;
      const firstViewableIndex = Math.floor(
        scrollContainer.scrollTop / itemHeight
      );
      const start = Math.max(0, firstViewableIndex - windowOverscan);
      const end = Math.min(
        totalItems - 1,
        firstViewableIndex + visibleItems + windowOverscan
      );
      setFixedListWindow((lastWindow) => {
        const nextWindow = {
          visibleItems,
          start,
          end,
          itemInView: (index) => {
            return start <= index && index <= end;
          }
        };
        if (lastWindow.start !== nextWindow.start || lastWindow.end !== nextWindow.end || lastWindow.visibleItems !== nextWindow.visibleItems) {
          return nextWindow;
        }
        return lastWindow;
      });
    };
    measureWindow(true);
    const debounceMeasureList = (0, import_debounce.debounce)(() => {
      measureWindow();
    }, 16);
    scrollContainer?.addEventListener("scroll", debounceMeasureList);
    scrollContainer?.ownerDocument?.defaultView?.addEventListener(
      "resize",
      debounceMeasureList
    );
    scrollContainer?.ownerDocument?.defaultView?.addEventListener(
      "resize",
      debounceMeasureList
    );
    return () => {
      scrollContainer?.removeEventListener(
        "scroll",
        debounceMeasureList
      );
      scrollContainer?.ownerDocument?.defaultView?.removeEventListener(
        "resize",
        debounceMeasureList
      );
    };
  }, [
    itemHeight,
    elementRef,
    totalItems,
    options?.expandedState,
    options?.windowOverscan,
    useWindowing
  ]);
  (0, import_element.useLayoutEffect)(() => {
    if (!useWindowing) {
      return;
    }
    const scrollContainer = (0, import_dom.getScrollContainer)(elementRef.current);
    const handleKeyDown = (event) => {
      switch (event.keyCode) {
        case import_keycodes.HOME: {
          return scrollContainer?.scrollTo({ top: 0 });
        }
        case import_keycodes.END: {
          return scrollContainer?.scrollTo({
            top: totalItems * itemHeight
          });
        }
        case import_keycodes.PAGEUP: {
          return scrollContainer?.scrollTo({
            top: scrollContainer.scrollTop - fixedListWindow.visibleItems * itemHeight
          });
        }
        case import_keycodes.PAGEDOWN: {
          return scrollContainer?.scrollTo({
            top: scrollContainer.scrollTop + fixedListWindow.visibleItems * itemHeight
          });
        }
      }
    };
    scrollContainer?.ownerDocument?.defaultView?.addEventListener(
      "keydown",
      handleKeyDown
    );
    return () => {
      scrollContainer?.ownerDocument?.defaultView?.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    totalItems,
    itemHeight,
    elementRef,
    fixedListWindow.visibleItems,
    useWindowing,
    options?.expandedState
  ]);
  return [fixedListWindow, setFixedListWindow];
}
//# sourceMappingURL=index.cjs.map
