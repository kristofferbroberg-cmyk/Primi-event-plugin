// packages/components/src/utils/use-deprecated-props.ts
function useDeprecated36pxDefaultSizeProp(props) {
  const {
    __next36pxDefaultSize,
    __next40pxDefaultSize,
    ...otherProps
  } = props;
  return {
    ...otherProps,
    __next40pxDefaultSize: __next40pxDefaultSize ?? __next36pxDefaultSize
  };
}
export {
  useDeprecated36pxDefaultSizeProp
};
//# sourceMappingURL=use-deprecated-props.mjs.map
