// packages/compose/src/hooks/use-fixed-window-list/index.js
import { useState, useLayoutEffect } from "@wordpress/element";
import { getScrollContainer } from "@wordpress/dom";
import { PAGEUP, PAGEDOWN, HOME, END } from "@wordpress/keycodes";
import { debounce } from "../../utils/debounce/index.mjs";
var DEFAULT_INIT_WINDOW_SIZE = 30;
function useFixedWindowList(elementRef, itemHeight, totalItems, options) {
  const initWindowSize = options?.initWindowSize ?? DEFAULT_INIT_WINDOW_SIZE;
  const useWindowing = options?.useWindowing ?? true;
  const [fixedListWindow, setFixedListWindow] = useState({
    visibleItems: initWindowSize,
    start: 0,
    end: initWindowSize,
    itemInView: (index) => {
      return index >= 0 && index <= initWindowSize;
    }
  });
  useLayoutEffect(() => {
    if (!useWindowing) {
      return;
    }
    const scrollContainer = getScrollContainer(elementRef.current);
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
    const debounceMeasureList = debounce(() => {
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
  useLayoutEffect(() => {
    if (!useWindowing) {
      return;
    }
    const scrollContainer = getScrollContainer(elementRef.current);
    const handleKeyDown = (event) => {
      switch (event.keyCode) {
        case HOME: {
          return scrollContainer?.scrollTo({ top: 0 });
        }
        case END: {
          return scrollContainer?.scrollTo({
            top: totalItems * itemHeight
          });
        }
        case PAGEUP: {
          return scrollContainer?.scrollTo({
            top: scrollContainer.scrollTop - fixedListWindow.visibleItems * itemHeight
          });
        }
        case PAGEDOWN: {
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
export {
  useFixedWindowList as default
};
//# sourceMappingURL=index.mjs.map
