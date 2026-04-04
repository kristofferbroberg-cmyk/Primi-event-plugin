// packages/data/src/components/with-select/index.tsx
import { createHigherOrderComponent, pure } from "@wordpress/compose";
import useSelect from "../use-select/index.mjs";
import { jsx } from "react/jsx-runtime";
var withSelect = (mapSelectToProps) => createHigherOrderComponent(
  (WrappedComponent) => pure((ownProps) => {
    const mapSelect = (select, registry) => mapSelectToProps(select, ownProps, registry);
    const mergeProps = useSelect(mapSelect);
    return /* @__PURE__ */ jsx(WrappedComponent, { ...ownProps, ...mergeProps });
  }),
  "withSelect"
);
var with_select_default = withSelect;
export {
  with_select_default as default
};
//# sourceMappingURL=index.mjs.map
