// packages/components/src/calendar/utils/day-cell.tsx
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var PreviewDashStartAndEnd = () => {
  return /* @__PURE__ */ _jsx("svg", {
    viewBox: "0 0 32 32",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    stroke: "currentColor",
    strokeDasharray: "3.7677",
    strokeDashoffset: "3.2",
    strokeWidth: "1",
    children: /* @__PURE__ */ _jsx("path", {
      d: "M29.5,0.5 h-27 a2,2 0 0 0 -2,2 v27 a2,2 0 0 0 2,2 h27 a2,2 0 0 0 2,-2 v-27 a2,2 0 0 0 -2,-2"
    })
  });
};
var PreviewDashStart = () => {
  return /* @__PURE__ */ _jsx("svg", {
    viewBox: "0 0 32 32",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    stroke: "currentColor",
    strokeDasharray: "3.84516",
    strokeDashoffset: "1.9226",
    strokeWidth: "1",
    children: /* @__PURE__ */ _jsx("path", {
      d: "M32,0.5 h-29.5 a2,2 0 0 0 -2,2 v27 a2,2 0 0 0 2,2 h30"
    })
  });
};
var PreviewDashMiddle = () => {
  return /* @__PURE__ */ _jsxs("svg", {
    viewBox: "0 0 32 32",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    stroke: "currentColor",
    strokeDasharray: "3.9 4",
    strokeDashoffset: "2",
    strokeWidth: "1",
    children: [/* @__PURE__ */ _jsx("line", {
      x1: "0",
      y1: "0.5",
      x2: "100",
      y2: "0.5"
    }), /* @__PURE__ */ _jsx("line", {
      x1: "0",
      y1: "31.5",
      x2: "100",
      y2: "31.5"
    })]
  });
};
var PreviewDashEnd = () => {
  return /* @__PURE__ */ _jsx("svg", {
    viewBox: "0 0 32 32",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    stroke: "currentColor",
    strokeDasharray: "3.84516",
    strokeDashoffset: "1.9226",
    strokeWidth: "1",
    children: /* @__PURE__ */ _jsx("path", {
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
  return /* @__PURE__ */ _jsxs("td", {
    ...tdProps,
    children: [PreviewDash && /* @__PURE__ */ _jsx(PreviewDash, {}), children]
  });
}
export {
  Day
};
//# sourceMappingURL=day-cell.mjs.map
