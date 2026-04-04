// packages/components/src/navigation/item/use-navigation-tree-item.tsx
import { useEffect } from "@wordpress/element";
import { useNavigationContext } from "../context.mjs";
import { useNavigationGroupContext } from "../group/context.mjs";
import { useNavigationMenuContext } from "../menu/context.mjs";
import { normalizedSearch } from "../utils.mjs";
var useNavigationTreeItem = (itemId, props) => {
  const {
    activeMenu,
    navigationTree: {
      addItem,
      removeItem
    }
  } = useNavigationContext();
  const {
    group
  } = useNavigationGroupContext();
  const {
    menu,
    search
  } = useNavigationMenuContext();
  useEffect(() => {
    const isMenuActive = activeMenu === menu;
    const isItemVisible = !search || props.title !== void 0 && normalizedSearch(props.title, search);
    addItem(itemId, {
      ...props,
      group,
      menu,
      _isVisible: isMenuActive && isItemVisible
    });
    return () => {
      removeItem(itemId);
    };
  }, [activeMenu, search]);
};
export {
  useNavigationTreeItem
};
//# sourceMappingURL=use-navigation-tree-item.mjs.map
