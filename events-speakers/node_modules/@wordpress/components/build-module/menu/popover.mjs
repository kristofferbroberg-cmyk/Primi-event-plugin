// packages/components/src/menu/popover.tsx
import * as Ariakit from "@ariakit/react";
import { useContext, useMemo, forwardRef, useCallback } from "@wordpress/element";
import * as Styled from "./styles.mjs";
import { Context } from "./context.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
var Popover = forwardRef(function Popover2({
  gutter,
  children,
  shift,
  modal = true,
  ...otherProps
}, ref) {
  const menuContext = useContext(Context);
  const appliedPlacementSide = Ariakit.useStoreState(menuContext?.store, "currentPlacement")?.split("-")[0];
  const hideOnEscape = useCallback((event) => {
    event.preventDefault();
    return true;
  }, []);
  const computedDirection = Ariakit.useStoreState(menuContext?.store, "rtl") ? "rtl" : "ltr";
  const wrapperProps = useMemo(() => ({
    dir: computedDirection,
    style: {
      direction: computedDirection
    }
  }), [computedDirection]);
  if (!menuContext?.store) {
    throw new Error("Menu.Popover can only be rendered inside a Menu component");
  }
  return /* @__PURE__ */ _jsx(Styled.Menu, {
    ...otherProps,
    ref,
    modal,
    store: menuContext.store,
    gutter: gutter ?? (menuContext.store.parent ? 0 : 8),
    shift: shift ?? (menuContext.store.parent ? -4 : 0),
    hideOnHoverOutside: false,
    "data-side": appliedPlacementSide,
    "data-submenu": !!menuContext.store.parent || void 0,
    wrapperProps,
    hideOnEscape,
    unmountOnHide: true,
    variant: menuContext.variant,
    children
  });
});
export {
  Popover
};
//# sourceMappingURL=popover.mjs.map
