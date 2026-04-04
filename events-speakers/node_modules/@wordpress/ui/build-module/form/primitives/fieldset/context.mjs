// packages/ui/src/form/primitives/fieldset/context.tsx
import { createContext, useContext } from "@wordpress/element";
var FieldsetContext = createContext({
  registerDescriptionId: () => {
  },
  unregisterDescriptionId: () => {
  }
});
var useFieldsetContext = () => useContext(FieldsetContext);
export {
  FieldsetContext,
  useFieldsetContext
};
//# sourceMappingURL=context.mjs.map
