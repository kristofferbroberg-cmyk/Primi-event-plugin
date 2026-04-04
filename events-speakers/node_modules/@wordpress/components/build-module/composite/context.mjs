// packages/components/src/composite/context.tsx
import { createContext, useContext } from "@wordpress/element";
var CompositeContext = createContext({});
CompositeContext.displayName = "CompositeContext";
var useCompositeContext = () => useContext(CompositeContext);
export {
  CompositeContext,
  useCompositeContext
};
//# sourceMappingURL=context.mjs.map
