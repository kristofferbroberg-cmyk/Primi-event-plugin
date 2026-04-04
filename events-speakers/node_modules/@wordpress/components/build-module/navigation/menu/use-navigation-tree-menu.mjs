// packages/components/src/navigation/menu/use-navigation-tree-menu.tsx
import { useEffect } from "@wordpress/element";
import { useNavigationContext } from "../context.mjs";
import { ROOT_MENU } from "../constants.mjs";
var useNavigationTreeMenu = (props) => {
  const {
    navigationTree: {
      addMenu,
      removeMenu
    }
  } = useNavigationContext();
  const key = props.menu || ROOT_MENU;
  useEffect(() => {
    addMenu(key, {
      ...props,
      menu: key
    });
    return () => {
      removeMenu(key);
    };
  }, []);
};
export {
  useNavigationTreeMenu
};
//# sourceMappingURL=use-navigation-tree-menu.mjs.map
