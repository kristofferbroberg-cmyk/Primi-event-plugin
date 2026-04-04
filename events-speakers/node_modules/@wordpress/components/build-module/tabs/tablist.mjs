// packages/components/src/tabs/tablist.tsx
import * as Ariakit from "@ariakit/react";
import clsx from "clsx";
import warning from "@wordpress/warning";
import { forwardRef, useLayoutEffect, useState } from "@wordpress/element";
import { useMergeRefs } from "@wordpress/compose";
import { useTabsContext } from "./context.mjs";
import { StyledTabList } from "./styles.mjs";
import { useTrackElementOffsetRect } from "../utils/element-rect.mjs";
import { useTrackOverflow } from "./use-track-overflow.mjs";
import { useAnimatedOffsetRect } from "../utils/hooks/use-animated-offset-rect.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
var DEFAULT_SCROLL_MARGIN = 24;
function useScrollRectIntoView(parent, rect, {
  margin = DEFAULT_SCROLL_MARGIN
} = {}) {
  useLayoutEffect(() => {
    if (!parent || !rect) {
      return;
    }
    const {
      scrollLeft: parentScroll
    } = parent;
    const parentWidth = parent.getBoundingClientRect().width;
    const {
      left: childLeft,
      width: childWidth
    } = rect;
    const parentRightEdge = parentScroll + parentWidth;
    const childRightEdge = childLeft + childWidth;
    const rightOverflow = childRightEdge + margin - parentRightEdge;
    const leftOverflow = parentScroll - (childLeft - margin);
    let scrollLeft = null;
    if (leftOverflow > 0) {
      scrollLeft = parentScroll - leftOverflow;
    } else if (rightOverflow > 0) {
      scrollLeft = parentScroll + rightOverflow;
    }
    if (scrollLeft !== null) {
      parent.scroll?.({
        left: scrollLeft
      });
    }
  }, [margin, parent, rect]);
}
var TabList = forwardRef(function TabList2({
  children,
  ...otherProps
}, ref) {
  const {
    store
  } = useTabsContext() ?? {};
  const selectedId = Ariakit.useStoreState(store, "selectedId");
  const activeId = Ariakit.useStoreState(store, "activeId");
  const selectOnMove = Ariakit.useStoreState(store, "selectOnMove");
  const items = Ariakit.useStoreState(store, "items");
  const [parent, setParent] = useState();
  const refs = useMergeRefs([ref, setParent]);
  const selectedItem = store?.item(selectedId);
  const renderedItems = Ariakit.useStoreState(store, "renderedItems");
  const selectedItemIndex = renderedItems && selectedItem ? renderedItems.indexOf(selectedItem) : -1;
  const selectedRect = useTrackElementOffsetRect(selectedItem?.element, [selectedItemIndex]);
  const overflow = useTrackOverflow(parent, {
    first: items?.at(0)?.element,
    last: items?.at(-1)?.element
  });
  useAnimatedOffsetRect(parent, selectedRect, {
    prefix: "selected",
    dataAttribute: "indicator-animated",
    transitionEndFilter: (event) => event.pseudoElement === "::before",
    roundRect: true
  });
  useScrollRectIntoView(parent, selectedRect);
  const onBlur = () => {
    if (!selectOnMove) {
      return;
    }
    if (selectedId !== activeId) {
      store?.setActiveId(selectedId);
    }
  };
  if (!store) {
    globalThis.SCRIPT_DEBUG === true ? warning("`Tabs.TabList` must be wrapped in a `Tabs` component.") : void 0;
    return null;
  }
  return /* @__PURE__ */ _jsx(StyledTabList, {
    ref: refs,
    store,
    render: (props) => /* @__PURE__ */ _jsx("div", {
      ...props,
      // Fallback to -1 to prevent browsers from making the tablist
      // tabbable when it is a scrolling container.
      tabIndex: props.tabIndex ?? -1
    }),
    onBlur,
    "data-select-on-move": selectOnMove ? "true" : "false",
    ...otherProps,
    className: clsx(overflow.first && "is-overflowing-first", overflow.last && "is-overflowing-last", otherProps.className),
    children
  });
});
export {
  TabList
};
//# sourceMappingURL=tablist.mjs.map
