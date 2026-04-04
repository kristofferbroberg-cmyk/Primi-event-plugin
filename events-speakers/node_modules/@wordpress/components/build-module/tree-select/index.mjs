// packages/components/src/tree-select/index.tsx
import { useMemo } from "@wordpress/element";
import { decodeEntities } from "@wordpress/html-entities";
import { SelectControl } from "../select-control/index.mjs";
import { useDeprecated36pxDefaultSizeProp } from "../utils/use-deprecated-props.mjs";
import { maybeWarnDeprecated36pxSize } from "../utils/deprecated-36px-size.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
function getSelectOptions(tree, level = 0) {
  return tree.flatMap((treeNode) => [{
    value: treeNode.id,
    label: "\xA0".repeat(level * 3) + decodeEntities(treeNode.name)
  }, ...getSelectOptions(treeNode.children || [], level + 1)]);
}
function TreeSelect(props) {
  const {
    __nextHasNoMarginBottom: _,
    // Prevent passing to internal component
    label,
    noOptionLabel,
    onChange,
    selectedId,
    tree = [],
    ...restProps
  } = useDeprecated36pxDefaultSizeProp(props);
  const options = useMemo(() => {
    return [noOptionLabel && {
      value: "",
      label: noOptionLabel
    }, ...getSelectOptions(tree)].filter((option) => !!option);
  }, [noOptionLabel, tree]);
  maybeWarnDeprecated36pxSize({
    componentName: "TreeSelect",
    size: restProps.size,
    __next40pxDefaultSize: restProps.__next40pxDefaultSize
  });
  return (
    // Disable reason: the parent component already takes case of the `__next40pxDefaultSize` prop.
    // eslint-disable-next-line @wordpress/components-no-missing-40px-size-prop
    /* @__PURE__ */ _jsx(SelectControl, {
      __shouldNotWarnDeprecated36pxSize: true,
      label,
      options,
      onChange,
      value: selectedId,
      ...restProps
    })
  );
}
var tree_select_default = TreeSelect;
export {
  TreeSelect,
  tree_select_default as default
};
//# sourceMappingURL=index.mjs.map
