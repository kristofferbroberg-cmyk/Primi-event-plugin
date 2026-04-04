// packages/components/src/card/context.ts
import { createContext, useContext } from "@wordpress/element";
var CardContext = createContext({});
CardContext.displayName = "CardContext";
var useCardContext = () => useContext(CardContext);
export {
  CardContext,
  useCardContext
};
//# sourceMappingURL=context.mjs.map
