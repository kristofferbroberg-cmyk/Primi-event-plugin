// packages/components/src/navigation/menu/context.tsx
import { createContext, useContext } from "@wordpress/element";
var NavigationMenuContext = createContext({
  menu: void 0,
  search: ""
});
NavigationMenuContext.displayName = "NavigationMenuContext";
var useNavigationMenuContext = () => useContext(NavigationMenuContext);
export {
  NavigationMenuContext,
  useNavigationMenuContext
};
//# sourceMappingURL=context.mjs.map
