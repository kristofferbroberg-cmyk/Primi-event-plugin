// packages/data/src/components/async-mode-provider/context.ts
import { createContext } from "@wordpress/element";
var Context = createContext(false);
Context.displayName = "AsyncModeContext";
var { Consumer, Provider } = Context;
var AsyncModeConsumer = Consumer;
var context_default = Provider;
export {
  AsyncModeConsumer,
  Context,
  context_default as default
};
//# sourceMappingURL=context.mjs.map
