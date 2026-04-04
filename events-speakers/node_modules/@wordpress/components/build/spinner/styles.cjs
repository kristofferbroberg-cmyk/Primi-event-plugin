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

// packages/components/src/spinner/styles.ts
var styles_exports = {};
__export(styles_exports, {
  SpinnerIndicator: () => SpinnerIndicator,
  SpinnerTrack: () => SpinnerTrack,
  StyledSpinner: () => StyledSpinner
});
module.exports = __toCommonJS(styles_exports);
var import_base = __toESM(require("@emotion/styled/base"));
var import_react = require("@emotion/react");
var import_utils = require("../utils/index.cjs");
function _EMOTION_STRINGIFIED_CSS_ERROR__() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var spinAnimation = import_react.keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
 `;
var StyledSpinner = /* @__PURE__ */ (0, import_base.default)("svg", process.env.NODE_ENV === "production" ? {
  target: "ea4tfvq2"
} : {
  target: "ea4tfvq2",
  label: "StyledSpinner"
})("width:", import_utils.CONFIG.spinnerSize, "px;height:", import_utils.CONFIG.spinnerSize, "px;display:inline-block;margin:5px 11px 0;position:relative;color:", import_utils.COLORS.theme.accent, ";overflow:visible;opacity:1;background-color:transparent;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvQnVDIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IGNzcywga2V5ZnJhbWVzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBDT0xPUlMsIENPTkZJRyB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3Qgc3BpbkFuaW1hdGlvbiA9IGtleWZyYW1lc2Bcblx0ZnJvbSB7XG5cdFx0dHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG5cdH1cblx0dG8ge1xuXHRcdHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XG5cdH1cbiBgO1xuXG5leHBvcnQgY29uc3QgU3R5bGVkU3Bpbm5lciA9IHN0eWxlZC5zdmdgXG5cdHdpZHRoOiAkeyBDT05GSUcuc3Bpbm5lclNpemUgfXB4O1xuXHRoZWlnaHQ6ICR7IENPTkZJRy5zcGlubmVyU2l6ZSB9cHg7XG5cdGRpc3BsYXk6IGlubGluZS1ibG9jaztcblx0bWFyZ2luOiA1cHggMTFweCAwO1xuXHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdGNvbG9yOiAkeyBDT0xPUlMudGhlbWUuYWNjZW50IH07XG5cdG92ZXJmbG93OiB2aXNpYmxlO1xuXHRvcGFjaXR5OiAxO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbmA7XG5cbmNvbnN0IGNvbW1vblBhdGhQcm9wcyA9IGNzc2Bcblx0ZmlsbDogdHJhbnNwYXJlbnQ7XG5cdHN0cm9rZS13aWR0aDogMS41cHg7XG5gO1xuXG5leHBvcnQgY29uc3QgU3Bpbm5lclRyYWNrID0gc3R5bGVkLmNpcmNsZWBcblx0JHsgY29tbW9uUGF0aFByb3BzIH07XG5cdHN0cm9rZTogJHsgQ09MT1JTLmdyYXlbIDMwMCBdIH07XG5gO1xuXG5leHBvcnQgY29uc3QgU3Bpbm5lckluZGljYXRvciA9IHN0eWxlZC5wYXRoYFxuXHQkeyBjb21tb25QYXRoUHJvcHMgfTtcblx0c3Ryb2tlOiBjdXJyZW50Q29sb3I7XG5cdHN0cm9rZS1saW5lY2FwOiByb3VuZDtcblx0dHJhbnNmb3JtLW9yaWdpbjogNTAlIDUwJTtcblx0YW5pbWF0aW9uOiAxLjRzIGxpbmVhciBpbmZpbml0ZSBib3RoICR7IHNwaW5BbmltYXRpb24gfTtcbmA7XG4iXX0= */"));
var commonPathProps = process.env.NODE_ENV === "production" ? {
  name: "9s4963",
  styles: "fill:transparent;stroke-width:1.5px"
} : {
  name: "o2zng0-commonPathProps",
  styles: "fill:transparent;stroke-width:1.5px;label:commonPathProps;/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnQzJCIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IGNzcywga2V5ZnJhbWVzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBDT0xPUlMsIENPTkZJRyB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3Qgc3BpbkFuaW1hdGlvbiA9IGtleWZyYW1lc2Bcblx0ZnJvbSB7XG5cdFx0dHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG5cdH1cblx0dG8ge1xuXHRcdHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XG5cdH1cbiBgO1xuXG5leHBvcnQgY29uc3QgU3R5bGVkU3Bpbm5lciA9IHN0eWxlZC5zdmdgXG5cdHdpZHRoOiAkeyBDT05GSUcuc3Bpbm5lclNpemUgfXB4O1xuXHRoZWlnaHQ6ICR7IENPTkZJRy5zcGlubmVyU2l6ZSB9cHg7XG5cdGRpc3BsYXk6IGlubGluZS1ibG9jaztcblx0bWFyZ2luOiA1cHggMTFweCAwO1xuXHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdGNvbG9yOiAkeyBDT0xPUlMudGhlbWUuYWNjZW50IH07XG5cdG92ZXJmbG93OiB2aXNpYmxlO1xuXHRvcGFjaXR5OiAxO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbmA7XG5cbmNvbnN0IGNvbW1vblBhdGhQcm9wcyA9IGNzc2Bcblx0ZmlsbDogdHJhbnNwYXJlbnQ7XG5cdHN0cm9rZS13aWR0aDogMS41cHg7XG5gO1xuXG5leHBvcnQgY29uc3QgU3Bpbm5lclRyYWNrID0gc3R5bGVkLmNpcmNsZWBcblx0JHsgY29tbW9uUGF0aFByb3BzIH07XG5cdHN0cm9rZTogJHsgQ09MT1JTLmdyYXlbIDMwMCBdIH07XG5gO1xuXG5leHBvcnQgY29uc3QgU3Bpbm5lckluZGljYXRvciA9IHN0eWxlZC5wYXRoYFxuXHQkeyBjb21tb25QYXRoUHJvcHMgfTtcblx0c3Ryb2tlOiBjdXJyZW50Q29sb3I7XG5cdHN0cm9rZS1saW5lY2FwOiByb3VuZDtcblx0dHJhbnNmb3JtLW9yaWdpbjogNTAlIDUwJTtcblx0YW5pbWF0aW9uOiAxLjRzIGxpbmVhciBpbmZpbml0ZSBib3RoICR7IHNwaW5BbmltYXRpb24gfTtcbmA7XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
var SpinnerTrack = /* @__PURE__ */ (0, import_base.default)("circle", process.env.NODE_ENV === "production" ? {
  target: "ea4tfvq1"
} : {
  target: "ea4tfvq1",
  label: "SpinnerTrack"
})(commonPathProps, ";stroke:", import_utils.COLORS.gray[300], ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFxQ3lDIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IGNzcywga2V5ZnJhbWVzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBDT0xPUlMsIENPTkZJRyB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3Qgc3BpbkFuaW1hdGlvbiA9IGtleWZyYW1lc2Bcblx0ZnJvbSB7XG5cdFx0dHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG5cdH1cblx0dG8ge1xuXHRcdHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XG5cdH1cbiBgO1xuXG5leHBvcnQgY29uc3QgU3R5bGVkU3Bpbm5lciA9IHN0eWxlZC5zdmdgXG5cdHdpZHRoOiAkeyBDT05GSUcuc3Bpbm5lclNpemUgfXB4O1xuXHRoZWlnaHQ6ICR7IENPTkZJRy5zcGlubmVyU2l6ZSB9cHg7XG5cdGRpc3BsYXk6IGlubGluZS1ibG9jaztcblx0bWFyZ2luOiA1cHggMTFweCAwO1xuXHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdGNvbG9yOiAkeyBDT0xPUlMudGhlbWUuYWNjZW50IH07XG5cdG92ZXJmbG93OiB2aXNpYmxlO1xuXHRvcGFjaXR5OiAxO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbmA7XG5cbmNvbnN0IGNvbW1vblBhdGhQcm9wcyA9IGNzc2Bcblx0ZmlsbDogdHJhbnNwYXJlbnQ7XG5cdHN0cm9rZS13aWR0aDogMS41cHg7XG5gO1xuXG5leHBvcnQgY29uc3QgU3Bpbm5lclRyYWNrID0gc3R5bGVkLmNpcmNsZWBcblx0JHsgY29tbW9uUGF0aFByb3BzIH07XG5cdHN0cm9rZTogJHsgQ09MT1JTLmdyYXlbIDMwMCBdIH07XG5gO1xuXG5leHBvcnQgY29uc3QgU3Bpbm5lckluZGljYXRvciA9IHN0eWxlZC5wYXRoYFxuXHQkeyBjb21tb25QYXRoUHJvcHMgfTtcblx0c3Ryb2tlOiBjdXJyZW50Q29sb3I7XG5cdHN0cm9rZS1saW5lY2FwOiByb3VuZDtcblx0dHJhbnNmb3JtLW9yaWdpbjogNTAlIDUwJTtcblx0YW5pbWF0aW9uOiAxLjRzIGxpbmVhciBpbmZpbml0ZSBib3RoICR7IHNwaW5BbmltYXRpb24gfTtcbmA7XG4iXX0= */"));
var SpinnerIndicator = /* @__PURE__ */ (0, import_base.default)("path", process.env.NODE_ENV === "production" ? {
  target: "ea4tfvq0"
} : {
  target: "ea4tfvq0",
  label: "SpinnerIndicator"
})(commonPathProps, ";stroke:currentColor;stroke-linecap:round;transform-origin:50% 50%;animation:1.4s linear infinite both ", spinAnimation, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEwQzJDIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IGNzcywga2V5ZnJhbWVzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBDT0xPUlMsIENPTkZJRyB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3Qgc3BpbkFuaW1hdGlvbiA9IGtleWZyYW1lc2Bcblx0ZnJvbSB7XG5cdFx0dHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG5cdH1cblx0dG8ge1xuXHRcdHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XG5cdH1cbiBgO1xuXG5leHBvcnQgY29uc3QgU3R5bGVkU3Bpbm5lciA9IHN0eWxlZC5zdmdgXG5cdHdpZHRoOiAkeyBDT05GSUcuc3Bpbm5lclNpemUgfXB4O1xuXHRoZWlnaHQ6ICR7IENPTkZJRy5zcGlubmVyU2l6ZSB9cHg7XG5cdGRpc3BsYXk6IGlubGluZS1ibG9jaztcblx0bWFyZ2luOiA1cHggMTFweCAwO1xuXHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdGNvbG9yOiAkeyBDT0xPUlMudGhlbWUuYWNjZW50IH07XG5cdG92ZXJmbG93OiB2aXNpYmxlO1xuXHRvcGFjaXR5OiAxO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbmA7XG5cbmNvbnN0IGNvbW1vblBhdGhQcm9wcyA9IGNzc2Bcblx0ZmlsbDogdHJhbnNwYXJlbnQ7XG5cdHN0cm9rZS13aWR0aDogMS41cHg7XG5gO1xuXG5leHBvcnQgY29uc3QgU3Bpbm5lclRyYWNrID0gc3R5bGVkLmNpcmNsZWBcblx0JHsgY29tbW9uUGF0aFByb3BzIH07XG5cdHN0cm9rZTogJHsgQ09MT1JTLmdyYXlbIDMwMCBdIH07XG5gO1xuXG5leHBvcnQgY29uc3QgU3Bpbm5lckluZGljYXRvciA9IHN0eWxlZC5wYXRoYFxuXHQkeyBjb21tb25QYXRoUHJvcHMgfTtcblx0c3Ryb2tlOiBjdXJyZW50Q29sb3I7XG5cdHN0cm9rZS1saW5lY2FwOiByb3VuZDtcblx0dHJhbnNmb3JtLW9yaWdpbjogNTAlIDUwJTtcblx0YW5pbWF0aW9uOiAxLjRzIGxpbmVhciBpbmZpbml0ZSBib3RoICR7IHNwaW5BbmltYXRpb24gfTtcbmA7XG4iXX0= */"));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SpinnerIndicator,
  SpinnerTrack,
  StyledSpinner
});
//# sourceMappingURL=styles.cjs.map
