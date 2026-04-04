// packages/components/src/navigation/group/context.tsx
import { createContext, useContext } from "@wordpress/element";
var NavigationGroupContext = createContext({
  group: void 0
});
NavigationGroupContext.displayName = "NavigationGroupContext";
var useNavigationGroupContext = () => useContext(NavigationGroupContext);
export {
  NavigationGroupContext,
  useNavigationGroupContext
};
//# sourceMappingURL=context.mjs.map
