"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/components/src/calendar/utils/day-cell.tsx
var day_cell_exports = {};
__export(day_cell_exports, {
  Day: () => Day
});
module.exports = __toCommonJS(day_cell_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var PreviewDashStartAndEnd = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
    viewBox: "0 0 32 32",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    stroke: "currentColor",
    strokeDasharray: "3.7677",
    strokeDashoffset: "3.2",
    strokeWidth: "1",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
      d: "M29.5,0.5 h-27 a2,2 0 0 0 -2,2 v27 a2,2 0 0 0 2,2 h27 a2,2 0 0 0 2,-2 v-27 a2,2 0 0 0 -2,-2"
    })
  });
};
var PreviewDashStart = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
    viewBox: "0 0 32 32",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    stroke: "currentColor",
    strokeDasharray: "3.84516",
    strokeDashoffset: "1.9226",
    strokeWidth: "1",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
      d: "M32,0.5 h-29.5 a2,2 0 0 0 -2,2 v27 a2,2 0 0 0 2,2 h30"
    })
  });
};
var PreviewDashMiddle = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
    viewBox: "0 0 32 32",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    stroke: "currentColor",
    strokeDasharray: "3.9 4",
    strokeDashoffset: "2",
    strokeWidth: "1",
    children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
      x1: "0",
      y1: "0.5",
      x2: "100",
      y2: "0.5"
    }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
      x1: "0",
      y1: "31.5",
      x2: "100",
      y2: "31.5"
    })]
  });
};
var PreviewDashEnd = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
    viewBox: "0 0 32 32",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    stroke: "currentColor",
    strokeDasharray: "3.84516",
    strokeDashoffset: "1.9226",
    strokeWidth: "1",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
      d: "M0,0.5 h29.5 a2,2 0 0 1 2,2 v27 a2,2 0 0 1 -2,2 h-29.5"
    })
  });
};
function Day(props) {
  const {
    day,
    modifiers,
    children,
    ...tdProps
  } = props;
  let PreviewDash;
  if (modifiers.preview_start && modifiers.preview_end) {
    PreviewDash = PreviewDashStartAndEnd;
  } else if (modifiers.preview_start) {
    PreviewDash = PreviewDashStart;
  } else if (modifiers.preview_end) {
    PreviewDash = PreviewDashEnd;
  } else if (modifiers.preview) {
    PreviewDash = PreviewDashMiddle;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
    ...tdProps,
    children: [PreviewDash && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewDash, {}), children]
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Day
});
//# sourceMappingURL=day-cell.cjs.map
