"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/components/src/truncate/hook.ts
var hook_exports = {};
__export(hook_exports, {
  default: () => useTruncate
});
module.exports = __toCommonJS(hook_exports);
var import_react = require("@emotion/react");
var import_element = require("@wordpress/element");
var import_context = require("../context/index.cjs");
var styles = __toESM(require("./styles.cjs"));
var import_utils = require("./utils.cjs");
var import_use_cx = require("../utils/hooks/use-cx.cjs");
function useTruncate(props) {
  const {
    className,
    children,
    ellipsis = import_utils.TRUNCATE_ELLIPSIS,
    ellipsizeMode = import_utils.TRUNCATE_TYPE.auto,
    limit = 0,
    numberOfLines = 0,
    ...otherProps
  } = (0, import_context.useContextSystem)(props, "Truncate");
  const cx = (0, import_use_cx.useCx)();
  let childrenAsText;
  if (typeof children === "string") {
    childrenAsText = children;
  } else if (typeof children === "number") {
    childrenAsText = children.toString();
  }
  const truncatedContent = childrenAsText ? (0, import_utils.truncateContent)(childrenAsText, {
    ellipsis,
    ellipsizeMode,
    limit,
    numberOfLines
  }) : children;
  const shouldTruncate = !!childrenAsText && ellipsizeMode === import_utils.TRUNCATE_TYPE.auto;
  const classes = (0, import_element.useMemo)(() => {
    const truncateLines = /* @__PURE__ */ (0, import_react.css)(numberOfLines === 1 ? "word-break: break-all;" : "", " -webkit-box-orient:vertical;-webkit-line-clamp:", numberOfLines, ";display:-webkit-box;overflow:hidden;" + (process.env.NODE_ENV === "production" ? "" : ";label:truncateLines;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMEQyQiIsImZpbGUiOiJob29rLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIFdvcmRQcmVzcyBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB0eXBlIHsgV29yZFByZXNzQ29tcG9uZW50UHJvcHMgfSBmcm9tICcuLi9jb250ZXh0JztcbmltcG9ydCB7IHVzZUNvbnRleHRTeXN0ZW0gfSBmcm9tICcuLi9jb250ZXh0JztcbmltcG9ydCAqIGFzIHN0eWxlcyBmcm9tICcuL3N0eWxlcyc7XG5pbXBvcnQgeyBUUlVOQ0FURV9FTExJUFNJUywgVFJVTkNBVEVfVFlQRSwgdHJ1bmNhdGVDb250ZW50IH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyB1c2VDeCB9IGZyb20gJy4uL3V0aWxzL2hvb2tzL3VzZS1jeCc7XG5pbXBvcnQgdHlwZSB7IFRydW5jYXRlUHJvcHMgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlVHJ1bmNhdGUoXG5cdHByb3BzOiBXb3JkUHJlc3NDb21wb25lbnRQcm9wczwgVHJ1bmNhdGVQcm9wcywgJ3NwYW4nID5cbikge1xuXHRjb25zdCB7XG5cdFx0Y2xhc3NOYW1lLFxuXHRcdGNoaWxkcmVuLFxuXHRcdGVsbGlwc2lzID0gVFJVTkNBVEVfRUxMSVBTSVMsXG5cdFx0ZWxsaXBzaXplTW9kZSA9IFRSVU5DQVRFX1RZUEUuYXV0byxcblx0XHRsaW1pdCA9IDAsXG5cdFx0bnVtYmVyT2ZMaW5lcyA9IDAsXG5cdFx0Li4ub3RoZXJQcm9wc1xuXHR9ID0gdXNlQ29udGV4dFN5c3RlbSggcHJvcHMsICdUcnVuY2F0ZScgKTtcblxuXHRjb25zdCBjeCA9IHVzZUN4KCk7XG5cblx0bGV0IGNoaWxkcmVuQXNUZXh0O1xuXHRpZiAoIHR5cGVvZiBjaGlsZHJlbiA9PT0gJ3N0cmluZycgKSB7XG5cdFx0Y2hpbGRyZW5Bc1RleHQgPSBjaGlsZHJlbjtcblx0fSBlbHNlIGlmICggdHlwZW9mIGNoaWxkcmVuID09PSAnbnVtYmVyJyApIHtcblx0XHRjaGlsZHJlbkFzVGV4dCA9IGNoaWxkcmVuLnRvU3RyaW5nKCk7XG5cdH1cblxuXHRjb25zdCB0cnVuY2F0ZWRDb250ZW50ID0gY2hpbGRyZW5Bc1RleHRcblx0XHQ/IHRydW5jYXRlQ29udGVudCggY2hpbGRyZW5Bc1RleHQsIHtcblx0XHRcdFx0ZWxsaXBzaXMsXG5cdFx0XHRcdGVsbGlwc2l6ZU1vZGUsXG5cdFx0XHRcdGxpbWl0LFxuXHRcdFx0XHRudW1iZXJPZkxpbmVzLFxuXHRcdCAgfSApXG5cdFx0OiBjaGlsZHJlbjtcblxuXHRjb25zdCBzaG91bGRUcnVuY2F0ZSA9XG5cdFx0ISEgY2hpbGRyZW5Bc1RleHQgJiYgZWxsaXBzaXplTW9kZSA9PT0gVFJVTkNBVEVfVFlQRS5hdXRvO1xuXG5cdGNvbnN0IGNsYXNzZXMgPSB1c2VNZW1vKCAoKSA9PiB7XG5cdFx0Ly8gVGhlIGB3b3JkLWJyZWFrOiBicmVhay1hbGxgIHByb3BlcnR5IGZpcnN0IG1ha2VzIHN1cmUgYSB0ZXh0IGxpbmVcblx0XHQvLyBicmVha3MgZXZlbiB3aGVuIGl0IGNvbnRhaW5zICd1bmJyZWFrYWJsZScgY29udGVudCBzdWNoIGFzIGxvbmcgVVJMcy5cblx0XHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL1dvcmRQcmVzcy9ndXRlbmJlcmcvaXNzdWVzLzYwODYwLlxuXHRcdGNvbnN0IHRydW5jYXRlTGluZXMgPSBjc3NgXG5cdFx0XHQkeyBudW1iZXJPZkxpbmVzID09PSAxID8gJ3dvcmQtYnJlYWs6IGJyZWFrLWFsbDsnIDogJycgfVxuXHRcdFx0LXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcblx0XHRcdC13ZWJraXQtbGluZS1jbGFtcDogJHsgbnVtYmVyT2ZMaW5lcyB9O1xuXHRcdFx0ZGlzcGxheTogLXdlYmtpdC1ib3g7XG5cdFx0XHRvdmVyZmxvdzogaGlkZGVuO1xuXHRcdGA7XG5cblx0XHRyZXR1cm4gY3goXG5cdFx0XHRzaG91bGRUcnVuY2F0ZSAmJiAhIG51bWJlck9mTGluZXMgJiYgc3R5bGVzLlRydW5jYXRlLFxuXHRcdFx0c2hvdWxkVHJ1bmNhdGUgJiYgISEgbnVtYmVyT2ZMaW5lcyAmJiB0cnVuY2F0ZUxpbmVzLFxuXHRcdFx0Y2xhc3NOYW1lXG5cdFx0KTtcblx0fSwgWyBjbGFzc05hbWUsIGN4LCBudW1iZXJPZkxpbmVzLCBzaG91bGRUcnVuY2F0ZSBdICk7XG5cblx0cmV0dXJuIHsgLi4ub3RoZXJQcm9wcywgY2xhc3NOYW1lOiBjbGFzc2VzLCBjaGlsZHJlbjogdHJ1bmNhdGVkQ29udGVudCB9O1xufVxuIl19 */");
    return cx(shouldTruncate && !numberOfLines && styles.Truncate, shouldTruncate && !!numberOfLines && truncateLines, className);
  }, [className, cx, numberOfLines, shouldTruncate]);
  return {
    ...otherProps,
    className: classes,
    children: truncatedContent
  };
}
//# sourceMappingURL=hook.cjs.map
