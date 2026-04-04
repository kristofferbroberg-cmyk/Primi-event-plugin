// packages/components/src/context/use-context-system.js
import warn from "@wordpress/warning";
import { useComponentsContext } from "./context-system-provider.mjs";
import { getNamespace, getConnectedNamespace } from "./utils.mjs";
import { getStyledClassNameFromKey } from "./get-styled-class-name-from-key.mjs";
import { useCx } from "../utils/hooks/use-cx.mjs";
function useContextSystem(props, namespace) {
  const contextSystemProps = useComponentsContext();
  if (typeof namespace === "undefined") {
    globalThis.SCRIPT_DEBUG === true ? warn("useContextSystem: Please provide a namespace") : void 0;
  }
  const contextProps = contextSystemProps?.[namespace] || {};
  const finalComponentProps = {
    ...getConnectedNamespace(),
    ...getNamespace(namespace)
  };
  const {
    _overrides: overrideProps,
    ...otherContextProps
  } = contextProps;
  const initialMergedProps = Object.entries(otherContextProps).length ? Object.assign({}, otherContextProps, props) : props;
  const cx = useCx();
  const classes = cx(getStyledClassNameFromKey(namespace), props.className);
  const rendered = typeof initialMergedProps.renderChildren === "function" ? initialMergedProps.renderChildren(initialMergedProps) : initialMergedProps.children;
  for (const key in initialMergedProps) {
    finalComponentProps[key] = initialMergedProps[key];
  }
  for (const key in overrideProps) {
    finalComponentProps[key] = overrideProps[key];
  }
  if (rendered !== void 0) {
    finalComponentProps.children = rendered;
  }
  finalComponentProps.className = classes;
  return finalComponentProps;
}
export {
  useContextSystem
};
//# sourceMappingURL=use-context-system.mjs.map
