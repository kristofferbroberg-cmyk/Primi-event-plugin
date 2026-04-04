// packages/components/src/truncate/hook.ts
import { css } from "@emotion/react";
import { useMemo } from "@wordpress/element";
import { useContextSystem } from "../context/index.mjs";
import * as styles from "./styles.mjs";
import { TRUNCATE_ELLIPSIS, TRUNCATE_TYPE, truncateContent } from "./utils.mjs";
import { useCx } from "../utils/hooks/use-cx.mjs";
function useTruncate(props) {
  const {
    className,
    children,
    ellipsis = TRUNCATE_ELLIPSIS,
    ellipsizeMode = TRUNCATE_TYPE.auto,
    limit = 0,
    numberOfLines = 0,
    ...otherProps
  } = useContextSystem(props, "Truncate");
  const cx = useCx();
  let childrenAsText;
  if (typeof children === "string") {
    childrenAsText = children;
  } else if (typeof children === "number") {
    childrenAsText = children.toString();
  }
  const truncatedContent = childrenAsText ? truncateContent(childrenAsText, {
    ellipsis,
    ellipsizeMode,
    limit,
    numberOfLines
  }) : children;
  const shouldTruncate = !!childrenAsText && ellipsizeMode === TRUNCATE_TYPE.auto;
  const classes = useMemo(() => {
    const truncateLines = /* @__PURE__ */ css(numberOfLines === 1 ? "word-break: break-all;" : "", " -webkit-box-orient:vertical;-webkit-line-clamp:", numberOfLines, ";display:-webkit-box;overflow:hidden;" + (process.env.NODE_ENV === "production" ? "" : ";label:truncateLines;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMEQyQiIsImZpbGUiOiJob29rLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIFdvcmRQcmVzcyBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB0eXBlIHsgV29yZFByZXNzQ29tcG9uZW50UHJvcHMgfSBmcm9tICcuLi9jb250ZXh0JztcbmltcG9ydCB7IHVzZUNvbnRleHRTeXN0ZW0gfSBmcm9tICcuLi9jb250ZXh0JztcbmltcG9ydCAqIGFzIHN0eWxlcyBmcm9tICcuL3N0eWxlcyc7XG5pbXBvcnQgeyBUUlVOQ0FURV9FTExJUFNJUywgVFJVTkNBVEVfVFlQRSwgdHJ1bmNhdGVDb250ZW50IH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyB1c2VDeCB9IGZyb20gJy4uL3V0aWxzL2hvb2tzL3VzZS1jeCc7XG5pbXBvcnQgdHlwZSB7IFRydW5jYXRlUHJvcHMgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlVHJ1bmNhdGUoXG5cdHByb3BzOiBXb3JkUHJlc3NDb21wb25lbnRQcm9wczwgVHJ1bmNhdGVQcm9wcywgJ3NwYW4nID5cbikge1xuXHRjb25zdCB7XG5cdFx0Y2xhc3NOYW1lLFxuXHRcdGNoaWxkcmVuLFxuXHRcdGVsbGlwc2lzID0gVFJVTkNBVEVfRUxMSVBTSVMsXG5cdFx0ZWxsaXBzaXplTW9kZSA9IFRSVU5DQVRFX1RZUEUuYXV0byxcblx0XHRsaW1pdCA9IDAsXG5cdFx0bnVtYmVyT2ZMaW5lcyA9IDAsXG5cdFx0Li4ub3RoZXJQcm9wc1xuXHR9ID0gdXNlQ29udGV4dFN5c3RlbSggcHJvcHMsICdUcnVuY2F0ZScgKTtcblxuXHRjb25zdCBjeCA9IHVzZUN4KCk7XG5cblx0bGV0IGNoaWxkcmVuQXNUZXh0O1xuXHRpZiAoIHR5cGVvZiBjaGlsZHJlbiA9PT0gJ3N0cmluZycgKSB7XG5cdFx0Y2hpbGRyZW5Bc1RleHQgPSBjaGlsZHJlbjtcblx0fSBlbHNlIGlmICggdHlwZW9mIGNoaWxkcmVuID09PSAnbnVtYmVyJyApIHtcblx0XHRjaGlsZHJlbkFzVGV4dCA9IGNoaWxkcmVuLnRvU3RyaW5nKCk7XG5cdH1cblxuXHRjb25zdCB0cnVuY2F0ZWRDb250ZW50ID0gY2hpbGRyZW5Bc1RleHRcblx0XHQ/IHRydW5jYXRlQ29udGVudCggY2hpbGRyZW5Bc1RleHQsIHtcblx0XHRcdFx0ZWxsaXBzaXMsXG5cdFx0XHRcdGVsbGlwc2l6ZU1vZGUsXG5cdFx0XHRcdGxpbWl0LFxuXHRcdFx0XHRudW1iZXJPZkxpbmVzLFxuXHRcdCAgfSApXG5cdFx0OiBjaGlsZHJlbjtcblxuXHRjb25zdCBzaG91bGRUcnVuY2F0ZSA9XG5cdFx0ISEgY2hpbGRyZW5Bc1RleHQgJiYgZWxsaXBzaXplTW9kZSA9PT0gVFJVTkNBVEVfVFlQRS5hdXRvO1xuXG5cdGNvbnN0IGNsYXNzZXMgPSB1c2VNZW1vKCAoKSA9PiB7XG5cdFx0Ly8gVGhlIGB3b3JkLWJyZWFrOiBicmVhay1hbGxgIHByb3BlcnR5IGZpcnN0IG1ha2VzIHN1cmUgYSB0ZXh0IGxpbmVcblx0XHQvLyBicmVha3MgZXZlbiB3aGVuIGl0IGNvbnRhaW5zICd1bmJyZWFrYWJsZScgY29udGVudCBzdWNoIGFzIGxvbmcgVVJMcy5cblx0XHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL1dvcmRQcmVzcy9ndXRlbmJlcmcvaXNzdWVzLzYwODYwLlxuXHRcdGNvbnN0IHRydW5jYXRlTGluZXMgPSBjc3NgXG5cdFx0XHQkeyBudW1iZXJPZkxpbmVzID09PSAxID8gJ3dvcmQtYnJlYWs6IGJyZWFrLWFsbDsnIDogJycgfVxuXHRcdFx0LXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcblx0XHRcdC13ZWJraXQtbGluZS1jbGFtcDogJHsgbnVtYmVyT2ZMaW5lcyB9O1xuXHRcdFx0ZGlzcGxheTogLXdlYmtpdC1ib3g7XG5cdFx0XHRvdmVyZmxvdzogaGlkZGVuO1xuXHRcdGA7XG5cblx0XHRyZXR1cm4gY3goXG5cdFx0XHRzaG91bGRUcnVuY2F0ZSAmJiAhIG51bWJlck9mTGluZXMgJiYgc3R5bGVzLlRydW5jYXRlLFxuXHRcdFx0c2hvdWxkVHJ1bmNhdGUgJiYgISEgbnVtYmVyT2ZMaW5lcyAmJiB0cnVuY2F0ZUxpbmVzLFxuXHRcdFx0Y2xhc3NOYW1lXG5cdFx0KTtcblx0fSwgWyBjbGFzc05hbWUsIGN4LCBudW1iZXJPZkxpbmVzLCBzaG91bGRUcnVuY2F0ZSBdICk7XG5cblx0cmV0dXJuIHsgLi4ub3RoZXJQcm9wcywgY2xhc3NOYW1lOiBjbGFzc2VzLCBjaGlsZHJlbjogdHJ1bmNhdGVkQ29udGVudCB9O1xufVxuIl19 */");
    return cx(shouldTruncate && !numberOfLines && styles.Truncate, shouldTruncate && !!numberOfLines && truncateLines, className);
  }, [className, cx, numberOfLines, shouldTruncate]);
  return {
    ...otherProps,
    className: classes,
    children: truncatedContent
  };
}
export {
  useTruncate as default
};
//# sourceMappingURL=hook.mjs.map
