// packages/components/src/flex/flex-item/hook.ts
import { css } from "@emotion/react";
import { useContextSystem } from "../../context/index.mjs";
import { useFlexContext } from "../context.mjs";
import * as styles from "../styles.mjs";
import { useCx } from "../../utils/hooks/use-cx.mjs";
function useFlexItem(props) {
  const {
    className,
    display: displayProp,
    isBlock = false,
    ...otherProps
  } = useContextSystem(props, "FlexItem");
  const sx = {};
  const contextDisplay = useFlexContext().flexItemDisplay;
  sx.Base = /* @__PURE__ */ css({
    display: displayProp || contextDisplay
  }, process.env.NODE_ENV === "production" ? "" : ";label:sx-Base;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0NXIiwiZmlsZSI6Imhvb2sudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgdHlwZSB7IFNlcmlhbGl6ZWRTdHlsZXMgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB0eXBlIHsgV29yZFByZXNzQ29tcG9uZW50UHJvcHMgfSBmcm9tICcuLi8uLi9jb250ZXh0JztcbmltcG9ydCB7IHVzZUNvbnRleHRTeXN0ZW0gfSBmcm9tICcuLi8uLi9jb250ZXh0JztcbmltcG9ydCB7IHVzZUZsZXhDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dCc7XG5pbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi4vc3R5bGVzJztcbmltcG9ydCB7IHVzZUN4IH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9va3MvdXNlLWN4JztcbmltcG9ydCB0eXBlIHsgRmxleEl0ZW1Qcm9wcyB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZsZXhJdGVtKFxuXHRwcm9wczogV29yZFByZXNzQ29tcG9uZW50UHJvcHM8IEZsZXhJdGVtUHJvcHMsICdkaXYnID5cbikge1xuXHRjb25zdCB7XG5cdFx0Y2xhc3NOYW1lLFxuXHRcdGRpc3BsYXk6IGRpc3BsYXlQcm9wLFxuXHRcdGlzQmxvY2sgPSBmYWxzZSxcblx0XHQuLi5vdGhlclByb3BzXG5cdH0gPSB1c2VDb250ZXh0U3lzdGVtKCBwcm9wcywgJ0ZsZXhJdGVtJyApO1xuXG5cdGNvbnN0IHN4OiB7XG5cdFx0QmFzZT86IFNlcmlhbGl6ZWRTdHlsZXM7XG5cdH0gPSB7fTtcblxuXHRjb25zdCBjb250ZXh0RGlzcGxheSA9IHVzZUZsZXhDb250ZXh0KCkuZmxleEl0ZW1EaXNwbGF5O1xuXG5cdHN4LkJhc2UgPSBjc3MoIHtcblx0XHRkaXNwbGF5OiBkaXNwbGF5UHJvcCB8fCBjb250ZXh0RGlzcGxheSxcblx0fSApO1xuXG5cdGNvbnN0IGN4ID0gdXNlQ3goKTtcblxuXHRjb25zdCBjbGFzc2VzID0gY3goXG5cdFx0c3R5bGVzLkl0ZW0sXG5cdFx0c3guQmFzZSxcblx0XHRpc0Jsb2NrICYmIHN0eWxlcy5ibG9jayxcblx0XHRjbGFzc05hbWVcblx0KTtcblxuXHRyZXR1cm4ge1xuXHRcdC4uLm90aGVyUHJvcHMsXG5cdFx0Y2xhc3NOYW1lOiBjbGFzc2VzLFxuXHR9O1xufVxuIl19 */");
  const cx = useCx();
  const classes = cx(styles.Item, sx.Base, isBlock && styles.block, className);
  return {
    ...otherProps,
    className: classes
  };
}
export {
  useFlexItem
};
//# sourceMappingURL=hook.mjs.map
