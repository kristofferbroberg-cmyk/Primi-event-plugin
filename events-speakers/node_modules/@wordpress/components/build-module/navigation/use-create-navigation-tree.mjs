// packages/components/src/navigation/use-create-navigation-tree.tsx
import { useState } from "@wordpress/element";
import { useNavigationTreeNodes } from "./use-navigation-tree-nodes.mjs";
var useCreateNavigationTree = () => {
  const {
    nodes: items,
    getNode: getItem,
    addNode: addItem,
    removeNode: removeItem
  } = useNavigationTreeNodes();
  const {
    nodes: menus,
    getNode: getMenu,
    addNode: addMenu,
    removeNode: removeMenu
  } = useNavigationTreeNodes();
  const [childMenu, setChildMenu] = useState({});
  const getChildMenu = (menu) => childMenu[menu] || [];
  const traverseMenu = (startMenu, callback) => {
    const visited = [];
    let queue = [startMenu];
    let current;
    while (queue.length > 0) {
      current = getMenu(queue.shift());
      if (!current || visited.includes(current.menu)) {
        continue;
      }
      visited.push(current.menu);
      queue = [...queue, ...getChildMenu(current.menu)];
      if (callback(current) === false) {
        break;
      }
    }
  };
  const isMenuEmpty = (menuToCheck) => {
    let isEmpty = true;
    traverseMenu(menuToCheck, (current) => {
      if (!current.isEmpty) {
        isEmpty = false;
        return false;
      }
      return void 0;
    });
    return isEmpty;
  };
  return {
    items,
    getItem,
    addItem,
    removeItem,
    menus,
    getMenu,
    addMenu: (key, value) => {
      setChildMenu((state) => {
        const newState = {
          ...state
        };
        if (!value.parentMenu) {
          return newState;
        }
        if (!newState[value.parentMenu]) {
          newState[value.parentMenu] = [];
        }
        newState[value.parentMenu].push(key);
        return newState;
      });
      addMenu(key, value);
    },
    removeMenu,
    childMenu,
    traverseMenu,
    isMenuEmpty
  };
};
export {
  useCreateNavigationTree
};
//# sourceMappingURL=use-create-navigation-tree.mjs.map
