// packages/compose/src/hooks/use-warn-on-change/index.js
import usePrevious from "../use-previous/index.mjs";
function useWarnOnChange(object, prefix = "Change detection") {
  const previousValues = usePrevious(object);
  Object.entries(previousValues ?? []).forEach(([key, value]) => {
    if (value !== object[
      /** @type {keyof typeof object} */
      key
    ]) {
      console.warn(
        `${prefix}: ${key} key changed:`,
        value,
        object[
          /** @type {keyof typeof object} */
          key
        ]
        /* eslint-enable jsdoc/check-types */
      );
    }
  });
}
var use_warn_on_change_default = useWarnOnChange;
export {
  use_warn_on_change_default as default
};
//# sourceMappingURL=index.mjs.map
